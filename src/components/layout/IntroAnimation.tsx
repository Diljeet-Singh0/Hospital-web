"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

const CIRCLE_RADIUS = 54;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// Timings (seconds)
const T_CIRCLE_START = 0.5;
const T_CIRCLE_DURATION = 2.0;
const T_HOLD_END = 3.3;
const T_TRAVEL_DURATION = 1.4;

export default function IntroAnimation() {
  const prefersReduced = useReducedMotion();
  const { stage, setStage } = useIntro();
  const [phase, setPhase] = useState<"init" | "animating" | "travel" | "docked" | "finished">("init");

  const timerTravelRef = useRef<ReturnType<typeof setTimeout>>();
  const timerDockRef = useRef<ReturnType<typeof setTimeout>>();
  const timerHeroRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (prefersReduced) {
      setPhase("finished");
      setStage("done");
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("animating");

    // Phase 1 -> 2: Begin travel towards navbar
    timerTravelRef.current = setTimeout(() => {
      setPhase("travel");
      setStage("travel");

      // Phase 2 -> 3: Arrived at navbar (docked)
      timerDockRef.current = setTimeout(() => {
        setPhase("docked");
        setStage("docked");
        document.body.style.overflow = "";

        // Phase 3 -> 4: Signal navbar & hero elements to start slow staggered entrance
        timerHeroRef.current = setTimeout(() => {
          setStage("hero");
          setPhase("finished");
        }, 200);
      }, T_TRAVEL_DURATION * 1000);
    }, T_HOLD_END * 1000);

    return () => {
      clearTimeout(timerTravelRef.current);
      clearTimeout(timerDockRef.current);
      clearTimeout(timerHeroRef.current);
      document.body.style.overflow = "";
    };
  }, [prefersReduced, setStage]);

  if (phase === "finished" || phase === "docked") {
    return null;
  }

  const isTraveling = phase === "travel";

  return (
    <div
      className="intro-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40, // behind the traveling logo (z-50) so logo is always visible
        backgroundColor: "#FAFAF8",
        opacity: isTraveling ? 0 : 1,
        transition: `opacity ${T_TRAVEL_DURATION * 0.8}s cubic-bezier(0.22, 1, 0.36, 1)`,
        pointerEvents: isTraveling ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      {/* ─── GEOMETRIC CIRCLE ACCENT ─── */}
      <motion.div
        animate={
          isTraveling
            ? { opacity: 0, scale: 0.8 }
            : { opacity: 1, scale: 1 }
        }
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          left: "calc(50% + clamp(120px, 16vw, 190px))",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: CIRCLE_RADIUS * 2 + 4,
          height: CIRCLE_RADIUS * 2 + 4,
          pointerEvents: "none",
        }}
      >
        <svg
          width={CIRCLE_RADIUS * 2 + 4}
          height={CIRCLE_RADIUS * 2 + 4}
          viewBox={`0 0 ${CIRCLE_RADIUS * 2 + 4} ${CIRCLE_RADIUS * 2 + 4}`}
          fill="none"
          style={{ display: "block" }}
        >
          <circle
            cx={CIRCLE_RADIUS + 2}
            cy={CIRCLE_RADIUS + 2}
            r={CIRCLE_RADIUS}
            stroke="#0F6E6E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: CIRCLE_CIRCUMFERENCE,
              strokeDashoffset: CIRCLE_CIRCUMFERENCE,
              animation:
                phase !== "init"
                  ? `introCircleDraw ${T_CIRCLE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${T_CIRCLE_START}s forwards`
                  : undefined,
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
