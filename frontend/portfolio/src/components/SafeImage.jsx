import { useEffect, useState } from "react";

const SafeImage = ({ fallback = null, onError, src, ...props }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return fallback;
  }

  return (
    <img
      {...props}
      src={src}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
};

export default SafeImage;
