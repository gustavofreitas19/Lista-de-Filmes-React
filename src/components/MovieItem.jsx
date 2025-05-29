function MovieItem({ filme, onStatusChange, onDelete, onEdit }) {
    const statusOpcoes = ['pendente', 'assistido', 'favorito'].filter(s => s !== filme.status);
  
    return (
      <div className="flex gap-4 items-center mb-4 p-4 border rounded shadow bg-white">
        {filme.poster && (
          <img
            src={filme.poster}
            alt={`Pôster de ${filme.titulo}`}
            className="w-24 h-auto rounded"
          />
        )}
        <div className="flex-1">
          <div className="font-semibold text-lg">
            {filme.titulo} ({filme.ano}) - {filme.genero}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {statusOpcoes.map(s => (
              <button
                key={s}
                onClick={() => onStatusChange(filme.id, s)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Marcar como {s}
              </button>
            ))}
            <button
              onClick={() => onEdit(filme)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(filme.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieItem;
  