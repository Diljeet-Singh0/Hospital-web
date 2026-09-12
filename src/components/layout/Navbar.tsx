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
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const scrolled = useScrollShrink();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100",
          scrolled ? "shadow-sm py-2" : "shadow-subtle py-2.5 sm:py-3"
        )}
      >
        <div className="container-lg">
          <div className="flex items-center justify-between h-11 sm:h-12">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-subtle group-hover:shadow-card transition-shadow shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-ink text-base sm:text-lg leading-none tracking-tight">
                  Paarvati
                </span>
                <span className="text-[10px] text-ink-50 tracking-wider font-semibold uppercase mt-0.5">
                  Multispeciality
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return link.name === "Specialities" ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                        isActive
                          ? "text-teal-600 font-semibold"
                          : "text-ink-200 hover:text-teal-600"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 pt-1.5 w-60 z-50">
                        <div className="bg-white rounded-xl shadow-card-hover border border-gray-100 py-2 overflow-hidden">
                          <div className="grid grid-cols-1">
                            {[
                              "Cardiology",
                              "Neurosciences",
                              "Orthopaedics",
                              "Paediatrics",
                              "Ophthalmology",
                              "Urology",
                            ].map((s) => (
                              <Link
                                key={s}
                                href="/specialities"
                                className="px-4 py-2 text-sm text-ink-200 hover:bg-teal-50 hover:text-teal-700 transition-colors"
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
                      "px-3 py-1.5 text-sm font-medium transition-colors relative group rounded-md",
                      isActive
                        ? "text-teal-600 font-semibold"
                        : "text-ink-200 hover:text-teal-600"
                    )}
                  >
                    {link.name}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-coral-500 transition-all duration-300 rounded-full",
                        isActive ? "w-6" : "w-0 group-hover:w-6"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="flex items-center gap-2.5 text-ink-200 hover:text-teal-600 transition-colors whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wider text-ink-50 font-semibold">
                    Call Now
                  </span>
                  <span className="text-sm font-bold text-ink whitespace-nowrap">
                    {hospitalInfo.phone}
                  </span>
                </div>
              </a>

              <Link href="/contact">
                <MagneticButton strength={0.15}>
                  <span className="btn-primary gap-1.5 h-10 px-4 py-2 text-sm font-semibold whitespace-nowrap shadow-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    Book Appointment
                  </span>
                </MagneticButton>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-ink hover:text-teal-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
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
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-ink text-base">
                  Paarvati
                </span>
                <span className="text-[10px] text-ink-50 tracking-wider font-semibold uppercase">
                  Multispeciality
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-ink-50 hover:text-ink"
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
              className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg text-teal-700"
            >
              <Phone className="w-5 h-5" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-teal-600/70 font-semibold">
                  Emergency 24/7
                </div>
                <div className="font-semibold text-sm">{hospitalInfo.phone}</div>
              </div>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full btn-primary text-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

