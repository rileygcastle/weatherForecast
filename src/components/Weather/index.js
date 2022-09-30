import React, { useState, useEffect } from "react";
import Day from "./Day";

const API_KEY = "f10c3d14181029fdc08b0215a1680cb6";
const makeGeoUrl = (location) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
const Weather = () => {
  const [data, setData] = useState([]);
  const [locationInput, setLocationInput] = useState("");

  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const { list } = data;
    const dayOne = list[0];
    const dayTwo = list[7];
    const dayThree = list[15];
    const dayFour = list[23];
    const dayFive = list[31];
    const days = [dayOne, dayTwo, dayThree, dayFour, dayFive];
    return days;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setLocationInput(value);
  };
  const handleClick = async () => {
    const response = await fetch(makeGeoUrl(locationInput));
    const data = await response.json();
    const { lat, lon, name, state, country } = data[0];
    const days = await fetchWeatherData(lat, lon);
    setData(days);
    setCity(name);
    setState(state);
    setCountry(country);
  };
  return (
    <div>
      <p className="title">Weather Forecast</p>
      <div className="location-input-menu">
        <label htmlFor="location">Location:</label>
        <input className="input" name="location" onChange={handleChange} value={locationInput} />
        <button className="check-btn" onClick={handleClick}>Check the weather</button>
      </div>
      <div>
        {city && (
          <p className="weather-for">
            Weather for {city}
            {state && <span>, {state}</span>}
            {country && <span>, {country}</span>}
          </p>
        )}
      </div>
      {data.map((day) => {
        return <Day day={day} key={day.dt} />;
      })}
    </div>
  );
};

export default Weather;
