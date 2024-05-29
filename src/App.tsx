import { useState } from "react";
import "./assets/css/globals.css";
import useWeatherData from "./hooks/useWeatherData";
import WeatherCard from "./components/features/weather/WeatherCard";
import CityLookupSearchbox from "./components/features/weather/CityLookupSearchbox";
import { CityDetails } from "./model/CityDetails";
import Button from "./components/common/Button";
import Spinner from "./components/common/Spinner";
import SyncIcon from "./icons/SyncIcon";

function App() {
  const [city, setCity] = useState<CityDetails | null>(null);

  const { loading, error, weatherData, reload } = useWeatherData(city);

  return (
    <div className="bg-base-100 text-content-100 w-screen min-h-screen flex justify-center">
      <div className=" w-[600px] mt-[20vh]">
        <h1 className="text-xl">Como está el clima?</h1>
        <CityLookupSearchbox onSelectItem={(c) => setCity(c)} />

        <div className="flex flex-col justify-center mt-10">
          {loading && <Spinner />}
          {error}
          {!loading && city && weatherData && (
            <WeatherCard city={city} weatherData={weatherData} />
          )}
          <Button onClick={reload} aria-label="Reload" className="self-end mt-3">
            <SyncIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
