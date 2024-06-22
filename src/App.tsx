// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Weather, Forecast,City } from './types';
import { getCurrentWeather, getWeatherForecast } from './service/weatherService';
import CitySelector from './component/CitySelector';
import WeatherCard from './component/WeatherCard';
import WeatherForecast from './component/WeatherForecast';

const App: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {

  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
    setError('Geolocation is not supported by your browser');
    return;
  }

  const successHandler = (position: GeolocationPosition) => {
    setCity({latitude:position?.coords?.latitude,longitude:position?.coords?.longitude,label:""});
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error retrieving location', error);
    setError(`Error retrieving location: ${error.message}`);
  };

  navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
}, []);

  useEffect(() => {
   
    if(city){
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
    }
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
