"use client";

import { useCountUp } from "@/lib/hooks";

type Props = {
  target: number;
  suffix?: string;
  className?: string;
};

export default function CountUpStat({ target, suffix = "", className = "" }: Props) {
  const { ref, count } = useCountUp(target);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
