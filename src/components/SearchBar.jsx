import { useState } from 'react';
import axios from 'axios';
import './SearchBar.scss';

function SearchBar({ setSelectedLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      
      if (response.data && response.data.length > 0) {
        const { lat, lon: lng, name } = response.data[0];
        setSelectedLocation({ lat, lng, name });
      } else {
        setError('Location not found. Please try another search term.');
      }
    } catch (err) {
      console.error('Error searching for location:', err);
      setError('Error searching for location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for a city..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchBar;