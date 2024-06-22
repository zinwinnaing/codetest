// src/components/WeatherCard.tsx
import React from 'react';
import { Weather } from '../types';

interface WeatherCardProps {
  weather: Weather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.city}, {weather.country}</h2>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
      <p>{weather.description}</p>
      <h3>{weather.temperature}°C</h3>
    </div>
  );
};

export default WeatherCard;
