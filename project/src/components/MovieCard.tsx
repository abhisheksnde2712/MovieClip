import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart } from 'lucide-react';
import { Movie } from '../types/movie';
import { useFavorites } from '../hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
            alt={movie.Title}
            className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {movie.Title}
          </h3>
          
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{movie.Year}</span>
          </div>
        </div>
      </Link>
      
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 backdrop-blur-sm ${
          favorite 
            ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
            : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md'
        }`}
      >
        <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};