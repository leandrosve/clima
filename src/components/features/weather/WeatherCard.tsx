import { useMemo } from "react";
import { WeatherData } from "../../../model/WeatherData";
import { DateTime } from "luxon";
import {
  getWeatherIcon,
  weatherCodes,
} from "../../../model/static/weatherCodes";
import { CityDetails } from "../../../model/CityDetails";
import MapIcon from "../../../icons/MapIcon";
import { LinkButton } from "../../common/Button";

interface Props {
  city: CityDetails;
  weatherData: WeatherData;
}

const WeatherCard = ({ city, weatherData }: Props) => {
  const date = useMemo(() => {
    return DateTime.now().setLocale("es").setZone(weatherData.timezone);
  }, [weatherData]);

  const weatherCode = weatherCodes[61];

  return (
    <div className="bg-base-200 px-10 py-3">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex flex-col ">
          <div className="text-6xl font-bold flex">
            {weatherData.temperature} <span className="text-lg mt-1">°C</span>
          </div>
        </div>
        <img
          src={getWeatherIcon(weatherCode.mood, weatherData.isDay)}
          alt={weatherCode.description}
          className="size-[150px]"
        />
      </div>

      <div>{weatherCode.description}</div>
      <div>{date.toLocaleString(DateTime.DATE_FULL)}</div>
      <div>{date.toFormat("t")}</div>
      <div> humedad:{weatherData.humidity}% </div>
      <div> precipitacion: {weatherData.precipitation} </div>
      <div> temperatura: {weatherData.temperature} </div>
      <div className="flex justify-between gap-1 items-center">
        <div className="flex gap-3">
          <img
            src={`https://hatscripts.github.io/circle-flags/flags/${city.countryCode.toLowerCase()}.svg`}
            className="size-12 shadow rounded-full"
            alt={city.country}
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{city.name}</h2>
            <div className="text-sm font-light">{city.displayName}</div>
          </div>
        </div>
        <LinkButton
          href={`https://maps.google.com/?q=${city.latitude},${city.longitude}`}
          target="_blank"
          className="text-primary-600 bg-primary-500/5 shadow-md  py-4 text-sm "
        >
          <MapIcon className="size-4" /> Ver mapa
        </LinkButton>
      </div>
    </div>
  );
};

export default WeatherCard;
