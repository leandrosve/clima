import { FocusEvent, ReactNode, useRef, useState } from "react";
import Button, { ButtonProps } from "./Button";
import ChevronIcon from "../../icons/ChevronIcon";
import CheckIcon from "../../icons/CheckIcon";

interface Props {
  onChange?: (value: string) => void;
  options: string[];
  value: string;
  label?: string | ReactNode;
  buttonProps?: ButtonProps;
  renderOption?: (opt: string) => string | ReactNode;
}
const Dropdown = ({
  onChange,
  options,
  value,
  label,
  buttonProps,
  renderOption = (o) => o,
}: Props) => {
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
        <Button {...buttonProps}>{label ?? value}</Button>
      </div>
      {hasFocus && (
        <ul
          tabIndex={-1}
          className="animate-popup bg-base-200 m-1 rounded-lg border border-borders absolute z-10  max-h-52 overflow-y-auto"
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
                "p-2 gap-1 flex items-center justify-start cursor-pointer hover:bg-content-400/5 transition-[background] duration-100  [&:not(:last-child)]:border-b border-borders"
              }
            >
              {value == o ? <CheckIcon className="size-3" /> : null}{" "}
              {renderOption(o)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
