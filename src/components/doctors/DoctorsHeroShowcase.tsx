"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { doctors, type Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";
import DoctorExpandedModal from "@/components/ui/DoctorExpandedModal";

export default function DoctorsHeroShowcase() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(doctors[0]);
  const [modalDoctor, setModalDoctor] = useState<Doctor | null>(null);

  // Hover timer state for list items and featured cards
  const [hoveringDoctorId, setHoveringDoctorId] = useState<string | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHoverTimer = useCallback((doc: Doctor) => {
    setSelectedDoctor(doc);
    setHoveringDoctorId(doc.id);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      setModalDoctor(doc);
      setHoveringDoctorId(null);
      hoverTimerRef.current = null;
    }, 1000);
  }, []);

  const cancelHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveringDoctorId(null);
  }, []);

  const handleClickDoctor = useCallback((doc: Doctor) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveringDoctorId(null);
    setSelectedDoctor(doc);
    setModalDoctor(doc);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Left sidebar doctors (e.g. first 5)
  const popularDoctors = doctors.slice(0, 5);

  // Additional doctor for Card 3
  const secondaryDoctor = doctors[1] || doctors[0];

  return (
    <section className="relative bg-[#14161b] text-white py-14 sm:py-20 overflow-hidden border-b border-white/10">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lg relative z-10">
        {/* ═══ HEADER SECTION (Matching 2nd Image) ═══ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Compassionate Care,<br />
            <span className="font-pixel text-teal-300 text-2xl sm:text-4xl lg:text-5xl tracking-widest inline-block mt-2 uppercase">
              Every Step
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            SmartCare are here for your health. Connect with our premier medical specialists for personalized, world-class healthcare.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-7 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Book an appointment
          </Link>
        </div>

        {/* ═══ INTERACTIVE SHOWCASE LAYOUT (Matching 2nd Image) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* ── LEFT PANEL: Our Popular Expertise List ── */}
          <div className="lg:col-span-4 bg-[#1b1e24]/90 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-lg tracking-tight">
                  Our Popular Expertise List
                </h2>
                <span className="text-xs text-teal-400 font-mono bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
                  Verified Doctors
                </span>
              </div>

              <div className="space-y-3">
                {popularDoctors.map((doc) => {
                  const isSelected = selectedDoctor.id === doc.id;
                  const isCharging = hoveringDoctorId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      onMouseEnter={() => startHoverTimer(doc)}
                      onMouseLeave={cancelHoverTimer}
                      onClick={() => handleClickDoctor(doc)}
                      className={cn(
                        "group relative rounded-2xl p-3 flex items-center justify-between transition-all duration-200 cursor-pointer border overflow-hidden",
                        isSelected
                          ? "bg-white/10 border-white/20 shadow-md"
                          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/15"
                      )}
                    >
                      <div className="flex items-center gap-3.5 z-10">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800 shrink-0 border border-white/10">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {doc.specialty} Specialist
                          </p>
                        </div>
                      </div>

                      <div className="z-10 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 group-hover:bg-[#2563eb] group-hover:border-[#2563eb] group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>

                      {/* 1.5s Hover Progress on item */}
                      <AnimatePresence>
                        {isCharging && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.0, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                NABH Accredited Team
              </span>
              <span className="text-gray-400">
                Hover to preview
              </span>
            </div>
          </div>

          {/* ── CENTER / RIGHT GRID ── */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {/* ═══ CARD 1: Featured Selected Doctor Card ═══ */}
            <div
              onMouseEnter={() => startHoverTimer(selectedDoctor)}
              onMouseLeave={cancelHoverTimer}
              onClick={() => handleClickDoctor(selectedDoctor)}
              className="relative aspect-[3/4] sm:aspect-auto rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl bg-gray-900 flex flex-col justify-end p-5"
            >
              <Image
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-[#14161b]/30 to-transparent" />

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">
                    {selectedDoctor.specialty} Specialist
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#2563eb] group-hover:border-[#2563eb] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Charging indicator */}
              <AnimatePresence>
                {hoveringDoctorId === selectedDoctor.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.0, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ═══ CARD 2 & 3: Middle Column ═══ */}
            <div className="flex flex-col gap-5 justify-between">
              {/* Card 2: "Caring Hands, Trusted Medical Experts" */}
              <div className="bg-[#1b1e24]/90 border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                    Our Promise
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-3">
                    Caring Hands,<br />Trusted Medical Experts
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Delivering 22+ years of healthcare excellence with personalized attention for every patient.
                  </p>
                </div>

                {/* Slider dots (Image 2 style) */}
                <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-white/10">
                  <div className="w-5 h-1.5 rounded-full bg-white" />
                  <div className="w-2 h-1.5 rounded-full bg-white/30" />
                  <div className="w-2 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Card 3: Doctor Highlight Profile Card */}
              <div
                onMouseEnter={() => startHoverTimer(secondaryDoctor)}
                onMouseLeave={cancelHoverTimer}
                onClick={() => handleClickDoctor(secondaryDoctor)}
                className="bg-white rounded-3xl overflow-hidden text-gray-900 border border-gray-100 shadow-xl group cursor-pointer flex flex-col relative"
              >
                <div className="relative h-36 bg-gray-100 overflow-hidden">
                  <Image
                    src={secondaryDoctor.image}
                    alt={secondaryDoctor.name}
                    fill
                    sizes="260px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-sm font-bold text-gray-950 mb-0.5">
                      {secondaryDoctor.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      {secondaryDoctor.specialty} Specialist
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Phone className="w-3.5 h-3.5" />
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Charging Indicator */}
                <AnimatePresence>
                  {hoveringDoctorId === secondaryDoctor.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-200 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="h-full bg-[#2563eb]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.0, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ═══ CARD 4: Environment / Surgery Availability Card ═══ */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-gray-900 flex flex-col justify-end p-5 sm:col-span-2 lg:col-span-1">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop"
                alt="Hospital Environment"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-[#14161b]/60 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    24/7 Active
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-4">
                  Instantly know if someone is available
                </h3>

                <Link
                  href="/about"
                  className="w-full py-2.5 px-4 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Watch our Environment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FULL-SCREEN MODAL (Image 1 reference) ═══ */}
      {modalDoctor && (
        <DoctorExpandedModal
          doctor={modalDoctor}
          doctorsList={doctors}
          onClose={() => setModalDoctor(null)}
          onSelectDoctor={(doc) => setModalDoctor(doc)}
        />
      )}
    </section>
  );
}
