// src/App.jsx
import { useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import './App.scss';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Weather Map</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <SearchBar setSelectedLocation={setSelectedLocation} />
      <div className="main-content">
        <MapComponent 
          onLocationSelect={handleLocationSelect} 
          selectedLocation={selectedLocation}
          setWeatherData={setWeatherData}
          setLoading={setLoading}
          setError={setError}
        />
        <Sidebar 
          weatherData={weatherData} 
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;