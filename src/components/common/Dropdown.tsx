import { FocusEvent, useRef, useState } from "react";
import Button, { ButtonProps } from "./Button";

interface Props {
  onChange?: (value: string) => void;
  options: string[];
  value: string;
  buttonProps?: ButtonProps;
}
const Dropdown = ({ onChange, options, value, buttonProps }: Props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.relatedTarget as Node)) {
      setHasFocus(false);
    }
  };

  const onSelect = (item: string) => {
    setHasFocus(false);
    onChange?.(item);
  };

  return (
    <div ref={ref} className="relative" onBlur={handleBlur}>
      <div onFocus={() => setHasFocus(true)}>
        <Button {...buttonProps}>{value}</Button>
      </div>
      {hasFocus && (
        <ul
          tabIndex={-1}
          className="bg-base-200 mt-1 rounded-lg border border-content-400/10 absolute z-10 w-full max-h-52 overflow-y-auto"
        >
          {options.map((o) => (
            <li
              key={o}
              onClick={() => onSelect(o)}
              tabIndex={0}
              onKeyDown={(e) => {
                if ("Enter" === e.key) onSelect(o);
              }}
              className={
                "p-2 flex items-center justify-center cursor-pointer hover:bg-content-400/5 transition-[background] duration-100  [&:not(:last-child)]:border-b border-content-400/5"
              }
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
