import { useEffect, useState } from "react";
import "./assets/css/globals.css";
import useWeatherData from "./hooks/useWeatherData";
import WeatherCard from "./components/features/weather/WeatherCard";
import CityLookupSearchbox from "./components/features/weather/CityLookupSearchbox";
import { CityDetails } from "./model/CityDetails";
import Button from "./components/common/Button";
import Spinner from "./components/common/Spinner";
import SyncIcon from "./icons/SyncIcon";
import ConfigService from "./services/local/ConfigService";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

function App() {
  const [city, setCity] = useState<CityDetails | null>(null);
  const { loading, error, weatherData, reload } = useWeatherData(city);
  const [initialized, setInitialized] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const config = ConfigService.initialize();
    setTheme(config.theme);
    setInitialized(true);
  }, []);

  if (!initialized) return;
  return (
    <div className="bg-base-100 text-content-100 w-screen min-h-screen flex flex-col items-center">
      <div className="bg-base-200 m-2">
        <Button onClick={() => setTheme(ConfigService.switchTheme())}>
          {theme == "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
      <div className=" w-[600px] mt-[15vh]">
        <h1 className="text-xl mb-3">¿Como está el clima?</h1>
        <CityLookupSearchbox onSelectItem={(c) => setCity(c)} />

        <div className="flex flex-col justify-center mt-10">
          {loading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}
          {error}
          {!loading && city && weatherData && (
            <div className="animate-fadeIn">
              <WeatherCard city={city} weatherData={weatherData} />
            </div>
          )}
          {city && !loading && (
            <Button
              onClick={reload}
              aria-label="Reload"
              className="self-end mt-3"
            >
              <SyncIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
