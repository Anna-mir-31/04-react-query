import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string; // токен берётся из .env

export interface TMDBResponse {
  results: Movie[];
}

export async function fetchMoviesByQuery(query: string): Promise<Movie[]> {
  const { data } = await axios.get<TMDBResponse>(BASE_URL, {
    params: {
      query,
      language: 'en-US',
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data.results;
}
