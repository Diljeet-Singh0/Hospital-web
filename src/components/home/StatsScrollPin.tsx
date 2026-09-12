"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import CountUpStat from "@/components/ui/CountUpStat";
import { Award, Users, Activity, Bed, ChevronDown } from "lucide-react";

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
  const t = (v - inStart) / (inEnd - inStart);
  const ease = easeInOutCubic(t);
  return outStart + (outEnd - outStart) * ease;
}

/* ──────────────────────── Static Fallback (for reduced motion) ──────────────────────── */
function StaticStats({ stats }: Props) {
  return (
    <section className="section-padding bg-teal-700 relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-3xl" />
      </div>
      <div className="container-lg relative">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-100 text-xs font-semibold uppercase tracking-wider mb-2">
            Our Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Delivering Healthcare Excellence
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] || Award;
            return (
              <div key={stat.id} className="text-center lg:text-left">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 mx-auto lg:mx-0">
                  <Icon className="w-5 h-5 text-teal-200" />
                </div>
                <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-none">
                  <CountUpStat target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-teal-100 font-medium text-sm sm:text-base">
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

  const [offset, setOffset] = useState({ x: 0, y: 0, scale: 2.5 });
  const [mounted, setMounted] = useState(false);
  const [startOtherCounts, setStartOtherCounts] = useState(false);

  const heroStat = stats[0] || {
    id: "1",
    value: 22,
    suffix: "+",
    label: "Years of Excellence",
  };
  const otherStats = stats.slice(1);

  // Measure untransformed position of slot 1 relative to container center
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
    // Responsive scale factor for the big hero number
    const targetScale = width < 640 ? 1.7 : width < 1024 ? 2.1 : 2.5;

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
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

  // Motion transforms driven by scroll position
  // 1. Slot 1 (22+ Years of Excellence): starts big and centered, shrinks and glides to slot
  const slot1X = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.15, 0.65, offset.x, 0) : 0
  );
  const slot1Y = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.15, 0.65, offset.y, 0) : 0
  );
  const slot1Scale = useTransform(scrollYProgress, (v) =>
    mounted ? interpolate(v, 0.15, 0.65, offset.scale, 1) : 1
  );

  // Hero elements (tagline, badge) fade out as 22+ moves into position
  const heroDecorOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.08, 0.25, 1, 0)
  );
  const heroDecorY = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.08, 0.25, 0, -15)
  );

  // Scroll hint pill at bottom fades away quickly on initial scroll
  const scrollHintOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.02, 0.12, 1, 0)
  );
  const scrollHintY = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.02, 0.12, 0, 15)
  );

  // Section title & eyebrow at the top fade in as the numbers organize
  const headerOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.25, 0.55, 0, 1)
  );
  const headerY = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.25, 0.55, -20, 0)
  );

  // Slots 2, 3, 4 fade in and slide up smoothly into their original size
  const stat2Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.3, 0.58, 0, 1)
  );
  const stat2Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.3, 0.58, 35, 0)
  );
  const stat2Scale = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.3, 0.58, 0.9, 1)
  );

  const stat3Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.36, 0.64, 0, 1)
  );
  const stat3Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.36, 0.64, 35, 0)
  );
  const stat3Scale = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.36, 0.64, 0.9, 1)
  );

  const stat4Opacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.42, 0.7, 0, 1)
  );
  const stat4Y = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.42, 0.7, 35, 0)
  );
  const stat4Scale = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.42, 0.7, 0.9, 1)
  );

  // Background ambient glow pulse & tracking
  const glowScale = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.15, 0.65, 1.4, 0.9)
  );
  const glowOpacity = useTransform(scrollYProgress, (v) =>
    interpolate(v, 0.15, 0.65, 0.35, 0.15)
  );

  // Sleek progress bar at bottom showing completion through the pinned sequence
  const progressBarWidth = useTransform(
    scrollYProgress,
    (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`
  );

  const otherMotions = [
    { opacity: stat2Opacity, y: stat2Y, scale: stat2Scale },
    { opacity: stat3Opacity, y: stat3Y, scale: stat3Scale },
    { opacity: stat4Opacity, y: stat4Y, scale: stat4Scale },
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
          style={{ height: "250vh" }}
        >
          {/* Sticky Viewport Container: stays pinned while scrolling 0 -> 1 */}
          <div
            ref={containerRef}
            className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-teal-700 via-teal-800 to-teal-900 text-white select-none"
          >
            {/* Ambient Background Glows */}
            <motion.div
              style={{ scale: glowScale, opacity: glowOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-teal-400 rounded-full blur-[140px] pointer-events-none"
            />
            <div className="absolute -bottom-20 right-0 w-[450px] h-[450px] bg-coral-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-10 w-[350px] h-[350px] bg-white/5 rounded-full blur-[90px] pointer-events-none" />

            {/* Subtle concentric rings radiating from center during hero phase */}
            <motion.div
              style={{ opacity: heroDecorOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[620px] h-[340px] sm:h-[480px] lg:h-[620px] border border-white/10 rounded-full pointer-events-none"
            />
            <motion.div
              style={{ opacity: heroDecorOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[700px] lg:w-[900px] h-[520px] sm:h-[700px] lg:h-[900px] border border-white/5 rounded-full pointer-events-none"
            />

            {/* Main Content Area */}
            <div className="container-lg relative z-10 w-full px-4 sm:px-6 lg:px-8">
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

              {/* The Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {/* ── Slot 1: 22+ Years of Excellence (Hero morphs into this slot) ── */}
                <div
                  ref={slot1AnchorRef}
                  className="relative flex flex-col items-center lg:items-start text-center lg:text-left justify-center min-h-[140px] sm:min-h-[160px]"
                >
                  <motion.div
                    style={{
                      x: slot1X,
                      y: slot1Y,
                      scale: slot1Scale,
                      transformOrigin: "center center",
                      willChange: "transform",
                    }}
                    className="relative flex flex-col items-center lg:items-start text-center lg:text-left z-30"
                  >
                    {/* Hero Badge: visible only when big & centered */}
                    <motion.div
                      style={{
                        opacity: heroDecorOpacity,
                        y: heroDecorY,
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-teal-100 mb-3 sm:mb-4 shadow-sm"
                    >
                      <Award className="w-3.5 h-3.5 text-coral-300" />
                      Two Decades of Excellence
                    </motion.div>

                    {/* The Big Stat Number */}
                    <div className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-md">
                      <CountUpStat
                        target={heroStat.value}
                        suffix={heroStat.suffix}
                        start={isInView}
                      />
                    </div>

                    {/* The Primary Label */}
                    <div className="text-teal-100 font-semibold text-sm sm:text-base lg:text-lg mt-2 tracking-wide leading-snug">
                      {heroStat.label}
                    </div>

                    {/* Hero Subtitle: visible only when big & centered */}
                    <motion.p
                      style={{
                        opacity: heroDecorOpacity,
                        y: heroDecorY,
                      }}
                      className="text-teal-200/90 text-xs sm:text-sm mt-3 max-w-[260px] sm:max-w-sm text-center leading-relaxed font-normal"
                    >
                      NABH Accredited Super Multispeciality Hospital serving
                      Punjab with world-class medical innovation since 2002.
                    </motion.p>
                  </motion.div>
                </div>

                {/* ── Slots 2, 3, 4: Smoothly appear alongside 22+ ── */}
                {otherStats.map((stat, idx) => {
                  const Icon = STAT_ICONS[idx + 1] || Award;
                  const motionStyle = otherMotions[idx] || otherMotions[0];

                  return (
                    <motion.div
                      key={stat.id}
                      style={{
                        opacity: motionStyle.opacity,
                        y: motionStyle.y,
                        scale: motionStyle.scale,
                        willChange: "transform, opacity",
                      }}
                      className="relative flex flex-col items-center lg:items-start text-center lg:text-left justify-center min-h-[140px] sm:min-h-[160px] p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-subtle"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 text-teal-200">
                        <Icon className="w-5 h-5" />
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

            {/* Bottom floating scroll hint: prompts user initially, then fades away */}
            <motion.div
              style={{
                opacity: scrollHintOpacity,
                y: scrollHintY,
              }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[11px] sm:text-xs tracking-widest uppercase text-teal-200/90 font-medium">
                Scroll to explore
              </span>
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center animate-bounce">
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            {/* Subtle Progress Bar along bottom edge */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
              <motion.div
                style={{ width: progressBarWidth }}
                className="h-full bg-gradient-to-r from-teal-400 via-teal-300 to-coral-400"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
