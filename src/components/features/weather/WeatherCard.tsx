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
import { useTranslation } from "react-i18next";
import Card from "../../common/Card";

interface Props {
  city: CityDetails;
  weatherData: WeatherData;
}

const WeatherCard = ({ city, weatherData }: Props) => {
  const { t, i18n } = useTranslation();

  const date = useMemo(() => {
    // Aplico el formato y la traduccion a la fecha
    return DateTime.now()
      .setLocale(i18n.language)
      .setZone(weatherData.timezone);
  }, [weatherData, i18n.language]);

  const weatherCode = weatherCodes[weatherData.weatherCode];

  return (
    <Card>
      <div className="px-4 sm:px-10 py-3 pb-5 flex flex-col">
        <div className="flex items-center gap-3 justify-between max-xs:flex-row-reverse">
          <div className="flex flex-col ">
            <div className="text-6xl max-xs:text-3xl font-bold flex gap-2 items-start max-xs:flex-wrap justify-end">
              {weatherData.temperature}
              <span className="text-lg mt-1">°C</span>
              <div className="flex flex-col text-sm mt-2 text-content-200 border-l border-borders pl-4  ml-2 max-xs:border-l-0">
                <div className="whitespace-nowrap">
                  {t("weather.measures.humidity")}: {weatherData.humidity}%{" "}
                </div>
                <div className="whitespace-nowrap">
                  {t("weather.measures.precipitation")}:{" "}
                  {weatherData.precipitation}%
                </div>
              </div>
            </div>
          </div>
          <div className="grow-1 min-w-[40px]">
            <img
              src={getWeatherIcon(weatherCode.mood, weatherData.isDay)}
              alt={t("weather.descriptions." + weatherCode.localeKey)}
              className="w-[150px] max-xs:m-auto  max-sm:w-[100px] self-end"
            />
          </div>
        </div>
        <div className="flex justify-between items-end max-xs:items-center max-md:flex-col-reverse">
          <div className="text-content-200 flex-wrap text-center">
            {date.toLocaleString(DateTime.DATE_FULL)},{" "}
            <span className="font-bold">
              <span className="inline-flex">
                {date.toFormat("t")} (UTC {date.toFormat("Z")})
              </span>
            </span>
          </div>
          <div className="font-bold text-lg text-content-200">
            {t("weather.descriptions." + weatherCode.localeKey)}
          </div>
        </div>

        <hr className="my-4 border-borders" />

        <div className="flex justify-between gap-2 items-center max-xs:flex-wrap">
          <div className="flex gap-3 max-xs:flex-wrap flex-1">
            <img
              src={`https://hatscripts.github.io/circle-flags/flags/${city.countryCode.toLowerCase()}.svg`}
              className="size-12 shadow rounded-full max-sm:size-8"
              alt={city.country}
              title={city.country}
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{city.name}</h2>
              <div className="text-sm font-light">{city.displayName}</div>
            </div>
          </div>
          <LinkButton
            href={`https://maps.google.com/?q=${city.latitude},${city.longitude}`}
            target="_blank"
            className="m-auto text-blue-500 bg-transparent shadow-none py-4 text-sm  hover:text-blue-600 hover:bg-blue-700/5"
          >
            <MapIcon className="size-4" /> {t("weather.showMap")}
          </LinkButton>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
