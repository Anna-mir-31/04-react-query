// src/components/App/App.tsx

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReactPaginate from 'react-paginate';
import { fetchMoviesByQuery } from '../../services/movieService';
import type { TMDBResponse, Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<TMDBResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMoviesByQuery(query, page),
    enabled: query.trim() !== '',
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            Powered by TMDB
          </a>
          <SearchBar onSubmit={handleSearch} />
        </div>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data && data.results.length === 0 && (
        <ErrorMessage message="No movies found" />
      )}

      {isSuccess && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
