import { useRef } from "react";

const ImageFallBack = (props) => {
  const imageRef = useRef();
  const { src, fallback } = props;

  return (
    <img
      {...props}
      ref={imageRef}
      src={src == null || src == "undefined" ? fallback : src}
      onError={() => {
        imageRef.current.src = fallback;
      }}
    />
  );
};

export default ImageFallBack;
