"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, Users, Sparkles } from "lucide-react";
import { specialities } from "@/data/specialities";
import { doctors } from "@/data/doctors";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  NUM_PARTICLES,
  Point3D,
  DEPARTMENT_SHAPE_MAP,
  generateParticleMetas,
  ParticleMeta,
} from "./departmentParticleShapes";

// Smooth cubic easing for scroll transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Dedicated Canvas component with its own ResizeObserver and animation loop
function DepartmentParticleCanvas({
  progressRef,
  departmentShapes,
  particleMetas,
  reducedMotion,
  activeDepartmentName,
}: {
  progressRef: React.MutableRefObject<number>;
  departmentShapes: Point3D[][];
  particleMetas: ParticleMeta[];
  reducedMotion: boolean;
  activeDepartmentName: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isRunning = true;
    let startTime = performance.now();
    let currentDpr = 1;

    // Use ResizeObserver to ensure canvas size is always accurate
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      currentDpr = dpr;

      // Only resize if dimensions actually changed
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (targetW > 0 && targetH > 0 && (canvas.width !== targetW || canvas.height !== targetH)) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };

    resizeCanvas();
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(canvas);

    // Pre-allocate coordinate buffer to avoid garbage collection
    const renderCoords = new Float32Array(NUM_PARTICLES * 3); // x, y, radius

    const render = (now: number) => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width;
      const cssH = rect.height;

      if (cssW <= 0 || cssH <= 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const dpr = currentDpr;
      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Reset transform and clear entire canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Scale context for DPR
      ctx.scale(dpr, dpr);

      const elapsed = now - startTime;
      const centerX = cssW * 0.5;
      const centerY = cssH * 0.5;
      const baseScale = Math.min(cssW, cssH) * 0.44;

      const total = specialities.length;
      const p = Math.max(0, Math.min(1, progressRef.current));
      const floatIndex = p * (total - 1);
      const fromIdx = Math.min(total - 1, Math.floor(floatIndex));
      const toIdx = Math.min(total - 1, fromIdx + 1);
      const rawFraction = floatIndex - fromIdx;
      const t = reducedMotion ? (rawFraction > 0.5 ? 1 : 0) : easeInOutCubic(rawFraction);

      const fromShape = departmentShapes[fromIdx] || departmentShapes[0];
      const toShape = departmentShapes[toIdx] || departmentShapes[0];

      // Destabilization morph arc (peaks at t = 0.5)
      const morphArc = reducedMotion ? 0 : Math.sin(t * Math.PI);
      const isSettled = morphArc < 0.05;

      // Slow gentle 3D turntable rotation
      const turntableAngle = reducedMotion ? 0 : elapsed * 0.0003;
      const cosTurn = Math.cos(turntableAngle);
      const sinTurn = Math.sin(turntableAngle);
      const fov = 2.4;

      // Calculate particle screen coordinates
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const pFrom = fromShape[i] || [0, 0, 0];
        const pTo = toShape[i] || [0, 0, 0];
        const meta = particleMetas[i];

        // 1. Coordinate interpolation
        const baseX = pFrom[0] * (1 - t) + pTo[0] * t;
        const baseY = pFrom[1] * (1 - t) + pTo[1] * t;
        const baseZ = pFrom[2] * (1 - t) + pTo[2] * t;

        let curX = baseX;
        let curY = baseY;
        let curZ = baseZ;

        if (morphArc > 0.001) {
          // Destabilization and organic drift along individual 3D arcs
          const drift = meta.driftVector;
          const driftStrength = morphArc * 0.38;
          const wave = Math.sin(t * Math.PI * 3 + meta.phaseOffset) * 0.06 * morphArc;

          curX += (drift[0] + wave) * driftStrength;
          curY += (drift[1] + wave) * driftStrength;
          curZ += drift[2] * driftStrength;
        } else if (isSettled && !reducedMotion) {
          // Microscopic resting breath
          const breath = Math.sin(elapsed * 0.0018 + meta.phaseOffset) * 0.009;
          curX += breath;
          curY += breath * 0.6;
        }

        // 2. Turntable rotation
        const rotX = curX * cosTurn - curZ * sinTurn;
        const rotZ = curX * sinTurn + curZ * cosTurn;

        // 3. Perspective projection
        const proj = fov / Math.max(0.3, fov + rotZ);
        const screenX = centerX + rotX * baseScale * proj;
        const screenY = centerY + curY * baseScale * proj;

        // Visual radius based on depth
        const radius = Math.max(1.1, (meta.baseRadius + 0.4) * proj * (isSettled ? 1 : 1 + morphArc * 0.2));

        const baseIdx = i * 3;
        renderCoords[baseIdx] = screenX;
        renderCoords[baseIdx + 1] = screenY;
        renderCoords[baseIdx + 2] = radius;
      }

      // ── BATCH 1: Hospital Teal Particles ──
      ctx.fillStyle = "rgba(13, 148, 136, 0.92)";
      ctx.beginPath();
      for (let i = 0; i < NUM_PARTICLES; i++) {
        if (!particleMetas[i].isCoral) {
          const idx = i * 3;
          const sx = renderCoords[idx];
          const sy = renderCoords[idx + 1];
          const sr = renderCoords[idx + 2];
          ctx.moveTo(sx + sr, sy);
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // ── BATCH 2: Coral Accent Particles ──
      ctx.fillStyle = "rgba(249, 115, 22, 0.95)";
      ctx.beginPath();
      for (let i = 0; i < NUM_PARTICLES; i++) {
        if (particleMetas[i].isCoral) {
          const idx = i * 3;
          const sx = renderCoords[idx];
          const sy = renderCoords[idx + 1];
          const sr = renderCoords[idx + 2];
          ctx.moveTo(sx + sr, sy);
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [departmentShapes, particleMetas, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ touchAction: "none" }}
      aria-label={`Particle medical constellation representing ${activeDepartmentName}`}
    />
  );
}

export default function DepartmentScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // State for active department
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pre-generate particle target shapes for all departments and metadata
  const departmentShapes = useMemo(() => {
    return specialities.map((spec) => {
      const generator = DEPARTMENT_SHAPE_MAP[spec.id] || DEPARTMENT_SHAPE_MAP.cardiology;
      return generator();
    });
  }, []);

  const particleMetas = useMemo<ParticleMeta[]>(() => {
    return generateParticleMetas();
  }, []);

  // Scroll tracking across the department section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Soft spring smoothing to remove scroll wheel jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.5,
    restDelta: 0.0002,
  });

  // Keep ref of latest smooth progress for canvas animation loop
  const progressRef = useRef(0);
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      progressRef.current = clamped;

      // Update active index for UI content
      const total = specialities.length;
      const floatIndex = clamped * (total - 1);
      const roundedIndex = Math.min(total - 1, Math.max(0, Math.round(floatIndex)));
      setActiveIndex(roundedIndex);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Click on department in left list to scroll directly to it
  const handleDepartmentClick = useCallback((index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (specialities.length - 1)) * totalHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  const activeSpec = specialities[activeIndex] || specialities[0];
  const activeDoctors = useMemo(() => {
    return doctors.filter((doc) => doc.specialtyId === activeSpec.id);
  }, [activeSpec]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAF9F6] border-t border-b border-cream-200/60"
      style={{ height: `${100 + (specialities.length - 1) * 60}vh` }}
    >
      {/* ── Sticky Viewport Container ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Subtle Ambient Background Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-teal-400/8 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 left-10 w-[450px] h-[450px] bg-coral-400/6 rounded-full blur-[130px]" />
        </div>

        <div className="container-lg relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col justify-between">
          {/* Top Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-ink-50/10 pb-4 pt-2 shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
                  Our Specialities & Clinical Board
                </span>
              </div>
              <h2 className="heading-display text-2xl sm:text-3xl lg:text-4xl text-ink font-bold tracking-tight">
                The Board<span className="text-coral-500">.</span>
              </h2>
            </div>
          </div>

          {/* ── Desktop Main Content (Grid 45% / 55%) ── */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 items-center flex-1 my-4 min-h-0">
            {/* LEFT 45% (Cols 1-5): Editorial Vertically Stacked Department List */}
            <div className="col-span-5 h-[440px] relative overflow-hidden flex flex-col justify-center select-none">
              {/* Top & Bottom fade masks */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none z-10" />

              {/* Department list translates vertically to keep active item centered */}
              <div
                className="transition-transform duration-500 ease-out flex flex-col"
                style={{
                  transform: `translateY(${220 - activeIndex * 58 - 29}px)`,
                }}
              >
                {specialities.map((spec, idx) => {
                  const isActive = idx === activeIndex;
                  const distance = Math.abs(idx - activeIndex);
                  return (
                    <button
                      key={spec.id}
                      onClick={() => handleDepartmentClick(idx)}
                      className={`text-left h-[58px] flex items-center transition-all duration-300 group py-1.5 focus:outline-none ${
                        isActive
                          ? "opacity-100 translate-x-2"
                          : distance === 1
                          ? "opacity-45 hover:opacity-75"
                          : distance === 2
                          ? "opacity-25 hover:opacity-55"
                          : "opacity-15 hover:opacity-35"
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {/* Number prefix */}
                        <span
                          className={`font-mono text-xs transition-colors duration-300 w-6 shrink-0 ${
                            isActive ? "text-coral-500 font-semibold" : "text-stone-400"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {/* Active indicator bar */}
                        <div
                          className={`w-[3px] rounded-full transition-all duration-300 ${
                            isActive ? "h-6 bg-coral-500" : "h-1 bg-transparent group-hover:bg-stone-300"
                          }`}
                        />
                        <span
                          className={`font-display text-xl xl:text-2xl transition-all duration-300 truncate ${
                            isActive
                              ? "text-teal-950 font-normal tracking-tight scale-105"
                              : "text-stone-500 font-normal hover:text-ink"
                          }`}
                        >
                          {spec.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 55% (Cols 6-12): Split between details (48%) and Canvas (52%) */}
            <div className="col-span-7 grid grid-cols-12 gap-6 items-center h-full">
              {/* Department Details */}
              <div className="col-span-6 flex flex-col justify-center pr-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpec.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {/* Department Counter (03 of 12) */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-mono text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                        {String(activeIndex + 1).padStart(2, "0")} of {String(specialities.length).padStart(2, "0")}
                      </span>
                      {activeDoctors.length > 0 && (
                        <span className="text-xs text-teal-700 font-medium">
                          {activeDoctors.length} {activeDoctors.length === 1 ? "doctor" : "doctors"}
                        </span>
                      )}
                    </div>

                    {/* Headline Tagline */}
                    <h3 className="heading-display text-2xl xl:text-[28px] text-ink font-normal leading-[1.25] mb-3">
                      {activeSpec.shortDescription}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-ink-50/80 leading-relaxed mb-4 line-clamp-3">
                      {activeSpec.description}
                    </p>

                    {/* Key Department Features */}
                    <div className="space-y-1.5 mb-5 border-t border-[#EAE6DF] pt-3">
                      {activeSpec.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-ink-200/80">
                          <span className="w-1 h-1 rounded-full bg-teal-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href={`/specialities#${activeSpec.id}`} className="inline-block pt-1">
                      <MagneticButton strength={0.15}>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-coral-500 transition-colors group">
                          Open {activeSpec.name}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Canvas 3D Particle Visualization (Far Right) */}
              <div className="col-span-6 flex items-center justify-center relative">
                <div className="relative w-[360px] h-[360px] xl:w-[440px] xl:h-[440px] flex items-center justify-center">
                  <DepartmentParticleCanvas
                    progressRef={progressRef}
                    departmentShapes={departmentShapes}
                    particleMetas={particleMetas}
                    reducedMotion={reducedMotion}
                    activeDepartmentName={activeSpec.name}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile & Tablet Layout (Stacked & Touch Friendly) ── */}
          <div className="lg:hidden flex-1 flex flex-col justify-between py-2 min-h-0">
            {/* Mobile Header and Department Counter */}
            <div className="flex items-center justify-between py-1">
              <span className="font-mono text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                {String(activeIndex + 1).padStart(2, "0")} / {String(specialities.length).padStart(2, "0")}
              </span>
              <span className="text-sm font-bold text-teal-900 font-display">
                {activeSpec.name}
              </span>
            </div>

            {/* Mobile Particle Canvas */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto my-1 flex items-center justify-center">
              <DepartmentParticleCanvas
                progressRef={progressRef}
                departmentShapes={departmentShapes}
                particleMetas={particleMetas}
                reducedMotion={reducedMotion}
                activeDepartmentName={activeSpec.name}
              />
            </div>

            {/* Mobile Content & Touch Slider Tabs */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-3.5 border border-gray-100 shadow-sm">
              <h4 className="heading-display text-base sm:text-lg font-bold text-ink mb-1 line-clamp-1">
                {activeSpec.shortDescription}
              </h4>
              <p className="text-xs text-ink-50 leading-relaxed line-clamp-2 mb-3">
                {activeSpec.description}
              </p>

              {/* Mobile Department Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {specialities.map((spec, idx) => (
                  <button
                    key={spec.id}
                    onClick={() => handleDepartmentClick(idx)}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      idx === activeIndex
                        ? "bg-teal-700 text-white shadow-sm"
                        : "bg-cream-100 text-ink-50 hover:bg-cream-200"
                    }`}
                  >
                    {spec.name}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/specialities#${activeSpec.id}`}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
                >
                  Explore {activeSpec.name}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/specialities"
                  className="text-xs text-ink-50 hover:text-ink font-medium"
                >
                  All 12 Specialities
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar & Navigation Helper */}
          <div className="flex items-center justify-between border-t border-ink-50/10 pt-3 pb-1 shrink-0 text-xs text-ink-50">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-medium">Scroll to explore</span>
              <div className="w-24 sm:w-40 h-1 rounded-full bg-cream-200 overflow-hidden">
                <div
                  className="h-full bg-teal-600 transition-all duration-150 rounded-full"
                  style={{
                    width: `${((activeIndex + 1) / specialities.length) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-[11px] font-semibold text-teal-800">
                {Math.round(((activeIndex + 1) / specialities.length) * 100)}%
              </span>
            </div>

            <Link
              href="/specialities"
              className="inline-flex items-center gap-1 text-teal-700 font-semibold hover:text-teal-800 text-xs"
            >
              <span>View Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
