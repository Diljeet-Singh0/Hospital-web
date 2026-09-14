"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const cardWidth = 100; // percentage-based
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  useEffect(() => {
    const startAuto = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        next();
        startAuto();
      }, 6000);
    };
    if (!isDragging) startAuto();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isDragging, current]);

  const xInput = [-(current + 1) * 100, -current * 100, -(current - 1) * 100];
  const xOutput = [-(current + 1) * 100, -current * 100, -(current - 1) * 100];
  const animatedX = useTransform(x, xInput, xOutput);

  useEffect(() => {
    const controls = animate(x, -current * 100, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
    return controls.stop;
  }, [current, x]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false);
    const threshold = 100;
    const swipe = info.offset.x + info.velocity.x * 0.5;

    if (swipe < -threshold) {
      setCurrent((prev) => Math.min(prev + 1, testimonials.length - 1));
    } else if (swipe > threshold) {
      setCurrent((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="relative">
      <div ref={constraintsRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ x: animatedX, willChange: "transform" }}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="shrink-0 w-full md:w-1/2 lg:w-1/3 p-3"
            >
              <div className="bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-coral-500 fill-coral-500" />
                      ))}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-stone-300 ml-2 mr-1" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 font-medium">
                      {t.treatment}
                    </span>
                  </div>
                  <blockquote className="font-display text-base sm:text-lg text-ink font-normal leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-[#EAE6DF] flex items-center gap-3.5">
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden border border-[#EAE6DF] bg-stone-100">
                    <ImageWithSkeleton
                      src={t.image}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display font-medium text-ink text-sm sm:text-base leading-tight">{t.name}</div>
                    <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-stone-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-ink-200 hover:border-teal-500 hover:text-teal-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i
                  ? "w-8 bg-coral-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((prev) => Math.min(prev + 1, testimonials.length - 1))}
          disabled={current === testimonials.length - 1}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-ink-200 hover:border-teal-500 hover:text-teal-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
