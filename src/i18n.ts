import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import ConfigService from "./services/local/ConfigService";

i18n
  .use(Backend) // Para que cargue las traducciones dinamicamente de la carpeta public
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: ConfigService.localConfig.lang || "es",
    debug: false,
  });

export default i18n;
