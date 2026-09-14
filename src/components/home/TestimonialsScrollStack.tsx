"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  testimonials: Testimonial[];
};

/* ───────────────── reduced-motion: simple vertical list ───────────────── */

function StaticFallback({ testimonials }: Props) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-lg relative">
        <div className="max-w-xl mb-10 lg:mb-12">
          <span className="eyebrow">Patient Stories</span>
          <h2 className="heading-display text-h2 mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-body text-ink-50 leading-relaxed">
            Real stories from real patients. Their trust has been our greatest
            motivation for over two decades.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <CardContent key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── card inner content ───────────────────────────── */

function CardContent({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-white rounded-card border border-gray-100/80 shadow-card h-full flex flex-col overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-teal-400 to-coral-400" />

      <div className="p-5 sm:p-7 md:p-9 flex flex-col flex-1 justify-between">
        {/* Watermark quote */}
        <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 text-teal-50/60 pointer-events-none" />

        {/* Stars + treatment badge */}
        <div className="flex items-center justify-between mb-3 sm:mb-5 relative z-10">
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-coral-500 fill-coral-500"
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase text-teal-700 bg-teal-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
            {t.treatment}
          </span>
        </div>

        {/* Review body */}
        <p className="text-ink-200 text-xs sm:text-sm md:text-base lg:text-body-lg leading-relaxed flex-1 mb-4 sm:mb-6 relative z-10 line-clamp-5 sm:line-clamp-none">
          &ldquo;{t.content}&rdquo;
        </p>

        {/* Reviewer */}
        <div className="pt-3 sm:pt-5 border-t border-gray-100/80 flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="w-10 h-10 sm:w-[52px] sm:h-[52px] shrink-0 rounded-full overflow-hidden ring-2 ring-coral-400/30 shadow-subtle">
            <ImageWithSkeleton
              src={t.image}
              alt={t.name}
              width={52}
              height={52}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-display font-semibold text-ink text-sm sm:text-[17px] leading-snug">
              {t.name}
            </div>
            <div className="text-xs sm:text-sm text-ink-50 mt-0.5 flex items-center gap-1.5">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── stacking card: slides UP over the previous one ────────── */

function StackCard({
  testimonial,
  index,
  total,
  scrollYProgress,
}: {
  testimonial: Testimonial;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Card 0 is the base — always visible, no slide-in.
  // Cards 1..N-1 each get a scroll slice to slide up from below.
  //
  // Transitions = total - 1
  // Card i slides in during [(i-1)/transitions, i/transitions]
  //
  // While card i+1 is sliding in, card i slightly scales down
  // to create a depth/recession effect.

  const transitions = total - 1;

  // ── Slide-in: card enters from below ──
  // y goes from 110% (below viewport) → 0% (in place)
  const entryStart = (index - 1) / transitions;
  const entryEnd = index / transitions;

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]                    // base card: stays put
      : [entryStart, entryEnd],
    index === 0
      ? ["0%", "0%"]
      : ["110%", "0%"]
  );

  // ── Scale-down: when the NEXT card is sliding over this one ──
  // This card shrinks slightly to feel like it's being pushed back.
  const recessionStart = index / transitions;
  const recessionEnd = (index + 1) / transitions;

  const scale = useTransform(
    scrollYProgress,
    index === total - 1
      ? [0, 1]                           // last card: no recession
      : [recessionStart, recessionEnd],
    index === total - 1
      ? [1, 1]
      : [1, 0.95]
  );

  // ── Subtle border-radius increase on recession for depth feel ──
  const borderRadius = useTransform(
    scrollYProgress,
    index === total - 1
      ? [0, 1]
      : [recessionStart, recessionEnd],
    index === total - 1
      ? [16, 16]
      : [16, 20]
  );

  // z-index: later cards stack on top
  const zIndex = index + 1;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        y,
        scale,
        borderRadius,
        zIndex,
        willChange: "transform",
      }}
    >
      <CardContent testimonial={testimonial} />
    </motion.div>
  );
}

