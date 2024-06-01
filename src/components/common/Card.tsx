import React, { ReactNode } from "react";
import { joinClassNames } from "../../utils/StringUtils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={joinClassNames(
        "relative card-gradient rounded-sm shadow overflow-hidden z-10 border-borders border dark:border-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
