import { useEffect, useState } from "react";
import "./assets/css/globals.css";
import ConfigService from "./services/local/ConfigService";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Inicializar tema guardado en almacenamiento local antes de renderizar, para evitar la trancision entre temas al recargar la pagina
    ConfigService.initialize();
    setInitialized(true);
  }, []);

  if (!initialized) return;
  return (
    <div className="bg-base-100 text-content-100 w-screen min-h-screen flex flex-col items-center">
      <div className="sm:w-[620px] max-sm:w-full flex flex-col p-2">
        <Header />
        <div className="mt-10 xl:mt-[20vh]">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
