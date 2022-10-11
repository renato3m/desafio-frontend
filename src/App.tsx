import { useEffect, useState } from 'react';
import axios from 'axios';
import { IData } from './types';
import './styles/main.css';

const URL_POPULAR =
  'http://api.themoviedb.org/3/movie/popular?api_key=22be462e6d3de1dbab03d1ca50847b5a&language=pt-BR';

function App() {
  const [data, setData] = useState<IData>();
  const [page, setPage] = useState(1);

  async function handleMovie() {
    const { data } = await axios.get<IData>(URL_POPULAR);
    setData(data);

    console.log(data);
  }

  async function handleMoreMovie() {
    const { data } = await axios.get<IData>(URL_POPULAR + `&page=${page + 1}`);
    setPage(page + 1);
    setData((prev) => {
      if (prev) {
        let auxData = {
          ...prev,
          results: [...prev.results, ...data.results],
        };
        return auxData;
      }
      return prev;
    });
  }

  useEffect(() => {
    handleMovie();
  }, []);

  return (
    <div className="App p-4">
      {data?.results.map((movie, index) => (
        <div
          key={index}
          className="flex gap-4 p-4 bg-white border border-gray-200 shadow-md rounded mb-4"
        >
          <img
            src={'https://image.tmdb.org/t/p/w200' + movie.poster_path}
            alt={movie.title}
          />
          <div>
            <h2 className="font-bold">{movie.title}</h2>
            <p className="text-gray-600 text-sm my-2">27 de jul de 2022</p>
            <span className="font-bold">Média: {movie.vote_average}</span>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
      <button
        className="px-4 py-2 font-semibold border-0 bg-blue-900 text-white rounded shadow-sm shadow-blue-200"
        onClick={() => handleMoreMovie()}
      >
        Carregar mais
      </button>
    </div>
  );
}

export default App;
