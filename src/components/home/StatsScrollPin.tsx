"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import CountUpStat from "@/components/ui/CountUpStat";
import { Award, Users, Activity, Bed } from "lucide-react";

export type StatItem = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  stats: StatItem[];
};

const STAT_ICONS = [Award, Users, Activity, Bed];

// Smooth cubic easing for scroll transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolate(
  v: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
): number {
  if (v <= inStart) return outStart;
  if (v >= inEnd) return outEnd;
  const t = Math.min(Math.max((v - inStart) / (inEnd - inStart), 0), 1);
  const ease = easeInOutCubic(t);
  return outStart + (outEnd - outStart) * ease;
}

/* ──────────────────────── Static Fallback (for reduced motion) ──────────────────────── */
function StaticStats({ stats }: Props) {
  return (
    <section className="section-padding bg-gradient-to-b from-teal-700 via-teal-800 to-teal-900 relative overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/15 rounded-full blur-[140px]" />
      </div>
      <div className="container-lg relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-teal-100 mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-coral-400" />
            Milestones of Trust & Care
          </span>
          <h2 className="heading-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight">
            Numbers That Define Our{" "}
            <span className="text-coral-300">Commitment</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-center max-w-7xl mx-auto w-full">
          {stats.slice(0, 4).map((stat, i) => {
            const Icon = STAT_ICONS[i] || Award;
            return (
              <div
                key={stat.id}
                className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-subtle flex flex-col items-center justify-center text-center h-full min-h-[180px] sm:min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-teal-200 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-none">
                  <CountUpStat target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-teal-100 font-medium text-sm sm:text-base leading-snug">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── Scroll-Pinned Dynamic Section ──────────────────────── */
export default function StatsScrollPin({ stats }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slot1AnchorRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [offset, setOffset] = useState({ x: 0, y: 0, scale: 1.7 });
  const [mounted, setMounted] = useState(false);
  const [startOtherCounts, setStartOtherCounts] = useState(false);

  const heroStat = stats[0] || {
    id: "1",
    value: 22,
    suffix: "+",
    label: "Years of Excellence",
  };
  const otherStats = stats.slice(1, 4);

  // Measure untransformed center of Slot 1 relative to container center
  const updateOffset = () => {
    if (!slot1AnchorRef.current || !containerRef.current) return;
    const slotRect = slot1AnchorRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;

    const slotCenterX = slotRect.left - containerRect.left + slotRect.width / 2;
    const slotCenterY = slotRect.top - containerRect.top + slotRect.height / 2;

    const deltaX = containerCenterX - slotCenterX;
    const deltaY = containerCenterY - slotCenterY;

    const width = window.innerWidth;
    const targetScale = width < 640 ? 1.25 : width < 1024 ? 1.45 : 1.7;

    setOffset({ x: deltaX, y: deltaY, scale: targetScale });
  };

  useEffect(() => {
    updateOffset();
    setMounted(true);

    const handleResize = () => {
      updateOffset();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Soft spring smoothing to remove scroll wheel jumps and jitter
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Trigger count-up for other stats once user scrolls into the reveal phase
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.28 && !startOtherCounts) {
        setStartOtherCounts(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, startOtherCounts]);

  // Motion transforms driven by smoothed scroll position
  // 1. Slot 1 (22+ Years of Excellence): starts big & centered, glides gently into Slot 1
  const slot1X = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.06, 0.6, offset.x, 0) : 0
  );
  const slot1Y = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.06, 0.6, offset.y, 0) : 0
  );
  const slot1Scale = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.06, 0.6, offset.scale, 1) : 1
  );

  // Hero decorations (badge & subtitle) fade out smoothly as number moves into card
  const heroDecorOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.05, 0.3, 1, 0)
  );
  const heroDecorY = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.05, 0.3, 0, -10)
  );

  // Section header fades in as cards organize
  const headerOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.16, 0.48, 0, 1)
  );
  const headerY = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.16, 0.48, -16, 0)
  );

  // Card 1's frame (border, background, icon) and other cards fade in as it arrives
  const cardFrameOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.18, 0.54, 0, 1)
  );

  // Slots 2, 3, 4 fade in and slide up into their grid slots
  const stat2Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.2, 0.54, 0, 1)
  );
  const stat2Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.2, 0.54, 24, 0)
  );

  const stat3Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.24, 0.58, 0, 1)
  );
  const stat3Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.24, 0.58, 24, 0)
  );

  const stat4Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.28, 0.62, 0, 1)
  );
  const stat4Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.28, 0.62, 24, 0)
  );

  const otherCardMotions = [
    { opacity: stat2Opacity, y: stat2Y },
    { opacity: stat3Opacity, y: stat3Y },
    { opacity: stat4Opacity, y: stat4Y },
  ];

  return (
    <>
      {/* Fallback for reduced-motion users */}
      <div className="motion-safe:hidden">
        <StaticStats stats={stats} />
      </div>

      {/* Interactive scroll-pinned experience */}
      <div className="motion-reduce:hidden">
        <section
          ref={sectionRef}
          className="relative"
          style={{ height: "220vh" }}
        >
          {/* Full-height sticky container: avoids uneven bottom clipping */}
          <div
            ref={containerRef}
            className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-teal-700 via-teal-800 to-teal-900 text-white select-none py-12"
          >
            {/* Ambient Background Accents - fully contained without bottom cutoffs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-400/15 rounded-full blur-[140px]" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-coral-500/10 rounded-full blur-[120px]" />
              <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-white/5 rounded-full blur-[90px]" />
            </div>

            {/* Main Content Area */}
            <div className="container-lg relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header: Fades in as numbers arrange */}
              <motion.div
                style={{ opacity: headerOpacity, y: headerY }}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-teal-100 mb-3 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-coral-400" />
                  Milestones of Trust & Care
                </span>
                <h2 className="heading-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight">
                  Numbers That Define Our{" "}
                  <span className="text-coral-300">Commitment</span>
                </h2>
              </motion.div>

              {/* 4 Statistics in One Consistent Horizontal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-center max-w-7xl mx-auto w-full">
                {/* ── Slot 1: "22+ Years of Excellence" in its own aligned card ── */}
                <div
                  ref={slot1AnchorRef}
                  className="relative p-6 sm:p-7 rounded-2xl backdrop-blur-sm shadow-subtle flex flex-col items-center justify-center text-center h-full min-h-[180px] sm:min-h-[200px]"
                >
                  {/* Card 1 Frame (background and border) that fades in as the stat lands */}
                  <motion.div
                    style={{ opacity: cardFrameOpacity }}
                    className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 pointer-events-none"
                  />

                  {/* Card 1 Icon fades in to match other cards */}
                  <motion.div
                    style={{ opacity: cardFrameOpacity }}
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-teal-200 shrink-0 z-10"
                  >
                    <Award className="w-6 h-6" />
                  </motion.div>

                  {/* Morphed Stat Number & Label */}
                  <motion.div
                    style={{
                      x: slot1X,
                      y: slot1Y,
                      scale: slot1Scale,
                      transformOrigin: "center center",
                      willChange: "transform",
                    }}
                    className="relative z-20 flex flex-col items-center justify-center text-center"
                  >
                    {/* Hero Badge: absolutely positioned so it never distorts card height */}
                    <motion.div
                      style={{
                        opacity: heroDecorOpacity,
                        y: heroDecorY,
                      }}
                      className="absolute bottom-full mb-3 sm:mb-4 whitespace-nowrap pointer-events-none inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-teal-100 shadow-sm"
                    >
                      <Award className="w-3.5 h-3.5 text-coral-300" />
                      Two Decades of Excellence
                    </motion.div>

                    {/* The Big Stat Number */}
                    <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-none">
                      <CountUpStat
                        target={heroStat.value}
                        suffix={heroStat.suffix}
                        start={isInView}
                      />
                    </div>

                    {/* The Primary Label */}
                    <div className="text-teal-100 font-medium text-sm sm:text-base leading-snug">
                      {heroStat.label}
                    </div>

                    {/* Hero Subtitle: absolutely positioned so it never distorts card height */}
                    <motion.p
                      style={{
                        opacity: heroDecorOpacity,
                        y: heroDecorY,
                      }}
                      className="absolute top-full mt-3 w-64 sm:w-80 pointer-events-none text-teal-200/90 text-xs sm:text-sm text-center leading-relaxed font-normal"
                    >
                      NABH Accredited Super Multispeciality Hospital serving
                      Punjab with world-class medical innovation since 2002.
                    </motion.p>
                  </motion.div>
                </div>

                {/* ── Slots 2, 3, 4: Equal-height cards in the exact same grid ── */}
                {otherStats.map((stat, idx) => {
                  const Icon = STAT_ICONS[idx + 1] || Award;
                  const motionStyle = otherCardMotions[idx] || otherCardMotions[0];

                  return (
                    <motion.div
                      key={stat.id}
                      style={{
                        opacity: motionStyle.opacity,
                        y: motionStyle.y,
                        willChange: "transform, opacity",
                      }}
                      className="relative p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-subtle flex flex-col items-center justify-center text-center h-full min-h-[180px] sm:min-h-[200px]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-teal-200 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-none">
                        <CountUpStat
                          target={stat.value}
                          suffix={stat.suffix}
                          start={startOtherCounts}
                        />
                      </div>
                      <div className="text-teal-100 font-medium text-sm sm:text-base leading-snug">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
