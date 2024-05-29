import React, { useMemo } from "react";
import { WeatherData } from "../../../model/WeatherData";
import "./WeatherCard.css";
import { DateTime } from "luxon";
import {
  getWeatherIcon,
  weatherCodes,
} from "../../../model/static/weatherCodes";

interface Props {
  city: City;
  weatherData: WeatherData;
}

const WeatherCard = ({ city, weatherData }: Props) => {
  const date = useMemo(() => {
    return DateTime.now().setLocale("es").setZone(weatherData.timezone);
  }, [weatherData]);

  const weatherCode = weatherCodes[61];

  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${city.countryCode.toLowerCase()}.svg`}
          className="weather-card__flag   "
          alt={city.country}
        />
        <div>
          <h2>{city.name}</h2>
          <div>{city.country}</div>
        </div>
      </div>
      <div>{date.toLocaleString(DateTime.DATE_FULL)}</div>
      <div>{date.toFormat("t")}</div>
      <div> humedad:{weatherData.current.relative_humidity_2m} </div>
      <div> precipitacion: {weatherData.current.precipitation} </div>
      <div>{weatherCode.description}</div>
      <img
        src={getWeatherIcon(weatherCode.mood, weatherData.current.is_day)}
        alt={weatherCode.description}
      />
      <a
        href={`https://maps.google.com/?q=${city.latitude},${city.longitude}`}
        target="_blank"
      >
        maps
      </a>
    </div>
  );
};

export default WeatherCard;
