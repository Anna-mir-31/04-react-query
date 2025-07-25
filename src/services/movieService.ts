import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDJkNWEwNmM2ODcxMzI1YTgwMTJiNmZjNDk2YzM5MyIsIm5iZiI6MTc1MTgwMDI1NC44ODYwMDAyLCJzdWIiOiI2ODZhNTliZThlMGY5NTEyZGM3MDI4NTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0HqCp5nQwXHaKEO7rkon278HS2L8E_aPY_xshTkGcEg';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMoviesByQuery = async (query: string, page = 1): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};