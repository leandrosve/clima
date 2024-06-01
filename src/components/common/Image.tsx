import React, { useState } from "react";
import { joinClassNames } from "../../utils/StringUtils";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const Image = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={joinClassNames(
        props.wrapperClassName,
        "transition-opacity duration-700",
        loaded ? "opacity-1" : "opacity-0"
      )}
    >
      <img {...props} onLoad={() => setLoaded(true)} />
    </div>
  );
};

export default Image;
