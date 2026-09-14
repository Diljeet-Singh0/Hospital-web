"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollShrink } from "@/lib/hooks";
import { navLinks, hospitalInfo } from "@/data/hospital";
import { cn } from "@/lib/utils";
import { useIntro } from "@/context/IntroContext";
import {
  Menu,
  X,
  Phone,
  Calendar,
  ChevronDown,
  Heart,
  ArrowRight,
} from "lucide-react";

const LETTERS = "PAARVATI".split("");

export default function Navbar() {
  const { stage, isNavbarReady, isHeroReady } = useIntro();
  const prefersReduced = useReducedMotion();
  const logoRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const calc = () => {
      const el = document.getElementById("navbar-brand-logo");
      if (el) {
        const rect = el.getBoundingClientRect();
        const currentCenterX = rect.left + rect.width / 2;
        const currentCenterY = rect.top + rect.height / 2;
        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight / 2;
        setOffset({
          x: targetX - currentCenterX,
          y: targetY - currentCenterY,
        });
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [prefersReduced]);

  const isIntro = !prefersReduced && stage === "intro";
  const isTraveling = !prefersReduced && stage === "travel";

  // Triggers state 2 after 60-80px of scrolling
  const scrolled = useScrollShrink(70);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [specialitiesOpen, setSpecialitiesOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-350 ease-out",
          scrolled ? "pt-2 sm:pt-3.5 px-2.5 sm:px-6" : "pt-0 px-0"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto transition-all duration-700 ease-out flex items-center",
            scrolled
              ? "w-full max-w-[1320px] mx-auto h-[48px] sm:h-[52px] rounded-xl sm:rounded-[18px] bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-[0_8px_30px_rgba(15,110,110,0.06),0_1px_3px_rgba(0,0,0,0.04)] px-3 sm:px-6 lg:px-7"
              : "w-full h-[64px] sm:h-[72px] rounded-none bg-white border-b border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] px-3.5 sm:px-8 lg:px-10",
            !isNavbarReady && "bg-transparent! border-transparent! shadow-none!"
          )}
        >
          <div className="w-full max-w-[1360px] mx-auto flex items-center justify-between">
            {/* ═══ 1. PAARVATI LOGO SECTION (Persistent, single animated logo) ═══ */}
            <motion.div
              ref={logoRef}
              initial={false}
              animate={
                isIntro && offset
                  ? {
                      x: offset.x,
                      y: offset.y,
                      scale: 2.3,
                    }
                  : {
                      x: 0,
                      y: 0,
                      scale: 1,
                    }
              }
              transition={{
                duration: isTraveling ? 1.4 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",
                userSelect: "none",
                transformOrigin: "center center",
                willChange: "transform",
                zIndex: 60,
                opacity: !prefersReduced && offset === null ? 0 : 1,
              }}
            >
              <Link
                href="/"
                id="navbar-brand-logo"
                className="flex items-center gap-2 sm:gap-3 group shrink-0 select-none py-1"
              >
                {/* Refined teal logo square with heart icon */}
                <motion.div
                  animate={
                    isIntro
                      ? { width: 0, height: 0, opacity: 0, scale: 0, marginRight: 0 }
                      : {
                          width: scrolled ? 32 : 40,
                          height: scrolled ? 32 : 40,
                          opacity: 1,
                          scale: 1,
                          marginRight: 0,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "bg-teal-600 flex items-center justify-center shrink-0 shadow-xs rounded-[9px] sm:rounded-[10px] group-hover:bg-teal-700 overflow-hidden"
                  )}
                >
                  <Heart
                    className={cn(
                      "text-white fill-white transition-all duration-350 ease-out",
                      scrolled ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-5 sm:h-5"
                    )}
                  />
                </motion.div>

                {/* Brand Typography */}
                <div className="flex flex-col leading-tight">
                  <div
                    className={cn(
                      "font-display font-bold text-ink leading-none tracking-tight transition-all duration-350 ease-out group-hover:text-teal-700 flex items-center gap-[0.02em]",
                      scrolled
                        ? "text-[15px] sm:text-[17.5px]"
                        : "text-[17px] sm:text-[21.5px]"
                    )}
                  >
                    {LETTERS.map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.75,
                          delay: prefersReduced ? 0 : 0.35 + i * 0.13,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                  <motion.span
                    initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: prefersReduced ? 0 : 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "font-bold uppercase text-ink-50 transition-all duration-350 ease-out leading-none",
                      scrolled
                        ? "text-[7px] sm:text-[8px] tracking-[0.16em] sm:tracking-[0.18em] mt-0.5"
                        : "text-[7.5px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em] mt-0.5 sm:mt-1"
                    )}
                  >
                    Multispeciality
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            {/* ═══ 2. DESKTOP NAVIGATION (Horizontally Centered) ═══ */}
            <nav
              className={cn(
                "hidden lg:flex flex-1 items-center justify-center transition-all duration-700 ease-out",
                scrolled ? "gap-6 xl:gap-7" : "gap-7 xl:gap-8",
                !isHeroReady ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return link.name === "Specialities" ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setSpecialitiesOpen(true)}
                    onMouseLeave={() => setSpecialitiesOpen(false)}
                  >
                    <button
                      className={cn(
                        "relative flex items-center gap-1.5 transition-colors duration-200 py-1.5 cursor-pointer group",
                        scrolled ? "text-[13px]" : "text-[14px]",
                        isActive
                          ? "text-teal-600 font-semibold"
                          : "text-ink-200 font-medium hover:text-teal-600"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "transition-transform duration-200 text-ink-50 group-hover:text-teal-600",
                          scrolled ? "w-3 h-3" : "w-3.5 h-3.5",
                          specialitiesOpen && "rotate-180 text-teal-600"
                        )}
                      />

                      {/* Coral underline indicator */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-[2px] bg-coral-500 rounded-full transition-all duration-200 ease-out",
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {specialitiesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-60 z-50">
                        <div className="bg-white rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-gray-100/90 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="grid grid-cols-1 text-left">
                            {[
                              "Cardiology",
                              "Neurosciences",
                              "Orthopaedics",
                              "Paediatrics",
                              "Ophthalmology",
                              "General Surgery",
                              "Obstetrics & Gynaecology",
                            ].map((s) => (
                              <Link
                                key={s}
                                href="/specialities"
                                onClick={() => setSpecialitiesOpen(false)}
                                className="px-4 py-2 text-[13px] text-ink-200 hover:bg-teal-50/70 hover:text-teal-700 transition-colors font-medium"
                              >
                                {s}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative transition-colors duration-200 py-1.5 group",
                      scrolled ? "text-[13px]" : "text-[14px]",
                      isActive
                        ? "text-teal-600 font-semibold"
                        : "text-ink-200 font-medium hover:text-teal-600"
                    )}
                  >
                    <span>{link.name}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] bg-coral-500 rounded-full transition-all duration-200 ease-out",
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ═══ 3. RIGHT ACTIONS (Refined Call + Primary CTA) ═══ */}
            <div
              className={cn(
                "hidden lg:flex items-center shrink-0 transition-all duration-800 ease-out",
                scrolled ? "gap-4 xl:gap-5" : "gap-5 xl:gap-6",
                !isHeroReady ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              {/* Call Now with refined minimal circular icon and two-line hierarchy */}
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="flex items-center gap-2.5 text-ink-200 group cursor-pointer select-none"
                aria-label={`Call ${hospitalInfo.phone}`}
              >
                <div
                  className={cn(
                    "rounded-full bg-teal-50/90 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all duration-200",
                    scrolled ? "w-6 h-6" : "w-7 h-7"
                  )}
                >
                  <Phone
                    className={cn(
                      "transition-transform duration-200 group-hover:scale-105",
                      scrolled ? "w-3 h-3" : "w-3.5 h-3.5"
                    )}
                  />
                </div>

                <div className="flex flex-col text-left leading-none">
                  <span
                    className={cn(
                      "font-bold tracking-[0.14em] text-ink-50 uppercase transition-all duration-350 ease-out",
                      scrolled ? "text-[8px] mb-0.5" : "text-[9px] mb-1"
                    )}
                  >
                    CALL NOW
                  </span>
                  <span
                    className={cn(
                      "font-bold text-ink tracking-tight group-hover:text-teal-600 transition-colors whitespace-nowrap",
                      scrolled
                        ? "text-[12px] sm:text-[12.5px]"
                        : "text-[13px] sm:text-[13.5px]"
                    )}
                  >
                    {hospitalInfo.phone}
                  </span>
                </div>
              </a>

              {/* Primary CTA: Book Appointment */}
              <Link href="/contact" className="inline-block">
                <span
                  className={cn(
                    "inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-semibold whitespace-nowrap transition-all duration-200 group shadow-xs hover:shadow-[0_6px_20px_rgba(255,112,67,0.28)] hover:-translate-y-[1.5px] active:translate-y-0 cursor-pointer",
                    scrolled
                      ? "h-[40px] px-4 rounded-[11px] text-[12.5px] sm:text-[13px]"
                      : "h-[50px] sm:h-[52px] px-5 sm:px-6 rounded-[14px] sm:rounded-[15px] text-[13.5px] sm:text-[14px]"
                  )}
                >
                  <Calendar
                    className={cn(
                      "text-white/95 shrink-0 transition-transform duration-200 group-hover:scale-105",
                      scrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                    )}
                  />
                  <span>Book Appointment</span>
                  <ArrowRight
                    className={cn(
                      "text-white/80 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0",
                      scrolled ? "w-3 h-3" : "w-3.5 h-3.5"
                    )}
                  />
                </span>
              </Link>
            </div>

            {/* ═══ 4. MOBILE ACTIONS & HAMBURGER ═══ */}
            <div
              className={cn(
                "flex items-center gap-2 lg:hidden transition-all duration-700 ease-out",
                !isHeroReady ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <Link href="/contact" className="sm:hidden">
                <span className="inline-flex items-center gap-1.5 bg-coral-500 text-white text-xs font-semibold px-3 py-1.5 h-8 rounded-lg shadow-xs">
                  <Calendar className="w-3 h-3" />
                  Book
                </span>
              </Link>
              <button
                className={cn(
                  "p-2 text-ink hover:text-teal-600 transition-colors rounded-lg flex items-center justify-center",
                  scrolled && "bg-gray-100/70"
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className={cn(scrolled ? "w-5 h-5" : "w-6 h-6")} />
                ) : (
                  <Menu className={cn(scrolled ? "w-5 h-5" : "w-6 h-6")} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE NAVIGATION DRAWER ═══ */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-[36px] h-[36px] rounded-[9px] bg-teal-600 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-ink text-[17px] tracking-tight">
                  Paarvati
                </span>
                <span className="text-[8px] text-ink-50 tracking-[0.2em] font-bold uppercase mt-0.5">
                  Multispeciality
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-ink-50 hover:text-ink rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                if (link.name === "Specialities") {
                  return (
                    <div key={link.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-ink-200 hover:bg-teal-50 hover:text-teal-700"
                          )}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setSpecialitiesOpen(!specialitiesOpen)}
                          className="p-2.5 text-ink-50 hover:text-teal-600 rounded-lg"
                          aria-label="Toggle Specialities list"
                        >
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              specialitiesOpen && "rotate-180 text-teal-600"
                            )}
                          />
                        </button>
                      </div>

                      {specialitiesOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-teal-100 ml-4 mb-2">
                          {[
                            "Cardiology",
                            "Neurosciences",
                            "Orthopaedics",
                            "Paediatrics",
                            "Ophthalmology",
                            "General Surgery",
                            "Obstetrics & Gynaecology",
                          ].map((s) => (
                            <Link
                              key={s}
                              href="/specialities"
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-xs font-medium text-ink-50 hover:text-teal-700 hover:bg-teal-50/60 rounded-md transition-colors"
                            >
                              {s}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-teal-50 text-teal-700 font-semibold"
                        : "text-ink-200 hover:bg-teal-50 hover:text-teal-700"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-5 border-t border-gray-100 space-y-3">
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="flex items-center gap-3 p-3 bg-teal-50/70 border border-teal-100/60 rounded-xl text-teal-700 font-medium"
            >
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.14em] text-teal-700/80 font-bold">
                  CALL NOW (24/7)
                </div>
                <div className="font-bold text-[13px] text-teal-900 mt-0.5">
                  {hospitalInfo.phone}
                </div>
              </div>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-coral-500 hover:bg-coral-600 text-white rounded-xl font-semibold text-sm shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
