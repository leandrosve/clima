import { useState } from "react";
import { CityDetails } from "../model/CityDetails";
import CitiesAPIService from "../services/api/CitiesAPIService";
import useDebounced from "./useDebounced";
import { useTranslation } from "react-i18next";

// Este hook contiene la logica para la búsqueda de ciudades
const useCityLookup = (searchTerm: string) => {
  const [results, setResults] = useState<CityDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Accedo al lenguage seleccionado para indicarle a la API el idioma preferido para la busqueda
  const { i18n } = useTranslation();
  const search = async (term: string) => {
    // Quito posibles espacios al principio y final
    const sanitizedTerm = term.trim();
    setError(null);
    if (!sanitizedTerm) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await CitiesAPIService.searchCity(sanitizedTerm, i18n.language);
    setLoading(false);
    
    // Utilzo códigos de error para luego poder aplicarles la traduccion
    if (res.hasError) {
      setError("defaultError");
      return;
    }
    if (!res.data.length) {
      setError("noResults");
    }
    const orderedResults = res.data.sort((a, b) => b.importance - a.importance);
    setResults(orderedResults);
  };

  // Realizar la busqueda 300ms luego de que deje de escribir, para no agoviar a la API
  useDebounced(searchTerm, (t) => search(t), 300);

  return {
    results,
    loading,
    error,
  };
};

export default useCityLookup;
