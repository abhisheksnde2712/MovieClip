import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Search, Heart } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-all duration-300 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Film className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Movie Explorer
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 hover:scale-105'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                isActive('/favorites') 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25 transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 hover:scale-105'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};