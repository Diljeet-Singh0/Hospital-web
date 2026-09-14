"use client";

import { useState } from "react";
import Reveal from "@/components/ui/ScrollReveal";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { specialities, type Speciality } from "@/data/specialities";
import {
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Calendar,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { hospitalInfo } from "@/data/hospital";
import MagneticButton from "@/components/ui/MagneticButton";

export default function SpecialitiesContent() {
  const [selected, setSelected] = useState<Speciality | null>(null);

  return (
    <div>
      <section className="relative py-8 sm:py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[320px] sm:w-[700px] h-[320px] sm:h-[700px] bg-teal-200/40 rounded-full blur-3xl -translate-x-1/2" />
        </div>
        <div className="container-lg relative">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow">Departments & Specialities</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="heading-display text-[32px] sm:text-h1 lg:text-hero mb-4 sm:mb-6 leading-[1.12] sm:leading-[1.05]">
                12+ Specialities.
                <br />
                <span className="gradient-text">One Standard of Excellence.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-body-lg text-ink-50 max-w-2xl leading-relaxed">
                From preventive health checks to complex multi-organ surgeries, our
                multidisciplinary departments work in harmony to deliver comprehensive,
                personalized care for every condition.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container-lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {specialities.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <Reveal key={spec.id} delay={i * 0.05}>
                  <button
                    onClick={() => setSelected(spec)}
                    className="card card-hover w-full text-left p-5 sm:p-7 h-full group border-transparent hover:border-teal-300"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-coral-500 uppercase tracking-widest mb-1.5 sm:mb-2">
                      Department
                    </div>
                    <h3 className="heading-display text-xl sm:text-h3 mb-2 sm:mb-3 leading-tight">{spec.name}</h3>
                    <p className="text-xs sm:text-sm text-ink-50 leading-relaxed mb-4 sm:mb-5">
                      {spec.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-600 group-hover:text-coral-500 transition-colors">
                        Explore Department
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-lg">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative">
                <ImageWithSkeleton
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&auto=format&fit=crop"
                  alt="Medical team discussing treatment"
                  width={900}
                  height={700}
                  className="rounded-card shadow-card aspect-[5/4] w-full"
                />
                <div className="absolute -bottom-3 left-3 sm:-bottom-5 sm:-left-5 bg-white rounded-card p-3.5 sm:p-5 shadow-card-hover border border-gray-50 max-w-[220px] sm:max-w-[260px]">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl sm:text-2xl text-ink">50+</div>
                      <div className="text-[11px] sm:text-xs text-ink-50">Specialists on Panel</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.15}>
              <span className="eyebrow">Multidisciplinary Care</span>
              <h2 className="heading-display text-h2 mb-5 max-w-lg">
                Where Specialists
                <br />
                <span className="gradient-text">Work as One Team</span>
              </h2>
              <p className="text-body text-ink-50 leading-relaxed mb-8">
                Complex health issues rarely involve just one system. That's why our departments
                work together in a seamless, multidisciplinary approach — Tumor Boards, ICU
                rounds, joint clinics — ensuring every patient benefits from collective wisdom,
                not just individual opinion.
              </p>

              <div className="space-y-3">
                {[
                  "Regular Tumor Board & Joint Clinic meetings",
                  "Shared EMR across all departments",
                  "Referral protocol within 24 hours",
                  "Integrated care plans with clear communication",
                  "Weekly multidisciplinary quality reviews",
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-ink-200 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-lg">
          <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-8 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] bg-coral-500 rounded-full blur-3xl" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <h2 className="heading-display text-h2 text-white mb-3 max-w-2xl">
                  Not Sure Which Department to Visit?
                </h2>
                <p className="text-teal-100/90 text-body-lg max-w-xl">
                  Our helpline team will guide you to the right specialist. Call us 24/7 or book
                  a general consultation first.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3" delay={0.15}>
                <a href={`tel:${hospitalInfo.phone}`}>
                  <MagneticButton>
                    <span className="btn-primary w-full sm:w-auto gap-2">
                      <Phone className="w-4 h-4" /> Call Now
                    </span>
                  </MagneticButton>
                </a>
                <Link href="/contact">
                  <MagneticButton>
                    <span className="bg-white/10 hover:bg-white/20 text-white border border-white/20 inline-flex items-center justify-center px-6 py-3.5 font-medium rounded-sm-card transition-all w-full sm:w-auto gap-2">
                      <Calendar className="w-4 h-4" /> Book Consultation
                    </span>
                  </MagneticButton>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl animate-in my-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white border border-gray-100 flex items-center justify-center text-ink-200 hover:text-ink transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="relative h-48 sm:h-72 overflow-hidden">
              <ImageWithSkeleton
                src={
                  {
                    cardiology: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&auto=format&fit=crop",
                    neurology: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&auto=format&fit=crop",
                    orthopedics: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop",
                    paediatrics: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&auto=format&fit=crop",
                  }[selected.id] ||
                  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&auto=format&fit=crop"
                }
                alt={selected.name}
                fill
                sizes="100vw"
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center mb-2.5 sm:mb-4">
                  <selected.icon className="w-5 h-5 sm:w-7 sm:h-7 text-teal-600" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-white/70 uppercase tracking-widest mb-1 sm:mb-2">
                  Department of
                </div>
                <h2 className="heading-display text-2xl sm:text-h2 text-white leading-tight">
                  {selected.name}
                </h2>
              </div>
            </div>

            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
              <div className="md:col-span-7">
                <h3 className="heading-display text-lg sm:text-h4 mb-3 sm:mb-4 text-ink">Overview</h3>
                <p className="text-sm sm:text-base text-ink-50 leading-relaxed mb-6 sm:mb-8">{selected.description}</p>

                <h3 className="heading-display text-lg sm:text-h4 mb-3 sm:mb-4 text-ink">Services & Treatments</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 sm:mb-8">
                  {selected.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-sm-card bg-white border border-gray-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-ink-200 font-medium leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="sticky top-6 space-y-4">
                  <div className="card p-6 border-teal-100">
                    <h4 className="heading-display text-h4 mb-4">Ready to Consult?</h4>
                    <p className="text-sm text-ink-50 mb-5 leading-relaxed">
                      Book an appointment with our {selected.name} experts today.
                    </p>
                    <div className="space-y-3">
                      <Link href="/contact" className="w-full btn-primary justify-center gap-2">
                        <Calendar className="w-4 h-4" /> Book Appointment
                      </Link>
                      <a href={`tel:${hospitalInfo.phone}`} className="w-full btn-outline justify-center gap-2">
                        <Phone className="w-4 h-4" /> {hospitalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="card p-6">
                    <h5 className="font-semibold text-ink mb-3">Department Timings</h5>
                    <div className="space-y-2 text-sm text-ink-200">
                      <div className="flex justify-between">
                        <span>Mon - Sat</span>
                        <span className="font-medium text-ink">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-ink">Emergency Only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
