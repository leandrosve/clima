import { useMemo, useState } from "react";
import "./assets/css/globals.css";
import "./App.css";
import citites from "./model/static/cities";
import useWeatherData from "./hooks/useWeatherData";
import SearchIcon from "./icons/SearchIcon";
import InputAutocomplete from "./components/common/input-autocomplete/InputAutocomplete";
import { includesIgnoreCase } from "./utils/StringUtils";
import WeatherCard from "./components/features/weather/WeatherCard";

function App() {
  const [city, setCity] = useState(citites[0]);

  const { loading, error, weatherData, reload } = useWeatherData(city);

  return (
    <div className="bg-base-100 text-content-100 w-screen min-h-screen flex items-center justify-center">
      <div className="main">
        <h1>Buscador de clima</h1>
        <InputAutocomplete
          placeholder="Busca una ciudad"
          icon={<SearchIcon />}
          items={citites}
          labelAccesor={(c) => (
            <div className="flex gap-5">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${c.countryCode.toLowerCase()}.svg`}
                alt={c.country}
                className="size-6 rounded-full "
              />
              {c.name} ({c.country})
            </div>
          )}
          minLetters={0}
          valueAccesor={(c) => `${c.name} (${c.country})`}
          onSelectItem={(c) => setCity(c)}
          searchFunction={(c, term) => {
            term = term.trim();
            if (!term) return true;
            return includesIgnoreCase(`${c.name} (${c.country})`, term);
          }}
        ></InputAutocomplete>

        <div>
          {loading && "cargando..."}
          {error}
          {!loading && weatherData && (
            <WeatherCard city={city} weatherData={weatherData} />
          )}
          <button onClick={reload}>reload</button>
        </div>
      </div>
    </div>
  );
}

export default App;
