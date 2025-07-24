import axios from 'axios';
import type { TMDBResponse } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMoviesByQuery = async (
  query: string,
  page: number
): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>(API_URL, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
};