/* ─────────────────── scroll progress indicator ────────────────────────── */

function ScrollProgress({
  total,
  scrollYProgress,
}: {
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const transitions = total - 1;
  return (
    <div className="flex flex-col gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => {
        const activeStart = i === 0 ? 0 : (i - 0.5) / transitions;
        const activeEnd = i === total - 1 ? 1 : (i + 0.5) / transitions;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotScale = useTransform(scrollYProgress, (v) =>
          v >= activeStart && v <= activeEnd ? 1 : 0.6
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotOpacity = useTransform(scrollYProgress, (v) =>
          v >= activeStart && v <= activeEnd ? 1 : 0.3
        );

        return (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-teal-600"
            style={{ scale: dotScale, opacity: dotOpacity }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════ main export ═══════════════════════════════ */

export default function TestimonialsScrollStack({ testimonials }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const total = testimonials.length;

  // ponytail: height = total * 100vh gives each card ~1 screen of scroll room.
  // Could tune per-card if needed, but uniform works well here.

  return (
    <>
      {/* Reduced-motion fallback */}
      <div className="motion-safe:hidden">
        <StaticFallback testimonials={testimonials} />
      </div>

      {/* Scroll-driven stack */}
      <div className="motion-reduce:hidden">
        <section
          ref={sectionRef}
          className="relative"
          style={{ height: `${total * 100}vh` }}
        >
          {/* Sticky viewport — stays pinned while user scrolls through cards */}
          <div className="sticky top-0 h-screen flex items-center overflow-clip">
            {/* background blobs */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-50/60 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <div className="container-lg relative z-10 w-full">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* ── Left column: heading (desktop) ── */}
                <div className="lg:col-span-4 hidden lg:block">
                  <span className="eyebrow">Patient Stories</span>
                  <h2 className="heading-display text-h2 mb-4">
                    What Our{" "}
                    <span className="gradient-text">Patients Say</span>
                  </h2>
                  <p className="text-body text-ink-50 leading-relaxed mb-8">
                    Real stories from real patients. Their trust has been our
                    greatest motivation for over two decades.
                  </p>
                  <ScrollProgress
                    total={total}
                    scrollYProgress={scrollYProgress}
                  />
                </div>

                {/* ── Mobile heading ── */}
                <div className="lg:hidden text-center mb-2">
                  <span className="eyebrow">Patient Stories</span>
                  <h2 className="heading-display text-h3 mb-3">
                    What Our{" "}
                    <span className="gradient-text">Patients Say</span>
                  </h2>
                </div>

                {/* ── Right column: card stack ── */}
                <div className="lg:col-span-8">
                  <div
                    className="relative w-full mx-auto overflow-hidden rounded-card h-[350px] sm:h-[430px] lg:h-[480px]"
                  >
                    {testimonials.map((t, i) => (
                      <StackCard
                        key={t.id}
                        testimonial={t}
                        index={i}
                        total={total}
                        scrollYProgress={scrollYProgress}
                      />
                    ))}
                  </div>

                  {/* Mobile progress dots (horizontal) */}
                  <div className="flex justify-center mt-6 lg:hidden">
                    <div className="flex gap-2">
                      {Array.from({ length: total }).map((_, i) => {
                        const transitions = total - 1;
                        const activeStart =
                          i === 0 ? 0 : (i - 0.5) / transitions;
                        const activeEnd =
                          i === total - 1 ? 1 : (i + 0.5) / transitions;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const dotWidth = useTransform(scrollYProgress, (v) =>
                          v >= activeStart && v <= activeEnd ? 24 : 8
                        );
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const dotOpacity = useTransform(scrollYProgress, (v) =>
                          v >= activeStart && v <= activeEnd ? 1 : 0.3
                        );

                        return (
                          <motion.div
                            key={i}
                            className="h-2 rounded-full bg-teal-600"
                            style={{ width: dotWidth, opacity: dotOpacity }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
