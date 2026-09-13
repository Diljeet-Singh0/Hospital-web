"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { doctors, type Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";
import DoctorExpandedModal from "./DoctorExpandedModal";

interface DoctorCardProps {
  doctor: Doctor;
  allDoctors?: Doctor[];
  onSelect?: (doctor: Doctor) => void;
  href?: string;
  className?: string;
}

export default function DoctorCard({
  doctor,
  allDoctors = doctors,
  onSelect,
  className = "",
}: DoctorCardProps) {
  const [isCharging, setIsCharging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState<Doctor>(doctor);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const chargeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync internal doctor state if prop changes
  useEffect(() => {
    setActiveDoctor(doctor);
  }, [doctor]);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        window.innerWidth < 1024 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (chargeTimerRef.current) clearTimeout(chargeTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice || isExpanded) return;
    setIsCharging(true);
    chargeTimerRef.current = setTimeout(() => {
      setActiveDoctor(doctor);
      setIsExpanded(true);
      setIsCharging(false);
      chargeTimerRef.current = null;
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    if (chargeTimerRef.current) {
      clearTimeout(chargeTimerRef.current);
      chargeTimerRef.current = null;
    }
    setIsCharging(false);
  };

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (chargeTimerRef.current) {
        clearTimeout(chargeTimerRef.current);
        chargeTimerRef.current = null;
      }
      setIsCharging(false);
      if (onSelect) {
        onSelect(doctor);
      } else {
        setActiveDoctor(doctor);
        setIsExpanded(true);
      }
    },
    [onSelect, doctor]
  );

  return (
    <>
      <div
        className={cn("relative w-full h-full", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* BASE CARD */}
        <div
          onClick={handleCardClick}
          className={cn(
            "card card-hover overflow-hidden h-full flex flex-col bg-white border border-gray-100 rounded-2xl shadow-subtle group transition-all duration-300 cursor-pointer relative",
            isCharging && "border-teal-400/60 shadow-lg shadow-teal-300/25"
          )}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-t-2xl">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Experience Pill */}
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full border border-gray-100 shadow-xs pointer-events-none">
              <span className="text-[11px] font-semibold text-teal-700">
                {doctor.experience}
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="text-xs font-semibold text-teal-600 mb-1 tracking-wide uppercase">
                {doctor.specialty}
              </div>
              <h3 className="heading-display text-h4 mb-1 text-ink group-hover:text-teal-700 transition-colors">
                {doctor.name}
              </h3>
              <p className="text-sm text-ink-50 line-clamp-1 mb-3">
                {doctor.qualification}
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-ink-50">
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="truncate max-w-[140px]">{doctor.achievements[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-coral-500 font-medium group-hover:translate-x-0.5 transition-transform">
                View Profile
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 1.5s Charging Progress Bar */}
          <AnimatePresence>
            {isCharging && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100/80 overflow-hidden rounded-b-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-coral-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FULL-SCREEN EXPANDED MODAL (Image 1 reference) */}
      {isExpanded && (
        <DoctorExpandedModal
          doctor={activeDoctor}
          doctorsList={allDoctors}
          onClose={() => setIsExpanded(false)}
          onSelectDoctor={(d) => setActiveDoctor(d)}
        />
      )}
    </>
  );
}
