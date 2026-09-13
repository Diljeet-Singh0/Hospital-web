"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
  ease?: number[] | string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 16,
  x = 0,
  duration = 0.4,
  ease = [0.25, 0.46, 0.45, 0.94],
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  staggerDelay = 0.05,
  className = "",
  once = true,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px" });

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div ref={ref} className={className}>
      {childrenArray.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 0.35,
            delay: i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
