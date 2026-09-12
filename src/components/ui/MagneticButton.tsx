"use client";

import { useMagneticEffect } from "@/lib/hooks";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export default function MagneticButton({ children, strength = 0.25, className }: Props) {
  const ref = useMagneticEffect(strength);

  return (
    <span
      ref={ref as unknown as React.RefObject<HTMLSpanElement>}
      className={`inline-block transition-transform duration-200 ease-out ${className || ""}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </span>
  );
}
