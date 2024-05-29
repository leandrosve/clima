import APIService, { APIResponse } from "./APIService";

interface SearchCityResponse {
  features: {
    properties: {
      name: string;
      display_name: string;
      importance: number;
      address: {
        country: string;
        country_code: string;
      };
    };

    geometry: {
      coordinates: [number, number];
    };
  }[];
}

interface CityDetails {
  name: string;
  displayName: string;
  country: string;
  countryCode: string;
  importance: number;
  latitude: number;
  longitude: number;
}

// Documentacion: https://nominatim.org/release-docs/latest/api/Search/
export default class CitiesAPIService extends APIService {
  protected static BASE_URL: string = "https://nominatim.openstreetmap.org";

  public static async searchCity(
    term: string,
    language: string = 'en',
  ): Promise<APIResponse<CityDetails[]>> {
    // Reemplaza los espacios en blanco con +
    const sanitizedText = term.trim().replace(/\s+/g, "+");
    const res = await this.get<SearchCityResponse>(
      `/search`,
      `city=${sanitizedText}&format=geojson&addressdetails=1&accept-language=${language}`
    );

    if (res.hasError) return { ...res, data: [] };

    const parsedData = res.data.features.map((feature) => ({
      name: feature.properties.name,
      displayName: feature.properties.display_name,
      country: feature.properties.address.country,
      countryCode: feature.properties.address.country_code,
      importance: feature.properties.importance,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    }));

    return { ...res, data: parsedData };
  }
}
