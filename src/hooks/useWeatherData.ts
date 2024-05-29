import { useEffect, useState } from "react";
import { WeatherData } from "../model/WeatherData";
import WeatherAPIService from "../services/api/WeatherAPIService";
import Logger from "../utils/Logger";
import { CityDetails } from "../model/CityDetails";

const useWeatherData = (city: CityDetails | null) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (city: CityDetails | null) => {
    if (!city) {
      setLoading(false);
      setData(null);
      return;
    }
    setLoading(true);
    const res = await WeatherAPIService.getWeatherData(
      city.latitude,
      city.longitude
    );
    setLoading(false);
    if (res.hasError) {
      Logger.danger("Ocurrió un error", res.error);
      setError(
        "Ups! Se produjo un error inesperado al tratar de obtener la información."
      );
      return;
    }
    setData(res.data);
  };

  const reload = () => fetchData(city);

  useEffect(() => {
    fetchData(city);
  }, [city]);

  return {
    weatherData: data,
    loading,
    error,
    reload,
  };
};

export default useWeatherData;
