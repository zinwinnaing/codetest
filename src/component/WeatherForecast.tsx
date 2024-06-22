// src/components/WeatherForecast.tsx
import React from 'react';
import { Forecast } from '../types';

interface WeatherForecastProps {
  forecasts: Forecast[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecasts }) => {
  return (
    <div className="weather-forecast">
      {forecasts.map((forecast, index) => (
        <div key={index} className="forecast-item">
          <p>{forecast.date}</p>
          <img src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt={forecast.description} />
          <p>{forecast.temperature}°C</p>
          <p>{forecast.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
