import { CityDetails } from "../CityDetails";

export const placeholderCities: CityDetails[] = [
  {
    name: "Buenos Aires",
    displayName:
      "Buenos Aires, Comuna 1, Autonomous City of Buenos Aires, Argentina",
    country: "Argentina",
    countryCode: "ar",
    importance: 0.7279817834797908,
    longitude: -58.38153,
    latitude: -34.6037181,
  },
  {
    name: "Tokyo",
    displayName: "Tokyo, Japan",
    country: "Japan",
    countryCode: "jp",
    importance: 0.7593311914925306,
    longitude: 139.762221,
    latitude: 35.6821936,
  },
  {
    name: "Múnich",
    displayName: "Múnich, Baviera, Alemania",
    country: "Alemania",
    countryCode: "de",
    importance: 0.7462108837044543,
    longitude: 11.5753822,
    latitude: 48.1371079,
  },
  {
    name: "Nueva York",
    displayName: "Nueva York, Estados Unidos de América",
    country: "Estados Unidos de América",
    countryCode: "us",
    importance: 0.8175766114518461,
    longitude: -74.0060152,
    latitude: 40.7127281,
  },
  {
    name: "Londres",
    displayName: "Londres, Greater London, Inglaterra, Reino Unido",
    country: "Reino Unido",
    countryCode: "gb",
    importance: 0.8307827616237295,
    longitude: -0.1277653,
    latitude: 51.5074456,
  },
  {
    name: "Madrid",
    displayName: "Madrid, Comunidad de Madrid, España",
    country: "España",
    countryCode: "es",
    importance: 0.7580703794097986,
    longitude: -3.7035825,
    latitude: 40.4167047,
  },
  {
    name: "Seúl",
    displayName: "Seúl, Corea del Sur",
    country: "Corea del Sur",
    countryCode: "kr",
    importance: 0.6297939847554467,
    longitude: 126.9782914,
    latitude: 37.5666791,
  },
];

export const getRandomCity = () => {
  const index = Math.floor(Math.random() * placeholderCities.length);
  return placeholderCities[index];
};
