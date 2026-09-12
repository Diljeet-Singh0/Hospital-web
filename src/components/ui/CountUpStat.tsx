"use client";

import { useCountUp } from "@/lib/hooks";

type Props = {
  target: number;
  suffix?: string;
  className?: string;
  start?: boolean;
};

export default function CountUpStat({ target, suffix = "", className = "", start = true }: Props) {
  const { ref, count } = useCountUp(target, start);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
