import React from "react";
import { joinClassNames } from "../../utils/StringUtils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CLASSNAME =
  "bg-base-200 inline-flex items-center text-content-100 gap-2  hover:duration-200 shadow-sm hover:bg-content-400/5 p-3 rounded-md focus:outline-1 focus:outline-outline min-w-fit";

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={joinClassNames(CLASSNAME, className)} {...props}>
      {children}
    </button>
  );
};

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LinkButton = ({
  children,
  className,
  ...props
}: LinkButtonProps) => {
  return (
    <a className={joinClassNames(CLASSNAME, className)} {...props}>
      {children}
    </a>
  );
};

export default Button;
