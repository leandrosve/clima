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

interface Props {
  city: CityDetails;
  weatherData: WeatherData;
}

const WeatherCard = ({ city, weatherData }: Props) => {
  const { t } = useTranslation();
  const date = useMemo(() => {
    return DateTime.now().setLocale("es").setZone(weatherData.timezone);
  }, [weatherData]);

  const weatherCode = weatherCodes[weatherData.weatherCode];

  return (
    <div className="bg-base-200 rounded-sm shadow">
      <div className="card-gradient">
        <div className="px-4 lg:px-10 py-3 pb-5 flex flex-col">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex flex-col ">
              <div className="text-6xl max-xs:text-3xl font-bold flex gap-2 items-start flex-wrap">
                {weatherData.temperature}
                <span className="text-lg mt-1">°C</span>
                <div className="flex flex-col text-sm mt-2 text-content-200 border-l border-content-400/10 pl-4  ml-2">
                  <div>{t("weather.measures.humidity")}: {weatherData.humidity}% </div>
                  <div>{t("weather.measures.precipitation")}: {weatherData.precipitation}%</div>
                </div>
              </div>
            </div>
            <img
              src={getWeatherIcon(weatherCode.mood, weatherData.isDay)}
              alt={t("weather.descriptions." + weatherCode.localeKey)}
              className="w-[150px] h-[120px] max-xs:w-[90px]"
            />
          </div>
          <div className="flex justify-between items-end max-md:flex-col-reverse">
            <div className="text-content-200 flex-wrap">
              {date.toLocaleString(DateTime.DATE_FULL)},{" "}
              <span className="font-bold">
                {" "}
                <span className="inline-flex">{date.toFormat("t")} (UTC {date.toFormat("Z")})</span>
              </span>
            </div>
            <div className="ml-auto font-bold text-lg text-content-200">
              {t("weather.descriptions." + weatherCode.localeKey)}
            </div>
          </div>

          <hr className="my-4 border-content-400/5" />

          <div className="flex justify-between gap-2 items-center">
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
              className="text-primary-500 bg-transparent shadow-none  py-4 text-sm "
            >
              <MapIcon className="size-4" /> Ver mapa
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
