import MovieItem from './MovieItem';

function MovieList({ titulo, filmes, onStatusChange, onDelete, onEdit }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
      {filmes.length === 0 ? (
        <p className="text-gray-600">Nenhum filme nesta lista.</p>
      ) : (
        filmes.map(filme => (
          <MovieItem
            key={filme.id}
            filme={filme}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default MovieList;
