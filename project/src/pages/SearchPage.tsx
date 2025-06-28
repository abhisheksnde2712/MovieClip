import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Pagination } from '../components/Pagination';
import { useMovieAPI } from '../hooks/useMovieAPI';
import { Movie } from '../types/movie';

export const SearchPage: React.FC = () => {
  const { searchMovies, loading, error } = useMovieAPI();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, page: number = 1) => {
    setCurrentQuery(query);
    setCurrentPage(page);
    setHasSearched(true);
    
    const result = await searchMovies(query, page);
    if (result) {
      setMovies(result.Search);
      setTotalResults(parseInt(result.totalResults));
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  const handlePageChange = (page: number) => {
    if (currentQuery) {
      handleSearch(currentQuery, page);
    }
  };

  const handleRetry = () => {
    if (currentQuery) {
      handleSearch(currentQuery, currentPage);
    }
  };

  useEffect(() => {
    // Initial search with popular movies
    handleSearch('marvel');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute top-32 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-none">
              Discover
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-pulse">
                Cinema
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-2xl text-gray-600 mb-4 font-light leading-relaxed">
                Explore millions of movies, from timeless classics to the latest blockbusters
              </p>
              <p className="text-lg text-gray-500 font-medium">
                Save your favorites • Get detailed info • Discover your next obsession
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar onSearch={(query) => handleSearch(query)} loading={loading} />
          </div>
          
          {/* Quick search suggestions */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {['Marvel', 'Star Wars', 'Horror', 'Comedy', 'Action'].map((genre) => (
              <button
                key={genre}
                onClick={() => handleSearch(genre)}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {loading && <LoadingSpinner message="Searching for movies..." />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-bold text-gray-900">
                {hasSearched && currentQuery ? (
                  <>
                    Results for <span className="text-blue-600">"{currentQuery}"</span>
                  </>
                ) : (
                  'Popular Movies'
                )}
              </h2>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
                <span className="text-gray-600 font-semibold">
                  {totalResults.toLocaleString()} results
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              resultsPerPage={10}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!loading && !error && movies.length === 0 && hasSearched && (
          <div className="text-center py-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-gray-200/50">
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No movies found</h3>
              <p className="text-gray-500 text-lg">Try searching with different keywords</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};