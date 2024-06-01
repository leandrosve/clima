import React, { InputHTMLAttributes, forwardRef } from "react";
import { joinClassNames } from "../../utils/StringUtils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  numeric?: boolean;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, rightElement, className, numeric, value, onChange, ...rest },
    ref
  ) => {
    return (
      <>
        <div
          className={joinClassNames(
            "relative rounded bg-base-200 shadow-lg flex items-center border border-transparent h-10  focus-within:outline-1",
            className
          )}
        >
          {!!icon && (
            <div className="absolute text-content-300 inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...rest}
            value={value}
            onChange={onChange}
            className={joinClassNames(
              numeric ? "font-mono placeholder-font-main" : "",
              icon ? "pl-8" : "pl-4",
              "w-full pr-4 py-2 rounded-lg bg-transparent focus:outline-none flex-grow"
            )}
          />

          {!!rightElement && (
            <div className="inset-y-0 right-0 flex items-center  pr-0 h-full">
              {rightElement}
            </div>
          )}
        </div>
      </>
    );
  }
);
export default Input;
