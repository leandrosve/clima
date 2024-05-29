"use client";
import React, { ChangeEvent, FocusEvent, useRef, useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import CloseIcon from "../../../icons/CloseIcon";
import { CityDetails } from "../../../model/CityDetails";
import useCityLookup from "../../../hooks/useCityLookup";
import SearchIcon from "../../../icons/SearchIcon";
import Spinner from "../../common/Spinner";

interface Props {
  onSelectItem: (city: CityDetails) => void;
}

const CityLookupSearchbox = ({ onSelectItem }: Props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityDetails | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { results, loading, error, debouncedTerm } = useCityLookup(inputValue);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.relatedTarget as Node)) {
      setHasFocus(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
  };

  const onSelect = (city: CityDetails) => {
    setHasFocus(false);
    onSelectItem?.(city);
    setSelectedCity(city);
  };

  return (
    <div ref={ref} className="relative" onBlur={handleBlur}>
      <div onFocus={() => setHasFocus(true)}>
        <Input
          value={
            !hasFocus && selectedCity ? selectedCity.displayName : inputValue
          }
          autoComplete="off"
          onKeyDown={(e) => {
            if ("Enter" === e.key) setHasFocus(false);
          }}
          onChange={handleChange}
          icon={<SearchIcon />}
          placeholder="Buscar ciudades"
          rightElement={
            !!inputValue && (
              <Button
                className="h-full px-3 border-none shadow-none bg-transparent"
                onClick={() => handleReset()}
              >
                <CloseIcon />
              </Button>
            )
          }
        ></Input>
      </div>
      {hasFocus && (!!results.length || loading || !!error) && (
        <div className="absolute bg-base-200 rounded-lg border border-content-400/10 absolute z-10 w-full max-h-52 overflow-y-auto mt-1">
          {debouncedTerm && !results.length && !loading && (
            <span className="p-5">No se han encontrado resultados</span>
          )}
          {error && <span className="p-5">{error}</span>}

          {loading ? (
            <div className="flex justify-center p-5">
              <Spinner />
            </div>
          ) : (
            <ul tabIndex={-1}>
              {results.map((city, index) => (
                <li
                  key={index}
                  onClick={() => onSelect(city)}
                  tabIndex={0}
                  className="px-4 py-3 flex items-center cursor-pointer hover:bg-content-400/5 transition-[background] duration-100  [&:not(:last-child)]:border-b border-content-400/5"
                  onKeyDown={(e) => {
                    if ("Enter" === e.key) onSelect(city);
                  }}
                >
                  <div className="flex gap-5">
                    <img
                      src={`https://hatscripts.github.io/circle-flags/flags/${city.countryCode.toLowerCase()}.svg`}
                      alt={city.country}
                      className="size-6 rounded-full "
                    />
                    <span className="line-clamp-1" title={city.displayName}>{city.displayName}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CityLookupSearchbox;
