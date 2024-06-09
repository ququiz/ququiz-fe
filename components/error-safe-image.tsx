"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ErrorSafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ErrorSafeImage = (props: ErrorSafeImageProps) => {
  const [fallbackStyle, setFallbackStyle] = useState({});
  const [fallbackClass, setFallbackClass] = useState("");
  const [src, setSrc] = useState(props.src as string);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.src = "/logo.png";
    setFallbackStyle({
      backgroundColor: "#bbb",
      padding: "1rem",
      height: "8rem",
    });
    setFallbackClass("h-full w-full object-contain saturate-0");
    setSrc("/logo.png");
  };

  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <div style={fallbackStyle}>
      <Image
        onError={handleError}
        {...props}
        src={src}
        className={cn(props.className, fallbackClass)}
      />
    </div>
  );
};
export default ErrorSafeImage;
