import { WeatherData } from "../../model/WeatherData";
import APIService, { APIResponse } from "./APIService";

interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    rain: number;
    weather_code: number;
    is_day: boolean;
  };
}

export default class WeatherAPIService extends APIService {
  protected static BASE_URL: string = "https://api.open-meteo.com/v1/";

  public static async getWeatherData(
    latitude: number,
    longitude: number
  ): Promise<APIResponse<WeatherData>> {
    const variables =
      "current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,weather_code,is_day&forecast_days=1&timezone=auto";
    const res = await this.get<WeatherResponse>(
      `/forecast`,
      `latitude=${latitude}&longitude=${longitude}&${variables}`
    );

    if (res.hasError) return { ...res, data: undefined };

    const sanitizedData = {
      latitude: res.data.latitude,
      longitude: res.data.longitude,
      timezone: res.data.timezone,
      temperature: res.data.current.temperature_2m,
      humidity: res.data.current.relative_humidity_2m,
      windSpeed: res.data.current.wind_speed_10m,
      rain: res.data.current.rain,
      weatherCode: res.data.current.weather_code,
      isDay: res.data.current.is_day,
    };

    return { ...res, data: sanitizedData };
  }
}
