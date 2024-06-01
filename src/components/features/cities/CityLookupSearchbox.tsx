import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import CloseIcon from "../../../icons/CloseIcon";
import { CityDetails } from "../../../model/CityDetails";
import useCityLookup from "../../../hooks/useCityLookup";
import SearchIcon from "../../../icons/SearchIcon";
import Spinner from "../../common/Spinner";
import { useTranslation } from "react-i18next";

interface Props {
  onSelectItem: (city: CityDetails) => void;
}

const CityLookupSearchbox = ({ onSelectItem }: Props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityDetails | null>(null);

  // Utilizo la referencia para luego determinar si debo cerrar o no el dropdown ante un click 
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { results, loading, error } = useCityLookup(inputValue);

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
    <div ref={ref} className="relative w-full" onBlur={handleBlur}>
      <label className="text-xl" htmlFor="city-lookup">
        {t("title")}
      </label>
      <div className="mt-4" onFocus={() => setHasFocus(true)}>
        <Input
          id="city-lookup"
          value={
            !hasFocus && selectedCity ? selectedCity.displayName : inputValue
          }
          autoComplete="off"
          onKeyDown={(e) => {
            if ("Enter" === e.key) setHasFocus(false);
          }}
          className="border-borders border dark:border-none"
          onChange={handleChange}
          icon={<SearchIcon />}
          placeholder={t("cityLookup.placeholder")}
          rightElement={
            !!inputValue && (
              <Button
                className="h-full px-3 border-none shadow-none bg-transparent"
                onClick={() => handleReset()}
                aria-label="clear input"
              >
                <CloseIcon />
              </Button>
            )
          }
        ></Input>
      </div>
      {hasFocus && (!!results.length || loading || !!error) && (
        <div className="animate-popup absolute bg-base-200 rounded-lg border border-borders absolute z-10 w-full max-h-52 overflow-y-auto mt-1">
          {error && (
            <span className="flex p-5">{t("cityLookup." + error)}</span>
          )}
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
                  className="px-4 py-3 flex items-center cursor-pointer hover:bg-content-400/5 transition-[background] duration-100  [&:not(:last-child)]:border-b border-borders"
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
                    <span className="line-clamp-1" title={city.displayName}>
                      {city.displayName}
                    </span>
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
