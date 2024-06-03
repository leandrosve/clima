export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rain: number;
  weatherCode: number;
  isDay: boolean;
}
