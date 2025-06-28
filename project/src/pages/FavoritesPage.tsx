import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-red-500 mr-4 fill-current" />
            <h1 className="text-5xl font-bold text-gray-900">Your Favorites</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Keep track of all the movies you love. Your favorites are saved locally and will persist between sessions.
          </p>
        </div>

        {favorites.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your collection
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {favorites.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No favorites yet</h3>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
              Start exploring movies and add them to your favorites by clicking the heart icon on any movie card.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
            >
              Discover Movies
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};