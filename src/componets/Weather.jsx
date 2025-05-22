import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import weather_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import "./Weather.css";
function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState("");
  const inputRef = useRef(null);

  const getWeatherData = async (city) => {
    console.log(city);
    if (city === "") {
      setWeatherData(false);
      alert("please enter city name");
      return;
    }

    const url = ` http://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_APP_ID
    }&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        location: data.location.name,
        country: data.location.country,
        condition: data.current.condition.text,
        condition_icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        icon: "https" + data.current.condition.icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
    setCity(capitalized);
  };

  useEffect(() => {
    getWeatherData("Dhaka");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={handleInputChange}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => getWeatherData(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.condition_icon}
            alt="condition"
            className="weather_icon"
          />
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location">
            {weatherData.location},{weatherData.country}
          </p>
          <p className="conditon">{weatherData.condition}</p>
          <p className="feels_like">Feel Like {weatherData.feels_like}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
            </div>
            <div>
              <p>{weatherData.humidity}%</p>
              <span className="sss">humidity</span>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
            </div>
            <div>
              <p> {weatherData.wind} k/h</p>
              <span className="sss">wind speed</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading........</p>
      )}
    </div>
  );
}

export default Weather;
