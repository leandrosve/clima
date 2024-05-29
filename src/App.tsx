import { Suspense, useEffect, useState } from "react";
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
import Dropdown from "./components/common/Dropdown";
import { useTranslation } from "react-i18next";

function App() {
  const [city, setCity] = useState<CityDetails | null>(null);
  const { loading, error, weatherData, reload } = useWeatherData(city);
  const [initialized, setInitialized] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const config = ConfigService.initialize();
    setTheme(config.theme);
    setInitialized(true);
  }, []);

  if (!initialized) return;
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="bg-base-100 text-content-100 w-screen min-h-screen flex flex-col items-center">
        <div className="sm:w-[620px] max-sm:w-full flex flex-col p-2">
          <div className="self-end m-2 mr-0 flex gap-1">
            <Dropdown
              options={["en", "es"]}
              value={i18n.language}
              buttonProps={{ className: "size-12 justify-center" }}
              onChange={(l) => i18n.changeLanguage(l)}
            />
            <Button
              className="size-12 justify-center"
              onClick={() => setTheme(ConfigService.switchTheme())}
            >
              {theme == "dark" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
          <h1 className="text-xl mb-3 mt-24">{t("title")}</h1>
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
                {t('weather.refresh')} <SyncIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
