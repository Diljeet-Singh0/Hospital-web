"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { hospitalInfo } from "@/data/hospital";
import {
  ShieldCheck,
  Award,
  Clock,
  Phone,
  Calendar,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/ScrollReveal";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { specialities } from "@/data/specialities";
import { doctors } from "@/data/doctors";
import { testimonials, stats, facilities } from "@/data/testimonials";
import TestimonialsScrollStack from "@/components/home/TestimonialsScrollStack";
import StatsScrollPin from "@/components/home/StatsScrollPin";
import DepartmentScrollShowcase from "@/components/home/DepartmentScrollShowcase";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";
import DoctorCard from "@/components/ui/DoctorCard";
import { useIntro } from "@/context/IntroContext";

export default function Home() {
  const { isHeroReady } = useIntro();
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="overflow-x-clip">
      <section className="relative py-6 sm:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-teal-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-teal-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container-lg relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-[11px] font-mono tracking-[0.2em] uppercase text-teal-800"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
                <span>NABH Accredited Super Multispeciality Hospital</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={isHeroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="heading-display text-[38px] sm:text-[58px] lg:text-[72px] mb-5 sm:mb-7 leading-[1.06] tracking-tight text-ink font-normal"
              >
                Where compassion <br className="hidden sm:inline" />
                meets <span className="italic text-teal-800 font-normal">clinical precision</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={isHeroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 1.0, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-ink-50/80 max-w-xl mb-8 sm:mb-10 leading-relaxed font-normal"
              >
                Smt. Paarvati Devi Hospital — Serving society for over two decades with world-class medical infrastructure, renowned specialists, and humane, ethical patient care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.0, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-primary gap-2 h-11 px-6 text-xs sm:text-sm font-medium tracking-wide rounded-md w-full sm:w-auto justify-center group shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      Book Appointment
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </MagneticButton>
                </Link>
                <a href={`tel:${hospitalInfo.phone}`} className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-outline gap-2 h-11 px-6 text-xs sm:text-sm font-medium tracking-wide rounded-md w-full sm:w-auto justify-center group">
                      <Phone className="w-3.5 h-3.5" />
                      {hospitalInfo.phone}
                    </span>
                  </MagneticButton>
                </a>
              </motion.div>

              {/* Editorial Institutional Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.0, delay: 1.85, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-7 border-t border-[#EAE6DF]"
              >
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-ink font-normal">22+</div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mt-0.5">Years Trust</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-ink font-normal">100+</div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mt-0.5">Beds</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-ink font-normal">5 OT</div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mt-0.5">Modular Laminar</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-teal-800 font-normal">24/7</div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mt-0.5">Emergency</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={isHeroReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }}
              transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-xl overflow-hidden border border-[#EAE6DF] bg-white">
                <ImageWithSkeleton
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop"
                  alt="Modern hospital interior with caring staff"
                  width={900}
                  height={1000}
                  priority
                  className="aspect-[4/3] sm:aspect-[4/5] w-full object-cover"
                />

                {/* Refined Understated Emergency Indicator */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3.5 border border-[#EAE6DF] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Immediate Response</div>
                      <div className="text-xs font-semibold text-ink">24/7 Critical Care & Trauma</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-teal-800 font-medium border-l border-[#EAE6DF] pl-3">
                    NABH
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Redesigned Scroll-Driven Department Showcase with 3D Particle Morphing ── */}
      <DepartmentScrollShowcase />

      <StatsScrollPin stats={stats} />

      {/* ── About Us Section (Mobile/Tablet View: Fluid, Non-Pinned) ── */}
      <section className="lg:hidden section-padding bg-cream-50/40">
        <div className="container-lg">
          <div className="flex flex-col gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-100 bg-white">
              <ImageWithSkeleton
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&auto=format&fit=crop"
                alt="Hospital reception and modern lobby"
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-card border border-gray-100 max-w-[220px]">
                <div className="grid grid-cols-2 gap-2">
                  {facilities.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-[10px] text-ink-200 font-medium leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="eyebrow">About Us</span>
              <h2 className="heading-display text-2xl sm:text-h2 mb-3">
                22 Years of{" "}
                <span className="gradient-text">Trusted Healthcare</span> Excellence
              </h2>
              <p className="text-sm sm:text-body text-ink mb-4 leading-relaxed">
                Spread across approximately two acres, Smt. Paarvati Devi Hospital has been a beacon of hope for patients across Punjab and beyond for over two decades.
              </p>
              <p className="text-xs sm:text-sm text-ink-50 mb-6 leading-relaxed">
                With 100+ beds, 5 modular laminar operation theatres, two intensive care units, and a fully computerized laboratory, we combine cutting-edge medical technology with warm, personalized care.
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-6">
                {[
                  { label: "NABH Accredited", icon: Award },
                  { label: "5 Modular OT", icon: ShieldCheck },
                  { label: "24/7 Emergency", icon: Clock },
                  { label: "100+ Beds", icon: Award },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-gray-100/80 shadow-subtle">
                    <div className="w-8 h-8 rounded-md bg-teal-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-ink-200 font-medium leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-block w-full sm:w-auto">
                <MagneticButton strength={0.15}>
                  <span className="btn-secondary gap-2 h-11 px-6 text-sm font-semibold rounded-lg group shadow-sm w-full sm:w-auto justify-center">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Us Section (Desktop View: Pinned Slow-Scroll Text Reveal) ── */}
      <section ref={aboutSectionRef} className="hidden lg:block relative" style={{ height: "180vh" }}>
        <div className="sticky top-0 min-h-screen flex items-center py-12 lg:py-16 overflow-hidden">
          <div className="container-lg">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-100 bg-white">
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&auto=format&fit=crop"
                    alt="Hospital reception and modern lobby"
                    width={900}
                    height={700}
                    className="aspect-[4/3] sm:aspect-[5/4] w-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-card border border-gray-100 max-w-[270px]">
                    <div className="grid grid-cols-2 gap-3">
                      {facilities.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs text-ink-200 font-medium leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="eyebrow">Institutional Overview</span>
                <h2 className="heading-display text-[32px] sm:text-[42px] mb-4 max-w-xl text-ink font-normal leading-[1.15]">
                  Over two decades of <span className="italic text-teal-800 font-normal">clinical dedication</span>.
                </h2>
                <ScrollWordReveal
                  text="Spread across approximately two acres, Smt. Paarvati Devi Hospital has stood as a bastion of ethical, tertiary-level medical care for patients across North India for more than twenty-two years."
                  className="text-base text-ink mb-5 leading-relaxed font-normal"
                  progress={aboutScrollProgress}
                  range={[0.1, 0.5]}
                />
                <ScrollWordReveal
                  text="Featuring 100+ inpatient beds, 5 modular laminar operation theatres, dedicated intensive care units, and advanced diagnostic laboratories — our multidisciplinary medical faculty combines state-of-the-art medical technology with patient-first compassion."
                  className="text-sm text-ink-50/80 mb-8 leading-relaxed font-normal"
                  progress={aboutScrollProgress}
                  range={[0.45, 0.85]}
                />

                {/* Editorial Stat Blocks */}
                <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-[#EAE6DF]">
                  <div className="border-r border-[#EAE6DF] pr-4">
                    <div className="font-display text-3xl sm:text-4xl text-ink font-normal">100+</div>
                    <div className="text-[11px] font-mono tracking-widest uppercase text-teal-800 mt-1 font-medium">Inpatient Beds</div>
                    <p className="text-xs text-ink-50/70 mt-1 leading-relaxed">Centrally monitored medical, surgical & cardiac intensive care units.</p>
                  </div>
                  <div className="pl-2">
                    <div className="font-display text-3xl sm:text-4xl text-ink font-normal">5</div>
                    <div className="text-[11px] font-mono tracking-widest uppercase text-teal-800 mt-1 font-medium">Modular OTs</div>
                    <p className="text-xs text-ink-50/70 mt-1 leading-relaxed">Equipped with laminar airflows for sterile surgical procedures.</p>
                  </div>
                </div>

                <Link href="/about" className="inline-block">
                  <MagneticButton strength={0.15}>
                    <span className="btn-secondary gap-2 h-11 px-6 text-xs sm:text-sm font-medium tracking-wide rounded-md group shadow-sm">
                      Institutional Heritage
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <Reveal>
              <span className="eyebrow">Our Experts</span>
              <h2 className="heading-display text-h2 mb-3">
                Meet Our{" "}
                <span className="gradient-text">Renowned Doctors</span>
              </h2>
              <p className="text-body text-ink-50 max-w-xl">
                Highly qualified specialists with decades of experience in their fields.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/doctors" className="inline-block">
                <MagneticButton strength={0.15}>
                  <span className="text-teal-600 font-semibold inline-flex items-center gap-1.5 group text-sm hover:text-teal-700">
                    View All Doctors
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {doctors.slice(0, 4).map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.1} className="h-full">
                <DoctorCard doctor={doc} href="/doctors" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsScrollStack testimonials={testimonials} />

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-lg">
          <div className="relative rounded-xl bg-teal-900 border border-teal-800/90 p-8 sm:p-12 lg:p-16 overflow-hidden">
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <div className="text-[11px] font-mono tracking-widest uppercase text-teal-300/80 mb-3">Consultation & Inpatient Care</div>
                <h2 className="heading-display text-2xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 max-w-2xl font-normal leading-[1.12]">
                  Your health deserves the highest <span className="italic font-normal text-teal-200">standard of care</span>.
                </h2>
                <p className="text-teal-100/75 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                  Book an appointment with our senior specialists or contact our emergency desk directly.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3.5" delay={0.15}>
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-primary gap-2 h-11 px-6 text-xs sm:text-sm font-medium tracking-wide rounded-md w-full sm:w-auto justify-center">
                      <Calendar className="w-3.5 h-3.5" />
                      Book Appointment
                    </span>
                  </MagneticButton>
                </Link>
                <a href={`tel:${hospitalInfo.phone}`} className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="bg-white/5 hover:bg-white/10 text-white border border-white/20 inline-flex items-center justify-center h-11 px-6 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 w-full sm:w-auto">
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      {hospitalInfo.phone}
                    </span>
                  </MagneticButton>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
