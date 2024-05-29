import { WeatherData } from "../model/WeatherData";
import APIService from "./APIService";

export default class WeatherAPIService extends APIService {
  protected static BASE_URL: string = "https://api.open-meteo.com/v1/";

  public static async getWeatherData(latitude: number, longitude: number) {
    const variables =
      "current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,is_day&forecast_days=1&timezone=auto";
    return this.get<WeatherData>(
      `/forecast`,
      `latitude=${latitude}&longitude=${longitude}&${variables}`
    );
  }
}
