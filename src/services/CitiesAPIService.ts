import { WeatherData } from "../model/WeatherData";
import APIService, { APIResponse } from "./APIService";

interface SearchCityResponse {
  features: {
    properties: {
      name: string;
      display_name: string;
    };
    address: {
      country: string;
      country_code: string;
    };
    importance: number;
  }[];
}

interface CityDetails {
  name: string;
  displayName: string;
  country: string;
  countryCode: string;
  importance: number;
}

// Documentacion: https://nominatim.org/release-docs/latest/api/Search/
export default class CitiesAPIService extends APIService {
  protected static BASE_URL: string =
    "https://nominatim.openstreetmap.org/search?city=Buenos&format=geojson";

  public static async searchCity(
    term: string
  ): Promise<APIResponse<CityDetails[]>> {
    // Reemplaza los espacios en blanco con +
    const sanitizedText = term.trim().replace(/\s+/g, "+");
    const res = await this.get<SearchCityResponse>(
      `/search`,
      `city=${sanitizedText}&format=geojson&addressdetails=1`
    );

    if (res.hasError) return { ...res, data: [] };

    const parsedData = res.data.features.map((feature) => ({
      name: feature.properties.name,
      displayName: feature.properties.display_name,
      country: feature.address.country,
      countryCode: feature.address.country_code,
      importance: feature.importance,
    }));

    return { ...res, data: parsedData };
  }
}
