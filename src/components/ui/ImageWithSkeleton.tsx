"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onLoadingComplete"> & {
  className?: string;
  imgClassName?: string;
};

export default function ImageWithSkeleton({ className = "", imgClassName = "", alt, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);
  const isFill = Boolean(props.fill);

  return (
    <div className={cn("relative overflow-hidden", isFill ? "absolute inset-0 w-full h-full" : "", className)}>
      {!loaded && (
        <div className="absolute inset-0 skeleton z-10" />
      )}
      <Image
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-all duration-300 ease-out",
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-102 blur-[2px]",
          isFill ? "object-cover w-full h-full" : "",
          imgClassName
        )}
        {...props}
      />
    </div>
  );
}
