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
            "card overflow-hidden h-full flex flex-col bg-white border border-[#EAE6DF] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] group transition-all duration-500 cursor-pointer relative hover:border-teal-800/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
            isCharging && "border-teal-700/60 shadow-[0_0_20px_rgba(15,110,110,0.12)]"
          )}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Experience Pill */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm rounded-md border border-[#EAE6DF] shadow-xs pointer-events-none">
              <span className="text-[10px] font-mono text-teal-800 font-medium">
                {doctor.experience}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-teal-800 font-medium mb-1">
                {doctor.specialty}
              </div>
              <h3 className="heading-display text-lg sm:text-xl mb-1 text-ink font-normal group-hover:text-teal-900 transition-colors leading-tight">
                {doctor.name}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1 mb-3">
                {doctor.qualification}
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#EAE6DF] text-xs text-stone-500">
              <span className="inline-flex items-center gap-1.5 truncate max-w-[130px] text-[11px]">
                <Award className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span className="truncate">{doctor.achievements[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-teal-800 font-medium text-[11px] group-hover:text-coral-500 transition-colors">
                Profile
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* 1.0s Charging Progress Bar */}
          <AnimatePresence>
            {isCharging && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-100 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <motion.div
                  className="h-full bg-teal-700"
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
