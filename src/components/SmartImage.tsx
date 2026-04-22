import { ImgHTMLAttributes, useState } from "react";

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export default function SmartImage({
  wrapperClassName = "",
  className = "",
  alt = "",
  onLoad,
  onError,
  ...props
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <span className={`image-loader-frame ${wrapperClassName}`}>
      {!isLoaded && !hasError && <span className="image-loader-shimmer" />}
      {hasError ? (
        <span className="image-loader-fallback">
          <span>No image</span>
        </span>
      ) : (
        <img
          {...props}
          alt={alt}
          className={`${className} image-loader-img ${
            isLoaded ? "image-loader-img-loaded" : ""
          }`}
          onLoad={(event) => {
            setIsLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
        />
      )}
    </span>
  );
}
