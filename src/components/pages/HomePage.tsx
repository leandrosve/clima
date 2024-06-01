import React, { useEffect, useState } from "react";
import CityLookupSearchbox from "../features/cities/CityLookupSearchbox";
import { CityDetails } from "../../model/CityDetails";
import { useTranslation } from "react-i18next";
import { getRandomCity } from "../../model/static/cities";
import Spinner from "../common/Spinner";
import Card from "../common/Card";
import WeatherCard from "../features/weather/WeatherCard";
import Button from "../common/Button";
import SyncIcon from "../../icons/SyncIcon";
import useWeatherData from "../../hooks/useWeatherData";

const HomePage = () => {
  const [city, setCity] = useState<CityDetails | null>(null);
  const { loading, error, weatherData, reload } = useWeatherData(city);
  const { t } = useTranslation();

  useEffect(() => {
    setCity(getRandomCity());
  }, []);
  return (
    <>
      <CityLookupSearchbox
        onSelectItem={(c) => {
          setCity(c);
        }}
      />
      <div className="flex flex-col justify-center mt-4">
        {loading && (
          <div className="flex justify-center py-[100px]">
            <Spinner />
          </div>
        )}
        {error && (
          <Card className="flex justify-center py-[100px]">{t(error)}</Card>
        )}
        {!loading && city && weatherData && (
          <div className="animate-fadeIn">
            <WeatherCard city={city} weatherData={weatherData} />
          </div>
        )}
        {city && !loading && (
          <Button
            onClick={reload}
            aria-label="Reload"
            className="self-end mt-3 border border-borders"
          >
            {t("weather.refresh")} <SyncIcon />
          </Button>
        )}
      </div>
    </>
  );
};

export default HomePage;
