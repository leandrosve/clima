// Posibles "estados de animos" del clima, se usara para determinar la imagen
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

// Algunos iconos a mostrar varian entre dia y noche
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

// Devuelve el icono correspondiente en base al animo del clima y si es dia o noche
const getWeatherIcon = (mood: WeatherMoods, isDay?: boolean) => {
  const basePath = "/src/assets/images/weather/";
  if (isDay) return basePath + weatherIcons.day[mood];
  return basePath + weatherIcons.night[mood];
};

// Todos los codigos de tiempo que puede llegar a devolver la API
// En base a los WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
const weatherCodes: Record<number, { mood: WeatherMoods; localeKey: string }> =
  {
    0: {
      mood: WeatherMoods.CLEAR,
      localeKey: "clearSky",
    },
    1: {
      mood: WeatherMoods.PARTIAL_CLOUD,
      localeKey: "mainlyClear",
    },
    2: {
      mood: WeatherMoods.PARTIAL_CLOUD,
      localeKey: "partlyCloudy",
    },
    3: {
      mood: WeatherMoods.CLOUD,
      localeKey: "overcast",
    },
    45: {
      mood: WeatherMoods.FOG,
      localeKey: "fog",
    },
    48: {
      mood: WeatherMoods.FOG,
      localeKey: "fog",
    },
    51: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "lightDrizzle",
    },
    53: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "moderateDrizzle",
    },
    55: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "denseDrizzle",
    },
    56: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "lightFreezingDrizzle",
    },
    57: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "denseFreezingDrizzle",
    },

    61: {
      mood: WeatherMoods.RAIN,
      localeKey: "slightRain",
    },
    63: {
      mood: WeatherMoods.RAIN,
      localeKey: "moderateRain",
    },
    65: {
      mood: WeatherMoods.RAIN,
      localeKey: "heavyRain",
    },
    66: {
      mood: WeatherMoods.RAIN,
      localeKey: "lightFreezingRain",
    },
    67: {
      mood: WeatherMoods.RAIN,
      localeKey: "denseFreezingRain",
    },
    71: {
      mood: WeatherMoods.LIGHT_SNOW,
      localeKey: "slightSnowfall",
    },
    73: {
      mood: WeatherMoods.LIGHT_SNOW,
      localeKey: "moderateSnowfall",
    },
    75: {
      mood: WeatherMoods.SNOW,
      localeKey: "heavySnowfall",
    },
    77: {
      mood: WeatherMoods.SNOW,
      localeKey: "snowGrains",
    },
    80: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "slightRainShower",
    },
    81: {
      mood: WeatherMoods.DRIZZLE,
      localeKey: "moderateRainShower",
    },
    82: {
      mood: WeatherMoods.RAIN,
      localeKey: "heavyRainShower",
    },
    85: {
      mood: WeatherMoods.SNOW,
      localeKey: "slightSnowShower",
    },
    86: {
      mood: WeatherMoods.SNOW,
      localeKey: "heavySnowShower",
    },
    95: {
      mood: WeatherMoods.THUNDER,
      localeKey: "thunderstorm",
    },
    96: {
      mood: WeatherMoods.SNOW,
      localeKey: "slightHail",
    },
    99: {
      mood: WeatherMoods.SNOW,
      localeKey: "heavyHail",
    },
  };

export { weatherCodes, weatherIcons, getWeatherIcon, WeatherMoods };
