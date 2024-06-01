import { useEffect, useState } from "react";
import { WeatherData } from "../model/WeatherData";
import WeatherAPIService from "../services/api/WeatherAPIService";
import { CityDetails } from "../model/CityDetails";

// Este hook contiene la logica para obtener la informacion de clima y hora de la ciudad
const useWeatherData = (city: CityDetails | null) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (city: CityDetails | null) => {
    setError(null);
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
      setError("defaultApiError"); // Codigo de error para aplicar la traduccion
      setData(null);
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
