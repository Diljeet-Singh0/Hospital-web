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
    <section className="section-padding bg-[#FAF8F5] border-t border-b border-[#EAE6DF] relative overflow-hidden">
      <div className="container-lg relative">
        <div className="max-w-xl mb-10 lg:mb-14">
          <span className="eyebrow">Patient Stories</span>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl mb-4 font-normal leading-[1.12]">
            What our <span className="italic text-teal-800 font-normal">patients</span> say.
          </h2>
          <p className="text-sm sm:text-base text-ink-50/80 leading-relaxed font-normal">
            Real experiences from those who entrusted their health to our specialists and care teams.
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

/* ──────────────────────── card inner content (Editorial Panel) ────────── */

function CardContent({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-[#FAF8F5] rounded-xl sm:rounded-2xl border border-[#EAE6DF] shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between overflow-hidden p-6 sm:p-9 lg:p-11">
      {/* Subtle delicate watermark quote glyph partially outside the content */}
      <Quote className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 text-teal-900/[0.035] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 justify-between">
        <div>
          {/* Refined star rating + treatment metadata */}
          <div className="flex items-center gap-1.5 mb-5 sm:mb-7">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-coral-500 fill-coral-500"
                />
              ))}
            </div>
            <span className="w-1 h-1 rounded-full bg-stone-300 ml-2 mr-1" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 font-medium">
              {t.treatment}
            </span>
          </div>

          {/* Testimonial Quote: Large, comfortable editorial serif */}
          <blockquote className="font-display text-base sm:text-xl lg:text-[23px] text-ink font-normal leading-[1.38] mb-6 sm:mb-8 tracking-tight">
            &ldquo;{t.content}&rdquo;
          </blockquote>
        </div>

        {/* Patient Author Row */}
        <div className="pt-4 sm:pt-6 border-t border-[#EAE6DF] flex items-center gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden border border-[#EAE6DF] bg-stone-100">
            <ImageWithSkeleton
              src={t.image}
              alt={t.name}
              width={48}
              height={48}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-display font-medium text-ink text-sm sm:text-base leading-tight">
              {t.name}
            </div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1 font-sans">
              <svg
                className="w-3 h-3 text-stone-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{t.location}</span>
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
  const transitions = total - 1;

  // ── Slide-in: card enters from below ──
  const entryStart = (index - 1) / transitions;
  const entryEnd = index / transitions;

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [entryStart, entryEnd],
    index === 0 ? ["0%", "0%"] : ["110%", "0%"]
  );

  // ── Scale-down: when next card slides over this one ──
  const recessionStart = index / transitions;
  const recessionEnd = (index + 1) / transitions;

  const scale = useTransform(
    scrollYProgress,
    index === total - 1 ? [0, 1] : [recessionStart, recessionEnd],
    index === total - 1 ? [1, 1] : [1, 0.96]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    index === total - 1 ? [0, 1] : [recessionStart, recessionEnd],
    index === total - 1 ? [16, 16] : [16, 18]
  );

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

/* ─────────────────── scroll progress indicator (Editorial) ────────────── */

function ScrollProgress({
  total,
  scrollYProgress,
}: {
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const transitions = total - 1;
  return (
    <div className="relative flex flex-col gap-3.5 items-center w-3.5 mt-8">
      <div className="absolute top-1.5 bottom-1.5 w-[1px] bg-[#EAE6DF]" />
      {Array.from({ length: total }).map((_, i) => {
        const activeStart = i === 0 ? 0 : (i - 0.5) / transitions;
        const activeEnd = i === total - 1 ? 1 : (i + 0.5) / transitions;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotScale = useTransform(scrollYProgress, (v) =>
          v >= activeStart && v <= activeEnd ? 1.35 : 0.75
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotOpacity = useTransform(scrollYProgress, (v) =>
          v >= activeStart && v <= activeEnd ? 1 : 0.3
        );

        return (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-teal-800 z-10"
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
          className="relative bg-[#FAF8F5] border-t border-b border-[#EAE6DF]"
          style={{ height: `${total * 100}vh` }}
        >
          {/* Sticky viewport — stays pinned while user scrolls through cards */}
          <div className="sticky top-0 h-screen flex items-center overflow-clip">
            {/* Extremely subtle ambient teal tint */}
            <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container-lg relative z-10 w-full py-8 px-4 sm:px-8 lg:px-12">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* ── Left column: heading (desktop) ── */}
                <div className="lg:col-span-5 hidden lg:block lg:pl-6 xl:pl-8">
                  <span className="eyebrow">Patient Stories</span>
                  <h2 className="heading-display text-3xl sm:text-4xl lg:text-[46px] mb-4 font-normal leading-[1.12]">
                    What our <span className="italic text-teal-800 font-normal">patients</span> say.
                  </h2>
                  <p className="text-sm sm:text-base text-ink-50/80 leading-relaxed max-w-sm font-normal">
                    Real experiences from those who entrusted their health to our clinical teams and specialists.
                  </p>
                  <ScrollProgress
                    total={total}
                    scrollYProgress={scrollYProgress}
                  />
                </div>

                {/* ── Mobile heading ── */}
                <div className="lg:hidden text-center mb-4">
                  <span className="eyebrow">Patient Stories</span>
                  <h2 className="heading-display text-2xl sm:text-3xl mb-2 font-normal">
                    What our <span className="italic text-teal-800 font-normal">patients</span> say.
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-50/80 leading-relaxed max-w-md mx-auto">
                    Real experiences from our patient community.
                  </p>
                </div>

                {/* ── Right column: editorial card stack ── */}
                <div className="lg:col-span-7">
                  <div className="relative w-full mx-auto overflow-hidden rounded-xl sm:rounded-2xl h-[360px] sm:h-[420px] lg:h-[460px]">
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
                    <div className="flex items-center gap-2">
                      {Array.from({ length: total }).map((_, i) => {
                        const transitions = total - 1;
                        const activeStart =
                          i === 0 ? 0 : (i - 0.5) / transitions;
                        const activeEnd =
                          i === total - 1 ? 1 : (i + 0.5) / transitions;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const dotWidth = useTransform(scrollYProgress, (v) =>
                          v >= activeStart && v <= activeEnd ? 20 : 6
                        );
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const dotOpacity = useTransform(scrollYProgress, (v) =>
                          v >= activeStart && v <= activeEnd ? 1 : 0.35
                        );

                        return (
                          <motion.div
                            key={i}
                            className="h-1.5 rounded-full bg-teal-800"
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
