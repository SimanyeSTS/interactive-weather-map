import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../assets/marker-icon.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationSelect, setWeatherData, setLoading, setError }) {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({ lat, lng });
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  return null;
}

function MapComponent({ onLocationSelect, selectedLocation, setWeatherData, setLoading, setError }) {
  const [position, setPosition] = useState([33.55, 18.25]); // Default to Cape Town

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setPosition([selectedLocation.lat, selectedLocation.lng]);
    }
  }, [selectedLocation]);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler 
          onLocationSelect={onLocationSelect} 
          setWeatherData={setWeatherData}
          setLoading={setLoading}
          setError={setError}
        />
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              Selected location: <br />
              Lat: {selectedLocation.lat.toFixed(4)}, <br />
              Lng: {selectedLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapComponent;