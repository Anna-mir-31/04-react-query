import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  /* ------------------------------------------------------------------ */
  /* side-effects: ESC -закрытие и блокировка scroll                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  /* ------------------------------------------------------------------ */
  /* backdrop click — закрываем, только если клик именно по фону        */
  /* ------------------------------------------------------------------ */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* ------------------------------------------------------------------ */
  /* Само модальное окно – выводим через портал в <body>                */
  /* ------------------------------------------------------------------ */
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Изображение: backdrop_path, как требует ТЗ  */}
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : 'https://via.placeholder.com/1280x720?text=No+Image'
          }
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2 id="movie-modal-title">{movie.title}</h2>
          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date || 'N/A'}
          </p>
          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average ? `${movie.vote_average}/10` : 'N/A'}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
