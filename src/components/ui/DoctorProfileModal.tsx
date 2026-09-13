"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Award,
  Calendar,
  Phone,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Languages,
} from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { hospitalInfo } from "@/data/hospital";

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
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

  if (list.length < 3) {
    if (doctor.specialtyId === "cardiology") list.push("Interventional Care", "Angioplasty");
    else if (doctor.specialtyId === "neurology") list.push("Brain Surgery", "Spine Surgery");
    else if (doctor.specialtyId === "orthopedics") list.push("Joint Replacement", "Sports Medicine");
    else if (doctor.specialtyId === "paediatrics") list.push("Neonatal Care", "Developmental Care");
    else if (doctor.specialtyId === "ophthalmology") list.push("Cataract Surgery", "Refractive Care");
    else if (doctor.specialtyId === "gynaecology") list.push("High-Risk Pregnancy", "Laparoscopy");
    else if (doctor.specialtyId === "generalsurgery") list.push("Advanced Laparoscopy", "GI Surgery");
    else if (doctor.specialtyId === "oncology") list.push("Targeted Therapy", "Cancer Care");
  }

  return list.slice(0, 4);
}

export default function DoctorProfileModal({ doctor, onClose }: DoctorProfileModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!doctor) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [doctor, onClose]);

  const specialtiesList = useMemo(() => {
    return doctor ? getDoctorSpecialtiesList(doctor) : [];
  }, [doctor]);

  return (
    <AnimatePresence>
      {doctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: "#0d1117",
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.14) 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
            className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] border border-white/10 text-white overflow-hidden flex flex-col z-10 select-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body: Scrollable */}
            <div className="overflow-y-auto flex-1 md:grid md:grid-cols-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Left Column: Doctor Portrait */}
              <div className="md:col-span-5 relative h-72 md:h-auto min-h-[340px] md:min-h-[500px] flex flex-col justify-end overflow-hidden bg-gradient-to-b from-[#090d14]/80 to-[#0d1117]">
                {/* Ambient Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none hidden md:block" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-teal-200 mb-2 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-coral-400" />
                    <span>Verified Specialist — {doctor.experience} Exp.</span>
                  </div>
                  <div className="text-white/80 text-xs font-medium pl-1">
                    Smt. Paarvati Devi Hospital, Amritsar
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial & White Stacked Cards */}
              <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div>
                  {/* Doctor Full Name */}
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight mb-2">
                    {doctor.name}
                  </h2>

                  {/* Role Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c222e] text-gray-200 border border-white/10 text-xs font-semibold mb-3 shadow-xs">
                    <span>Senior Consultant — {doctor.specialty}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {doctor.bio}
                  </p>

                  {/* Card 1: Education */}
                  <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-gray-950 tracking-tight">
                        Education
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium pl-8">
                      {doctor.qualification}
                      {doctor.achievements.find(
                        (a) =>
                          a.toLowerCase().includes("fellow") ||
                          a.toLowerCase().includes("gold medal")
                      )
                        ? ` — ${doctor.achievements.find(
                            (a) =>
                              a.toLowerCase().includes("fellow") ||
                              a.toLowerCase().includes("gold medal")
                          )}`
                        : " — Advanced Fellowship & Medical Residency"}
                    </p>
                  </div>

                  {/* Card 2: Specialties */}
                  <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-gray-950 tracking-tight">
                        Specialties
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-8">
                      {specialtiesList.map((spec, idx) => (
                        <span
                          key={idx}
                          className="border border-gray-300/80 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold bg-white hover:bg-gray-50 transition-colors shadow-2xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 3: Key Achievements */}
                  <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-gray-950 tracking-tight">
                        Key Achievements
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-700 pl-8">
                      <li className="flex items-start gap-1.5">
                        <span className="text-black font-black leading-none mt-0.5">•</span>
                        <span>{doctor.experience} of dedicated clinical practice</span>
                      </li>
                      {doctor.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-black font-black leading-none mt-0.5">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages Spoken */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 pl-1 pt-1">
                    <Languages className="w-3.5 h-3.5 text-teal-400" />
                    <span>Consultation Languages:</span>
                    <span className="text-gray-200 font-medium">
                      {doctor.languages.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-gray-900 bg-white hover:bg-gray-100 rounded-xl shadow-lg transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Book Appointment</span>
                  </Link>
                  <a
                    href={`tel:${hospitalInfo.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-teal-400" />
                    <span>Call Helpline ({hospitalInfo.phone})</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

