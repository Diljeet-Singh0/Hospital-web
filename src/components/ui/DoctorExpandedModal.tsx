"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User2,
  Stethoscope,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Mail,
} from "lucide-react";
import { doctors, type Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";

interface DoctorExpandedModalProps {
  doctor: Doctor | null;
  doctorsList?: Doctor[];
  onClose: () => void;
  onSelectDoctor?: (doctor: Doctor) => void;
}

function getDoctorSpecialtiesList(doctor: Doctor): string[] {
  const list: string[] = [doctor.specialty];
  doctor.achievements.forEach((ach) => {
    const cleaned = ach
      .replace(/^\d+\+?\s*/, "")
      .replace(/^(Gold Medal in|Fellow of|Member of)\s*/i, "")
      .trim();
    if (cleaned && !list.includes(cleaned) && cleaned.length <= 26) {
      list.push(cleaned);
    }
  });

  if (list.length < 4) {
    if (doctor.specialtyId === "cardiology") list.push("General Medicine", "Cardiology", "Interventional Care", "Pediatrics");
    else if (doctor.specialtyId === "neurology") list.push("General Medicine", "Neurosciences", "Spine Surgery", "Pediatrics");
    else if (doctor.specialtyId === "orthopedics") list.push("General Medicine", "Cardiology", "Orthopedics", "Pediatrics");
    else if (doctor.specialtyId === "paediatrics") list.push("General Medicine", "Paediatrics", "Neonatal Care", "Orthopedics");
    else if (doctor.specialtyId === "ophthalmology") list.push("General Medicine", "Ophthalmology", "Cataract Care", "Pediatrics");
    else if (doctor.specialtyId === "gynaecology") list.push("General Medicine", "Obstetrics & Gynaecology", "Maternity Care", "Pediatrics");
    else list.push("General Medicine", "Cardiology", "Orthopedics", "Pediatrics");
  }

  // Deduplicate and ensure exactly 4
  const deduped = Array.from(new Set(list));
  return deduped.slice(0, 4);
}

export default function DoctorExpandedModal({
  doctor,
  doctorsList = doctors,
  onClose,
  onSelectDoctor,
}: DoctorExpandedModalProps) {
  const [activeSpecialtyIndex, setActiveSpecialtyIndex] = useState<number>(2);

  // Lock body scroll and handle keyboard navigation (ESC, Left, Right)
  useEffect(() => {
    if (!doctor) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [doctor, doctorsList, onClose]);

  const currentIndex = useMemo(() => {
    if (!doctor) return 0;
    const idx = doctorsList.findIndex((d) => d.id === doctor.id);
    return idx >= 0 ? idx : 0;
  }, [doctor, doctorsList]);

  const handlePrev = useCallback(() => {
    if (!doctorsList || doctorsList.length <= 1) return;
    const nextIdx = (currentIndex - 1 + doctorsList.length) % doctorsList.length;
    if (onSelectDoctor) {
      onSelectDoctor(doctorsList[nextIdx]);
    }
  }, [currentIndex, doctorsList, onSelectDoctor]);

  const handleNext = useCallback(() => {
    if (!doctorsList || doctorsList.length <= 1) return;
    const nextIdx = (currentIndex + 1) % doctorsList.length;
    if (onSelectDoctor) {
      onSelectDoctor(doctorsList[nextIdx]);
    }
  }, [currentIndex, doctorsList, onSelectDoctor]);

  const specialtiesList = useMemo(() => {
    return doctor ? getDoctorSpecialtiesList(doctor) : [];
  }, [doctor]);

  if (!doctor) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto"
        role="dialog"
        aria-label={`${doctor.name} profile`}
      >
        {/* Dark Charcoal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#1c1d21]/95 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="fixed top-5 right-5 sm:top-7 sm:right-8 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* 3-Column Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full max-w-6xl mx-auto py-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* ═══ COLUMN 1: White Info Card (Left) ═══ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="lg:col-span-4 order-2 lg:order-1"
            >
              <div className="bg-white rounded-[28px] shadow-2xl text-gray-900 border border-white/20 max-h-[82vh] flex flex-col overflow-hidden">
                {/* Scrollable Body with Clean Inset Scrollbar */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-7 pb-3 pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-950 mb-1">
                    {doctor.name}
                  </h3>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    About
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {doctor.bio}
                  </p>

                  {/* Dark Experience Box */}
                  <div className="bg-[#24262c] rounded-2xl p-4 sm:p-5 text-white space-y-4 mb-2 shadow-inner">
                    <div className="text-sm font-semibold text-gray-200">
                      Experience:
                    </div>

                    {/* Row 1: Designation */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <User2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Senior Specialist
                        </div>
                        <div className="text-xs text-blue-400 font-medium">
                          {doctor.specialty}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Experience Years */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Experience
                        </div>
                        <div className="text-xs text-blue-400 font-medium">
                          {doctor.experience} in primary & clinical care
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Affiliations */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Professional Affiliations
                        </div>
                        <div className="text-xs text-blue-400 font-medium">
                          {doctor.qualification} • {doctor.achievements[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer: Send E-mail Button Always Visible */}
                <div className="px-5 sm:px-7 py-2.5 sm:py-3 bg-white border-t border-gray-100 rounded-b-[28px] shrink-0">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="w-full py-2 sm:py-2.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send E-mail
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ═══ COLUMN 2: Doctor Portrait + Navigation (Center) ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 bg-gray-900">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-5">
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">
                      {doctor.name}
                    </h4>
                    <p className="text-white/70 text-xs font-medium">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows (Image 1 Style) */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  aria-label="Previous doctor"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-[#2563eb] hover:bg-blue-600 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-blue-500/30"
                  aria-label="Next doctor"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* ═══ COLUMN 3: Heading + Specialties Checklist (Right) ═══ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="lg:col-span-4 order-3 text-white pl-0 lg:pl-2"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-[1.12] tracking-tight mb-3">
                Lifelong Health, One Step<br />
                <span className="font-pixel text-2xl sm:text-3xl lg:text-[34px] tracking-wider text-teal-300 block mt-2">
                  at a Time
                </span>
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed mb-7 max-w-sm">
                Our team of experienced professionals is committed to delivering compassionate and personalized.
              </p>

              {/* Specialties List */}
              <div className="space-y-3 max-w-sm">
                {specialtiesList.map((item, index) => {
                  const isActive = activeSpecialtyIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveSpecialtyIndex(index)}
                      className={cn(
                        "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 text-left cursor-pointer",
                        isActive
                          ? "bg-white text-gray-950 font-bold shadow-lg"
                          : "border border-white/10 text-gray-200 hover:bg-white/5 hover:border-white/20 font-medium"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          isActive
                            ? "bg-gray-950 text-white"
                            : "text-white/80"
                        )}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </button>
                  );
                })}
              </div>

              {/* Languages spoken */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
                <span>Languages:</span>
                <span className="text-white font-medium">
                  {doctor.languages.join(", ")}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
