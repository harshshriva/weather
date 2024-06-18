import React, { useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import styled from 'styled-components';

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [userGroup, setUserGroup] = useState('traveler');

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(location);
      setWeather(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeather(null);
    }
  };

  const renderWeatherInfo = () => {
    if (weather) {
      if (userGroup === 'eventPlanner') {
        return (
          <>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </>
        );
      } else if (userGroup === 'traveler') {
        return (
          <>
            <p>Weather Conditions: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp} °C</p>
          </>
        );
      }
    }
    return null;
  };

  return (
    <Container>
      <Title>Weather Dashboard</Title>
      <UserGroupSelector value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
        <option value="eventPlanner">Event Planner</option>
        <option value="traveler">Traveler</option>
      </UserGroupSelector>
      <Input 
        type="text" 
        placeholder="Enter location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
      />
      <Button onClick={handleSearch}>Search</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {weather && (
        <WeatherInfo>
          <CityName>{weather.name}</CityName>
          {renderWeatherInfo()}
        </WeatherInfo>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const UserGroupSelector = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CityName = styled.h3`
  font-size: 1.5em;
  color: #555;
`;

export default Dashboard;
