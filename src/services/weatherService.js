import axios from 'axios';

const API_KEY = 'f964de66b606ec350a6c4fcd624781f0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
