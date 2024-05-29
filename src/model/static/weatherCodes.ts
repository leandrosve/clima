enum WeatherMoods {
  CLEAR = "CLEAR",
  PARTIAL_CLOUD = "PARTIAL_CLOUD",
  CLOUD = "CLOUD",
  DRIZZLE = "DRIZZLE",
  RAIN = "RAIN",
  RAIN_THUNDER = "RAIN_THUNDER",
  LIGHT_SNOW = "LIGHT_SNOW",
  SNOW = "SNOW",
  THUNDER = "THUNDER",
  SNOW_THUNDER = "SNOW_THUNDER",
  FOG = "FOG",
}

const weatherIcons = {
  day: {
    [WeatherMoods.CLEAR]: "day_clear.svg",
    [WeatherMoods.PARTIAL_CLOUD]: "day_partial_cloud.svg",
    [WeatherMoods.CLOUD]: "cloudy.svg",
    [WeatherMoods.DRIZZLE]: "day_rain.svg",
    [WeatherMoods.RAIN]: "rain.svg",
    [WeatherMoods.RAIN_THUNDER]: "thunder.svg",
    [WeatherMoods.LIGHT_SNOW]: "day_snow.svg",
    [WeatherMoods.SNOW]: "snow.svg",
    [WeatherMoods.THUNDER]: "thunder.svg",
    [WeatherMoods.SNOW_THUNDER]: "snow.svg",
    [WeatherMoods.FOG]: "fog.svg",
  },
  night: {
    [WeatherMoods.CLEAR]: "night_full_moon_clear.svg",
    [WeatherMoods.PARTIAL_CLOUD]: "night_full_moon_partial_cloud.svg",
    [WeatherMoods.CLOUD]: "cloudy.svg",
    [WeatherMoods.DRIZZLE]: "night_full_moon_rain.svg",
    [WeatherMoods.RAIN]: "rain.svg",
    [WeatherMoods.RAIN_THUNDER]: "thunder.svg",
    [WeatherMoods.LIGHT_SNOW]: "night_full_moon_snow.svg",
    [WeatherMoods.SNOW]: "snow.svg",
    [WeatherMoods.THUNDER]: "thunder.svg",
    [WeatherMoods.SNOW_THUNDER]: "snow.svg",
    [WeatherMoods.FOG]: "fog.svg",
  },
};

const getWeatherIcon = (mood: WeatherMoods, isDay?: boolean) => {
  const basePath = "/src/assets/images/weather/";
  if (isDay) return basePath + weatherIcons.day[mood];
  return basePath + weatherIcons.night[mood];
};

// En base a los WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
const weatherCodes: Record<
  number,
  { mood: WeatherMoods; description: string }
> = {
  0: {
    mood: WeatherMoods.CLEAR,
    description: "Clear sky",
  },
  1: {
    mood: WeatherMoods.PARTIAL_CLOUD,
    description: "Mainly clear",
  },
  2: {
    mood: WeatherMoods.PARTIAL_CLOUD,
    description: "partly cloudy",
  },
  3: {
    mood: WeatherMoods.CLOUD,
    description: "overcast",
  },
  45: {
    mood: WeatherMoods.FOG,
    description: "Fog",
  },
  48: {
    mood: WeatherMoods.FOG,
    description: "Fog",
  },
  51: {
    mood: WeatherMoods.DRIZZLE,
    description: "Light Drizzle",
  },
  53: {
    mood: WeatherMoods.DRIZZLE,
    description: "Moderate Drizzle",
  },
  55: {
    mood: WeatherMoods.DRIZZLE,
    description: "Dense Drizzle",
  },
  56: {
    mood: WeatherMoods.DRIZZLE,
    description: "Light Freezing Drizzle",
  },
  57: {
    mood: WeatherMoods.DRIZZLE,
    description: "Dense Freezing Drizzle",
  },

  61: {
    mood: WeatherMoods.RAIN,
    description: "Slight Rain",
  },
  63: {
    mood: WeatherMoods.RAIN,
    description: "Moderate Rain",
  },
  65: {
    mood: WeatherMoods.RAIN,
    description: "Dense Freezing Drizzle",
  },
  66: {
    mood: WeatherMoods.RAIN,
    description: "Light Freezing Rain",
  },
  67: {
    mood: WeatherMoods.RAIN,
    description: "Dense Freezing Rain",
  },
  71: {
    mood: WeatherMoods.LIGHT_SNOW,
    description: "Slight Snow Fall",
  },
  73: {
    mood: WeatherMoods.LIGHT_SNOW,
    description: "Moderate Snow Fall",
  },
  75: {
    mood: WeatherMoods.SNOW,
    description: "Heavy Snow Fall",
  },
  77: {
    mood: WeatherMoods.SNOW,
    description: "Snow grains",
  },
  80: {
    mood: WeatherMoods.DRIZZLE,
    description: "Slight Rain Shower",
  },
  81: {
    mood: WeatherMoods.DRIZZLE,
    description: "Moderate Rain Shower",
  },
  82: {
    mood: WeatherMoods.RAIN,
    description: "Heavy Rain Shower",
  },
  85: {
    mood: WeatherMoods.SNOW,
    description: "Slight Snow Shower",
  },
  86: {
    mood: WeatherMoods.SNOW,
    description: "Heavy Snow Shower",
  },
  95: {
    mood: WeatherMoods.THUNDER,
    description: "Thunderstorm",
  },
  96: {
    mood: WeatherMoods.SNOW,
    description: "Slight Hail",
  },
  99: {
    mood: WeatherMoods.SNOW,
    description: "Heavy Hail",
  },
};

export { weatherCodes, weatherIcons, getWeatherIcon, WeatherMoods };
