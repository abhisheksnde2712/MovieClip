import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Users, Award, Heart } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useMovieAPI } from '../hooks/useMovieAPI';
import { useFavorites } from '../hooks/useFavorites';
import { MovieDetails } from '../types/movie';

export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieDetails, loading, error } = useMovieAPI();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const result = await getMovieDetails(id);
        if (result) {
          setMovie(result);
        }
      };
      fetchMovie();
    }
  }, [id, getMovieDetails]);

  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner message="Loading movie details..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage message={error || 'Movie not found'} />
      </div>
    );
  }

  const favorite = isFavorite(movie.imdbID);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Search
        </Link>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="lg:flex">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop'}
                alt={movie.Title}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop';
                }}
              />
            </div>

            {/* Movie Details */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {movie.Title}
                  </h1>
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span className="font-medium">{movie.Year}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="font-medium">{movie.Runtime}</span>
                    </div>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      {movie.Rated}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleToggleFavorite}
                  className={`p-4 rounded-full transition-all duration-200 ${
                    favorite 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${favorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Ratings */}
              <div className="flex items-center space-x-8 mb-8">
                {movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="font-bold text-xl">{movie.imdbRating}</span>
                    <span className="text-gray-500 ml-1">/10</span>
                  </div>
                )}
                {movie.Metascore !== 'N/A' && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                    Metascore: {movie.Metascore}
                  </div>
                )}
              </div>

              {/* Genre */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {movie.Genre.split(', ').map((genre, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plot */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Plot</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{movie.Plot}</p>
              </div>

              {/* Cast and Crew */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2" />
                    Cast
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{movie.Actors}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Director</h4>
                  <p className="text-gray-700 leading-relaxed">{movie.Director}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Release Date</h4>
                  <p className="text-gray-700">{movie.Released}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Language</h4>
                  <p className="text-gray-700">{movie.Language}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Country</h4>
                  <p className="text-gray-700">{movie.Country}</p>
                </div>
                {movie.Awards !== 'N/A' && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Awards
                    </h4>
                    <p className="text-gray-700">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};