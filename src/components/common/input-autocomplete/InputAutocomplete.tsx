"use client";
import React, {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import Input, { InputProps } from "../input/Input";
import "./InputAutocomplete.css";
import Button from "../button/Button";

interface Props<T> extends Omit<InputProps, "onChange" | "onBlur"> {
  items: T[];
  searchFunction: (item: T, searchTerm: string) => boolean;
  labelAccesor: (item: T) => string | ReactNode;
  valueAccesor: (item: T) => string;
  minLetters?: number;
  maxResults?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onSelectItem?: (item: T) => void;
}

const InputAutocomplete = <T,>(
  {
    items,
    searchFunction,
    labelAccesor,
    valueAccesor,
    minLetters = 1,
    maxResults,
    onSelectItem,
    onChange,
    onBlur,
    ...inputProps
  }: Props<T>,
  inputRef: ForwardedRef<HTMLInputElement>
) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return items
      .filter((i) => searchFunction(i, inputValue))
      .slice(0, maxResults ?? items.length);
  }, [searchFunction, inputValue, maxResults, items]);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.relatedTarget as Node)) {
      setHasFocus(false);
      onBlur?.();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
    onChange?.("");
  };

  const onSelect = (item: T) => {
    const value = valueAccesor(item);
    setInputValue(value);
    setHasFocus(false);
    onChange?.(value);
    onSelectItem?.(item);
  };

  return (
    <div ref={ref} className="relative" onBlur={handleBlur}>
      <div onFocus={() => setHasFocus(true)}>
        <Input
          value={inputValue}
          ref={inputRef}
          autoComplete="off"
          onKeyDown={(e) => {
            if ("Enter" === e.key) setHasFocus(false);
          }}
          onChange={handleChange}
          rightElement={
            !!inputValue && (
              <Button
                className="input-autocomplete__reset"
                onClick={() => handleReset()}
              >
                x
              </Button>
            )
          }
          {...inputProps}
        ></Input>
      </div>
      {hasFocus &&
        inputValue.length >= minLetters &&
        !!filteredItems.length && (
          <ul
            tabIndex={-1}
            className="absolute bg-base-200 rounded-lg border border-content-400/10 absolute z-10 w-full max-h-52 overflow-y-auto"
          >
            {filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={() => onSelect(item)}
                tabIndex={0}
                className="px-4 py-2 flex items-center cursor-pointer hover:bg-content-400/5 transition-[background] duration-100  [&:not(:last-child)]:border-b border-content-400/10"
                onKeyDown={(e) => {
                  if ("Enter" === e.key) onSelect(item);
                }}
              >
                {labelAccesor(item)}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

// Otherwise the type checking gets completely lost
export default forwardRef(InputAutocomplete) as <T>(
  props: Props<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputAutocomplete>;
