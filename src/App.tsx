// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Weather, Forecast } from './types';
import { getCurrentWeather, getWeatherForecast } from './service/weatherService';
import CitySelector from './component/CitySelector';
import WeatherCard from './component/WeatherCard';
import WeatherForecast from './component/WeatherForecast';

const App: React.FC = () => {
  const [city, setCity] = useState({ label: 'Yangon', value: 'Yangon', latitude: 16.8409, longitude: 96.1735 });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeather = await getCurrentWeather(city);
        setWeather(currentWeather);
        const weatherForecast = await getWeatherForecast(city);
        setForecasts(weatherForecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, [city]);



  return (
    <div className="app">
      <h1>Weather App</h1>
      
 
      <CitySelector onCityChange={setCity} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      <WeatherForecast forecasts={forecasts} />
    </div>
  );
};

export default App;
