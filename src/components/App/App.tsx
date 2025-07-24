import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchMoviesByQuery } from '../../services/movieService';
import type { TMDBResponse, Movie } from '../../types/movie';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<TMDBResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMoviesByQuery(query, page),
    enabled: query.trim() !== '',
    retry: false,
    // если твоя версия react-query не поддерживает keepPreviousData/placeholderData — не добавляй их
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
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

      {isSuccess && data && data.results.length > 0 && (
        <section className={css.resultsWrapper}>
          {/* ПАГИНАЦИЯ ВВЕРХУ */}
          {data.total_pages > 1 && (
            <div className={css.paginationTop}>
              <ReactPaginate
                pageCount={data.total_pages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            </div>
          )}

          {/* САМ ГРИД */}
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
        </section>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
