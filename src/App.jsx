import { useEffect, useState } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './App.css'; // opcional, pode remover se usar só Tailwind

function App() {
  const [filmes, setFilmes] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/filmes')
      .then(res => res.json())
      .then(setFilmes);
  }, []);

  const addFilme = async (novoFilme) => {
    const resOmdb = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${encodeURIComponent(novoFilme.titulo)}`);
    const dadosOmdb = await resOmdb.json();
    const filmeComPoster = {
      ...novoFilme,
      poster: dadosOmdb.Poster !== "N/A" ? dadosOmdb.Poster : null
    };

    const res = await fetch('http://localhost:3001/filmes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filmeComPoster)
    });

    const filmeCriado = await res.json();
    setFilmes([...filmes, filmeCriado]);
  };

  const atualizarFilme = async (filmeAtualizado) => {
    const resOmdb = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${encodeURIComponent(filmeAtualizado.titulo)}`);
    const dadosOmdb = await resOmdb.json();

    const filmeComPoster = {
      ...filmeAtualizado,
      poster: dadosOmdb.Poster !== "N/A" ? dadosOmdb.Poster : null
    };

    await fetch(`http://localhost:3001/filmes/${filmeComPoster.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filmeComPoster)
    });

    setFilmes(filmes.map(f => f.id === filmeComPoster.id ? filmeComPoster : f));
    setMovieToEdit(null); // limpa o formulário após edição
  };

  const atualizarStatus = async (id, novoStatus) => {
    const filme = filmes.find(f => f.id === id);
    const atualizado = { ...filme, status: novoStatus };
    await fetch(`http://localhost:3001/filmes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atualizado)
    });
    setFilmes(filmes.map(f => f.id === id ? atualizado : f));
  };

  const removerFilme = async (id) => {
    const confirm = window.confirm("Deseja realmente remover este filme?");
    if (!confirm) return;
    await fetch(`http://localhost:3001/filmes/${id}`, { method: 'DELETE' });
    setFilmes(filmes.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Filmes</h1>

      <MovieForm
        onAdd={addFilme}
        onUpdate={atualizarFilme}
        movieToEdit={movieToEdit}
      />

      <MovieList
        titulo="Assistidos"
        filmes={filmes.filter(f => f.status === 'assistido')}
        onStatusChange={atualizarStatus}
        onDelete={removerFilme}
        onEdit={setMovieToEdit}
      />
      <MovieList
        titulo="Favoritos"
        filmes={filmes.filter(f => f.status === 'favorito')}
        onStatusChange={atualizarStatus}
        onDelete={removerFilme}
        onEdit={setMovieToEdit}
      />
      <MovieList
        titulo="Pendentes"
        filmes={filmes.filter(f => f.status === 'pendente')}
        onStatusChange={atualizarStatus}
        onDelete={removerFilme}
        onEdit={setMovieToEdit}
      />
    </div>
  );
}

export default App;
