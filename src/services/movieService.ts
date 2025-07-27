import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMoviesByQuery = async (
  query: string,
  page = 1
): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`, // обов’язково з Bearer тут!
    },
  });

  return response.data;
};
