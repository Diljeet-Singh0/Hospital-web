"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <span className="relative inline-block mr-[0.28em] last:mr-0">
      <motion.span
        style={{ opacity }}
        className="text-ink transition-colors will-change-[opacity]"
      >
        {children}
      </motion.span>
    </span>
  );
}

type Props = {
  text: string;
  className?: string;
  progress?: MotionValue<number>;
  range?: [number, number];
  offset?: [string, string];
};

export default function ScrollWordReveal({
  text,
  className,
  progress,
  range = [0, 1],
  offset = ["start 0.90", "start 0.15"],
}: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const activeProgress = progress || localProgress;
  const [rangeStart, rangeEnd] = progress ? range : [0, 1];

  const words = text.split(" ");
  const total = words.length;

  return (
    <p
      ref={containerRef}
      className={cn("leading-relaxed flex flex-wrap", className)}
    >
      {words.map((word, i) => {
        const step = (rangeEnd - rangeStart) / total;
        const start = rangeStart + i * step;
        const end = Math.min(start + step * 2, rangeEnd);
        return (
          <Word key={i} progress={activeProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
