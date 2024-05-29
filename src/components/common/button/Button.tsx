import React from "react";
import "./Button.css";
import { joinClassNames } from "../../../utils/StringUtils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={joinClassNames("button", className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
