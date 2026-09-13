"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollShrink } from "@/lib/hooks";
import { navLinks, hospitalInfo } from "@/data/hospital";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Phone,
  Calendar,
  ChevronDown,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
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
          scrolled ? "pt-3 sm:pt-3.5 px-3 sm:px-6" : "pt-0 px-0"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto transition-all duration-350 ease-out flex items-center",
            scrolled
              ? "w-full max-w-[1320px] mx-auto h-[52px] rounded-[18px] bg-white/92 backdrop-blur-md border border-gray-200/75 shadow-[0_8px_30px_rgba(15,110,110,0.06),0_1px_3px_rgba(0,0,0,0.04)] px-4 sm:px-6 lg:px-7"
              : "w-full h-[72px] rounded-none bg-white border-b border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] px-5 sm:px-8 lg:px-10"
          )}
        >
          <div className="w-full max-w-[1360px] mx-auto flex items-center justify-between">
            {/* ═══ 1. PAARVATI LOGO SECTION ═══ */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none py-1"
            >
              {/* Refined teal logo square with heart icon */}
              <div
                className={cn(
                  "bg-teal-600 flex items-center justify-center shrink-0 transition-all duration-350 ease-out shadow-xs",
                  scrolled
                    ? "w-8 h-8 rounded-lg"
                    : "w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-[10px] group-hover:bg-teal-700"
                )}
              >
                <Heart
                  className={cn(
                    "text-white fill-white transition-all duration-350 ease-out",
                    scrolled ? "w-4 h-4" : "w-[18px] h-[18px] sm:w-5 sm:h-5"
                  )}
                />
              </div>

              {/* Brand Typography: Elegant and Prominent */}
              <div className="flex flex-col leading-tight">
                <span
                  className={cn(
                    "font-display font-bold text-ink leading-none tracking-tight transition-all duration-350 ease-out group-hover:text-teal-700",
                    scrolled
                      ? "text-[16.5px] sm:text-[17.5px]"
                      : "text-[20px] sm:text-[21.5px]"
                  )}
                >
                  Paarvati
                </span>
                <span
                  className={cn(
                    "font-bold uppercase text-ink-50 transition-all duration-350 ease-out leading-none",
                    scrolled
                      ? "text-[7.5px] sm:text-[8px] tracking-[0.18em] mt-0.5"
                      : "text-[8.5px] sm:text-[9px] tracking-[0.22em] mt-1"
                  )}
                >
                  Multispeciality
                </span>
              </div>
            </Link>

            {/* ═══ 2. DESKTOP NAVIGATION (Horizontally Centered) ═══ */}
            <nav
              className={cn(
                "hidden lg:flex flex-1 items-center justify-center transition-all duration-350 ease-out",
                scrolled ? "gap-6 xl:gap-7" : "gap-7 xl:gap-8"
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
                "hidden lg:flex items-center shrink-0 transition-all duration-350 ease-out",
                scrolled ? "gap-4 xl:gap-5" : "gap-5 xl:gap-6"
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
            <div className="flex items-center gap-2 lg:hidden">
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

          <nav className="flex-1 overflow-y-auto p-5">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
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
