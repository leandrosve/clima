import { useState, useEffect } from "react";

const useDebounced = <T>(value: T, func: (v: T) => void, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value === debouncedValue) {
        func(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);
};

export default useDebounced;
