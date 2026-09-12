"use client";

import { useState, useMemo } from "react";
import Reveal from "@/components/ui/ScrollReveal";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { doctors, type Doctor } from "@/data/doctors";
import { specialities } from "@/data/specialities";
import { hospitalInfo } from "@/data/hospital";
import { cn } from "@/lib/utils";
import {
  Award,
  Languages,
  Calendar,
  Phone,
  Check,
  ChevronDown,
  ArrowRight,
  Stethoscope,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function DoctorsContent() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Doctor | null>(null);
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
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-coral-400/15 rounded-full blur-3xl" />
        </div>
        <div className="container-lg relative">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow">Our Medical Team</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="heading-display text-hero-sm lg:text-hero mb-6 leading-[1.05]">
                Meet the Doctors
                <br />
                <span className="gradient-text">Behind Every Recovery.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-50 max-w-2xl leading-relaxed">
                Gold medalists, international fellows, and pioneers of regional healthcare — our
                doctors bring together decades of experience and a shared commitment to patient
                well-being.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-lg">
          <Reveal>
            <div className="card p-4 sm:p-5 mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="relative lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-50" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-base !pl-11"
                />
              </div>

              <div className="relative" data-cursor-hover>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full lg:w-56 input-base !text-left flex items-center justify-between gap-2 bg-white cursor-pointer"
                >
                  <span className={cn(query || filter !== "all" ? "text-ink" : "text-ink-50")}>
                    {filter === "all" ? "All Specialities" : specialities.find((s) => s.id === filter)?.name}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 text-ink-50 transition-transform", open && "rotate-180")} />
                </button>
                {open && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-100 shadow-card-hover z-20 overflow-hidden max-h-72 overflow-y-auto">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 pb-16">
              {filtered.map((doc, i) => (
                <Reveal key={doc.id} delay={i * 0.05}>
                  <button
                    onClick={() => setSelected(doc)}
                    className="card card-hover overflow-hidden w-full text-left group border-transparent hover:border-teal-200"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      <ImageWithSkeleton
                        src={doc.image}
                        alt={doc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                        <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-ink font-semibold text-sm px-4 py-2 rounded-lg shadow-subtle">
                          View Profile <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full border border-gray-100">
                        <span className="text-[11px] font-semibold text-teal-600">{doc.experience}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-semibold text-coral-500 uppercase tracking-widest mb-2">
                        {doc.specialty}
                      </div>
                      <h3 className="heading-display text-h4 mb-1.5 leading-tight">{doc.name}</h3>
                      <p className="text-sm text-ink-50 leading-relaxed mb-3 line-clamp-1">{doc.qualification}</p>
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                        <Stethoscope className="w-4 h-4 text-teal-600" />
                        <span className="text-xs text-ink-50">{doc.achievements[0]}</span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card p-10 text-center mb-16">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Search className="w-7 h-7 text-ink-50" />
                </div>
                <h3 className="heading-display text-h4 mb-2">No doctors found</h3>
                <p className="text-ink-50 mb-5">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="text-teal-600 font-semibold hover:text-coral-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-lg">
          <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-8 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-coral-500 rounded-full blur-3xl" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <h2 className="heading-display text-h2 text-white mb-3 max-w-2xl">
                  Need Help Choosing the Right Doctor?
                </h2>
                <p className="text-teal-100/90 text-body-lg max-w-xl">
                  Our 24/7 helpline team will guide you to the best specialist based on your symptoms.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3" delay={0.15}>
                <a href={`tel:${hospitalInfo.phone}`}>
                  <MagneticButton>
                    <span className="btn-primary gap-2 w-full sm:w-auto justify-center">
                      <Phone className="w-4 h-4" /> Call Helpline
                    </span>
                  </MagneticButton>
                </a>
                <Link href="/contact">
                  <MagneticButton>
                    <span className="bg-white/10 hover:bg-white/20 text-white border border-white/20 inline-flex items-center justify-center px-6 py-3.5 font-medium rounded-sm-card transition-all w-full sm:w-auto gap-2">
                      <Calendar className="w-4 h-4" /> Book Online
                    </span>
                  </MagneticButton>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-gray-100 flex items-center justify-center text-ink-200 hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:grid md:grid-cols-12">
              <div className="md:col-span-5 relative h-72 md:h-auto bg-gray-100">
                <ImageWithSkeleton
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-teal-900/60 to-transparent" />
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 md:p-10 space-y-7">
                <div>
                  <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">
                    {selected.specialty}
                  </div>
                  <h2 className="heading-display text-h1 text-ink mb-2 leading-tight">{selected.name}</h2>
                  <p className="text-body text-ink-50 font-medium">{selected.qualification}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-gray-100 text-center">
                    <Award className="w-4 h-4 text-teal-600 mx-auto mb-1.5" />
                    <div className="text-xs text-ink-50">Experience</div>
                    <div className="font-semibold text-sm text-ink">{selected.experience}</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-gray-100 text-center">
                    <Languages className="w-4 h-4 text-teal-600 mx-auto mb-1.5" />
                    <div className="text-xs text-ink-50">Languages</div>
                    <div className="font-semibold text-sm text-ink">{selected.languages.length}</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-gray-100 text-center">
                    <Check className="w-4 h-4 text-coral-500 mx-auto mb-1.5" />
                    <div className="text-xs text-ink-50">Achievements</div>
                    <div className="font-semibold text-sm text-ink">{selected.achievements.length}+</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">About</h4>
                  <p className="text-sm text-ink-50 leading-relaxed">{selected.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">Key Achievements</h4>
                  <div className="space-y-2">
                    {selected.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-ink-200">
                        <Check className="w-4 h-4 text-teal-600 shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-ink mb-2">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.languages.map((l) => (
                      <span key={l} className="text-xs font-medium px-3 py-1.5 rounded-full bg-teal-50 text-teal-700">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/contact" onClick={() => setSelected(null)} className="btn-primary flex-1 justify-center gap-2">
                    <Calendar className="w-4 h-4" /> Book Appointment
                  </Link>
                  <a href={`tel:${hospitalInfo.phone}`} className="btn-outline flex-1 justify-center gap-2">
                    <Phone className="w-4 h-4" /> Call Clinic
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
