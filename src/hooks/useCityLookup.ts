import React, { useState } from "react";
import { CityDetails } from "../model/CityDetails";
import CitiesAPIService from "../services/api/CitiesAPIService";
import Logger from "../utils/Logger";
import useDebounced from "./useDebounced";

const useCityLookup = (searchTerm: string) => {
  const [results, setResults] = useState<CityDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const search = async (term: string) => {
    console.log("search", term)
    setDebouncedTerm(term);
    const sanitizedTerm = term.trim();
    if (!sanitizedTerm) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await CitiesAPIService.searchCity(sanitizedTerm);
    setLoading(false);
    if (res.hasError) {
      Logger.danger("Ocurrió un error", res.error);
      setError(
        "Ups! Se produjo un error inesperado al tratar de obtener la información."
      );
      return;
    }
    if (!res.data.length) {
      console.log("NO RESULTS")
      setError("No se han encontrado resultados para su búsqueda");
    }
    console.log(res.data)
    const orderedResults = res.data.sort((a, b) => b.importance - a.importance);
    setResults(orderedResults);
  };

  // Realizar la busqueda 700ms luego de que deje de escribir, para no agoviar a la API
  useDebounced(searchTerm, (t) => search(t), 300);

  return {
    results,
    debouncedTerm,
    loading,
    error,
  };
};

export default useCityLookup;
