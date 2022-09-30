import React from "react";
import "./Day.styles.css"

const convertKToF = (k) => (9/5)*(k - 273) + 32

const makeIconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

const makeTimeString = (timestamp) => {
    const date = new Date(timestamp * 1000) 
    return date.toLocaleDateString()
}

const Day = ({ day }) => {
  const { temp, pressure, humidity } = day.main;
  return (
    <div className="day">
      <p>{makeTimeString(day.dt)}</p>
      <p>Temp: {Math.round(convertKToF(temp))}ºF</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity}%</p>
      <img alt="icon" src={makeIconUrl(day.weather[0].icon)} />
    </div>
  );
};

export default Day;
