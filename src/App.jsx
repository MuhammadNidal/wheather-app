import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'c7c5ae0deb08aef1240618e62a7ea4c5';

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeather(response.data);
      setError(null);  // Clear previous error if the call is successful
    } catch (error) {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  const renderWeatherInfo = () => {
    if (!weather) return null;

    const temperatureCelsius = Math.round(weather.main.temp - 273.15);

    return (
      <div className="weather-info">
        <h2>{weather.name}</h2>
        <p>{temperatureCelsius}°C</p>
        <p>{weather.weather[0].description}</p>
        {temperatureCelsius > 30 ? (
          <div className="hot">
            <p>It's hot! 🌞</p>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Red.svg" alt="Hot" className="temp-image" /> */}
          </div>
        ) : (
          <div className="cold">
            <p>It's cold! ❄️</p>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Blue_square.svg/1200px-Blue_square.svg.png" alt="Cold" className="temp-image" /> */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="style-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="inp"
          type="text"
          placeholder="Enter your city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {renderWeatherInfo()}
    </div>
  );
}

export default App;
