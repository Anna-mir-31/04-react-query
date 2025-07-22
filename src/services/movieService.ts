import axios from 'axios';
import type { TMDBResponse } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMoviesByQuery = async (query: string, page: number): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>(API_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return response.data;
};
