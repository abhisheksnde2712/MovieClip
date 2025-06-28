import { useState, useCallback } from 'react';
import { Movie, MovieDetails, SearchResponse } from '../types/movie';

const API_KEY = 'f0fa84d8'; // Users will need to add their OMDb API key
const BASE_URL = 'https://www.omdbapi.com/';

export const useMovieAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string, page: number = 1): Promise<SearchResponse | null> => {
    if (!API_KEY) {
      setError('Please add your OMDb API key to src/hooks/useMovieAPI.ts');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
      const data: SearchResponse = await response.json();
      
      if (data.Response === 'False') {
        setError(data.Error || 'No movies found');
        return null;
      }
      
      return data;
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (id: string): Promise<MovieDetails | null> => {
    if (!API_KEY) {
      setError('Please add your OMDb API key to src/hooks/useMovieAPI.ts');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
      const data: MovieDetails = await response.json();
      
      if (data.Response === 'False') {
        setError('Movie not found');
        return null;
      }
      
      return data;
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchMovies,
    getMovieDetails,
    loading,
    error
  };
};