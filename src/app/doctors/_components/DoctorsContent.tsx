"use client";

import { useState, useMemo } from "react";
import Reveal from "@/components/ui/ScrollReveal";
import { doctors, type Doctor } from "@/data/doctors";
import { specialities } from "@/data/specialities";
import { hospitalInfo } from "@/data/hospital";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Phone,
  Check,
  ChevronDown,
  Search,
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import DoctorCard from "@/components/ui/DoctorCard";
import DoctorExpandedModal from "@/components/ui/DoctorExpandedModal";

export default function DoctorsContent() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSpec = filter === "all" || d.specialtyId === filter;
      const matchQuery =
        !query ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase());
      return matchSpec && matchQuery;
    });
  }, [filter, query]);

  return (
    <div>
      {/* ═══ FULL DIRECTORY / SEARCH & FILTER SECTION ═══ */}
      {/* ═══ FULL DIRECTORY / SEARCH & FILTER SECTION ═══ */}
      <section className="py-10 sm:py-14 lg:py-20 bg-cream/70">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Reveal>
              <span className="eyebrow">Medical Directory</span>
              <h2 className="heading-display text-2xl sm:text-h2 mb-2">
                Browse All Specialists
              </h2>
              <p className="text-sm sm:text-body text-ink-50 max-w-xl">
                Explore our full department roster. Hover or click any doctor to expand their credentials.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="card p-3 sm:p-5 mb-6 sm:mb-8 flex flex-col lg:flex-row gap-3 sm:gap-4 lg:items-center lg:justify-between bg-white shadow-subtle rounded-2xl border border-gray-100">
              <div className="relative lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-50" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-base !pl-11 w-full bg-gray-50/70 focus:bg-white"
                />
              </div>

              <div className="relative" data-cursor-hover>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full lg:w-64 input-base !text-left flex items-center justify-between gap-2 bg-white cursor-pointer border border-gray-200"
                >
                  <span className={cn(query || filter !== "all" ? "text-ink" : "text-ink-50")}>
                    {filter === "all" ? "All Specialities" : specialities.find((s) => s.id === filter)?.name}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 text-ink-50 transition-transform", open && "rotate-180")} />
                </button>
                {open && (
                  <div className="absolute top-full right-0 mt-2 w-full lg:w-72 bg-white rounded-xl border border-gray-100 shadow-card-hover z-30 overflow-hidden max-h-80 overflow-y-auto">
                    <button
                      onClick={() => {
                        setFilter("all");
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-sm flex items-center justify-between hover:bg-teal-50",
                        filter === "all" && "bg-teal-50 text-teal-700 font-medium"
                      )}
                    >
                      All Specialities
                      {filter === "all" && <Check className="w-4 h-4" />}
                    </button>
                    {specialities.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setFilter(s.id);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-3 text-left text-sm flex items-center justify-between hover:bg-teal-50",
                          filter === s.id && "bg-teal-50 text-teal-700 font-medium"
                        )}
                      >
                        {s.name}
                        {filter === s.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-12 sm:pb-16">
              {filtered.map((doc, i) => (
                <Reveal key={doc.id} delay={i * 0.05} className="h-full">
                  <DoctorCard
                    doctor={doc}
                    allDoctors={doctors}
                    onSelect={(d) => setSelectedDoctor(d)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card p-8 sm:p-10 text-center mb-12 sm:mb-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 text-ink-50" />
                </div>
                <h3 className="heading-display text-lg sm:text-h4 mb-2">No doctors found</h3>
                <p className="text-sm sm:text-base text-ink-50 mb-4 sm:mb-5">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="text-teal-600 font-semibold text-sm hover:text-coral-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Helpline CTA */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="container-lg">
          <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-6 sm:p-8 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute bottom-[-20%] right-[-10%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-coral-500 rounded-full blur-3xl" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <h2 className="heading-display text-2xl sm:text-h2 text-white mb-3 max-w-2xl leading-snug sm:leading-tight">
                  Need Help Choosing the Right Doctor?
                </h2>
                <p className="text-teal-100/90 text-sm sm:text-body-lg max-w-xl">
                  Our 24/7 helpline team will guide you to the best specialist based on your symptoms.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3" delay={0.15}>
                <a href={`tel:${hospitalInfo.phone}`} className="w-full sm:w-auto">
                  <MagneticButton>
                    <span className="btn-primary gap-2 w-full sm:w-auto justify-center">
                      <Phone className="w-4 h-4" /> Call Helpline
                    </span>
                  </MagneticButton>
                </a>
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton>
                    <span className="bg-white/10 hover:bg-white/20 text-white border border-white/20 inline-flex items-center justify-center px-5 sm:px-6 py-3 font-medium rounded-lg transition-all w-full sm:w-auto gap-2 text-sm">
                      <Calendar className="w-4 h-4" /> Book Online
                    </span>
                  </MagneticButton>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FULL SCREEN EXPANDED VIEW IF SELECTED ═══ */}
      {selectedDoctor && (
        <DoctorExpandedModal
          doctor={selectedDoctor}
          doctorsList={doctors}
          onClose={() => setSelectedDoctor(null)}
          onSelectDoctor={(doc) => setSelectedDoctor(doc)}
        />
      )}
    </div>
  );
}
