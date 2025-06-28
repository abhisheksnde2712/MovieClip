import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl group-focus-within:shadow-2xl transition-all duration-300">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any movie..."
            className="block w-full pl-16 pr-40 py-6 text-xl font-medium border-0 rounded-3xl focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent"
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute inset-y-0 right-0 mr-3 flex items-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Search</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};