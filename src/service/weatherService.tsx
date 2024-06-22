// src/services/weatherService.ts
import axios from 'axios';
import { Weather, Forecast ,City} from '../types';


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export const getCurrentWeather = async (city: City): Promise<Weather> => {
    
  const response = await axios.get(`${BASE_URL}/weather?lat=${city?.latitude}&lon=${city?.longitude}&appid=${API_KEY}`);
  const data = response.data;
  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
  };
};

export const getWeatherForecast = async (city: City): Promise<Forecast[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: city.latitude,
        lon: city.longitude,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return response.data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};
