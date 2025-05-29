import { useState, useEffect } from 'react';

function MovieForm({ onAdd, onUpdate, movieToEdit }) {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');

  useEffect(() => {
    if (movieToEdit) {
      setTitulo(movieToEdit.titulo);
      setAno(movieToEdit.ano);
      setGenero(movieToEdit.genero);
    }
  }, [movieToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !ano || !genero) {
      alert("Preencha todos os campos.");
      return;
    }

    const movieData = {
      titulo,
      ano,
      genero,
      status: movieToEdit?.status || 'pendente',
    };

    if (movieToEdit) {
      movieData.id = movieToEdit.id;
      onUpdate(movieData);
    } else {
      onAdd(movieData);
    }

    // limpar o formulário
    setTitulo('');
    setAno('');
    setGenero('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded-md space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Ano"
        value={ano}
        onChange={e => setAno(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Gênero"
        value={genero}
        onChange={e => setGenero(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {movieToEdit ? 'Atualizar Filme' : 'Adicionar Filme'}
      </button>
    </form>
  );
}

export default MovieForm;
