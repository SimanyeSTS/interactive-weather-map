import './Sidebar.scss';

function Sidebar({ weatherData, loading, error }) {
  if (loading) {
    return (
      <div className="sidebar">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar">
        <div className="error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="sidebar">
        <div className="instructions">
          <h2>Weather Map</h2>
          <p>Click anywhere on the map to see current weather conditions.</p>
          <p>You can also search for a location using the search bar above.</p>
        </div>
      </div>
    );
  }

  const { name, main, weather, wind, sys } = weatherData;

  return (
    <div className="sidebar">
      <div className="weather-info">
        <h2>{name}, {sys.country}</h2>
        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} 
            alt={weather[0].description} 
            className="weather-icon"
          />
          <div className="temperature">
            <h3>{Math.round(main.temp)}°C</h3>
            <p className="description">{weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <span className="label">Feels like:</span>
            <span className="value">{Math.round(main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Temperature range:</span>
            <span className="value">{Math.round(main.temp_min)}°C to {Math.round(main.temp_max)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Humidity:</span>
            <span className="value">{main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind speed:</span>
            <span className="value">{wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;