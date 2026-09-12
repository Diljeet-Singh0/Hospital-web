"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import Reveal, { StaggerChildren } from "@/components/ui/ScrollReveal";
import CountUpStat from "@/components/ui/CountUpStat";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { specialities } from "@/data/specialities";
import { doctors } from "@/data/doctors";
import { testimonials, stats, facilities } from "@/data/testimonials";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container-lg relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-100 shadow-subtle mb-6 sm:mb-8"
              >
                <span className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-coral-500 fill-coral-500" />
                  ))}
                </span>
                <span className="text-xs sm:text-sm font-medium text-ink-200">
                  Trusted by 50,000+ Happy Patients
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="heading-display text-hero-sm sm:text-h1 lg:text-hero mb-6 leading-[1.08]"
              >
                Where{" "}
                <span className="gradient-text">Compassion</span>
                <br />
                Meets{" "}
                <span className="relative inline-block">
                  Excellence
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path
                      d="M2 9C80 3 150 3 298 9"
                      stroke="#FF7043"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-body sm:text-body-lg text-ink-50 max-w-xl mb-8 sm:mb-10 leading-relaxed"
              >
                Smt. Paarvati Devi Hospital — A NABH Accredited Super Multispeciality Hospital
                with 22+ years of excellence. State-of-the-art facilities, renowned specialists,
                and care that feels like family.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10"
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-primary gap-2 h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto justify-center group shadow-sm">
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </MagneticButton>
                </Link>
                <a href={`tel:${hospitalInfo.phone}`} className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-outline gap-2 h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto justify-center group">
                      <Phone className="w-4 h-4" />
                      {hospitalInfo.phone}
                    </span>
                  </MagneticButton>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-teal-100/60"
              >
                {hospitalInfo.accreditations.map((acc) => (
                  <div key={acc} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-ink leading-tight">{acc}</div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-ink leading-tight">200+ Surgeries</div>
                    <div className="text-[11px] text-ink-50 leading-tight">Per Month</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-100/80 bg-white">
                <ImageWithSkeleton
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop"
                  alt="Modern hospital interior with caring staff"
                  width={900}
                  height={1000}
                  priority
                  className="aspect-[4/3] sm:aspect-[4/5] w-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-3.5 shadow-card border border-gray-100 max-w-[210px]">
                  <div className="flex -space-x-2 mb-2">
                    {[
                      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-ink mb-0.5 leading-tight">
                    Top Specialists
                  </div>
                  <div className="text-[11px] text-ink-50 flex items-center gap-1">
                    <Star className="w-3 h-3 text-coral-500 fill-coral-500 shrink-0" />
                    <span>4.9/5 (10k+ reviews)</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-3.5 shadow-card border border-gray-100 max-w-[220px]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-coral-500/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-coral-500" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-50 font-semibold leading-tight">
                        24/7 Support
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-ink leading-tight">Emergency Care</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full w-[95%]" />
                  </div>
                  <div className="text-[10px] text-ink-50 mt-1.5">Immediate Response Time</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-50/50 relative">
        <div className="container-lg">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="eyebrow">Our Specialities</span>
            <h2 className="heading-display text-h2 mb-4">
              Comprehensive Care Across{" "}
              <span className="gradient-text">12+ Specialities</span>
            </h2>
            <p className="text-body text-ink-50 mb-6 leading-relaxed">
              From Cardiology to Neurosciences, Orthopaedics to Paediatrics — our
              multidisciplinary teams deliver world-class treatment under one roof.
            </p>
            <Link href="/specialities" className="inline-block">
              <MagneticButton strength={0.15}>
                <span className="text-teal-600 font-semibold inline-flex items-center gap-1.5 group text-sm hover:text-teal-700">
                  Explore All Departments
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </MagneticButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {specialities.slice(0, 6).map((spec, i) => {
              const Icon = spec.icon;
              return (
                <Reveal key={spec.id} delay={i * 0.05}>
                  <Link
                    href="/specialities"
                    className="group card card-hover p-6 flex flex-col justify-between h-full border border-gray-100/80 hover:border-coral-400/80 transition-all duration-300"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-coral-500 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105">
                        <Icon className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h4 className="heading-display text-h4 mb-2 leading-snug group-hover:text-teal-700 transition-colors">
                        {spec.name}
                      </h4>
                      <p className="text-sm text-ink-50 leading-relaxed line-clamp-3">
                        {spec.shortDescription}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-teal-600 group-hover:text-coral-500 transition-colors">
                      <span>Explore Department</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-lg relative">
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center lg:text-left">
                <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-none">
                  <CountUpStat target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-teal-100 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-lg">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <Reveal className="lg:col-span-6">
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
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.15}>
              <span className="eyebrow">About Us</span>
              <h2 className="heading-display text-h2 mb-4 max-w-xl">
                22 Years of{" "}
                <span className="gradient-text">Trusted Healthcare</span> Excellence
              </h2>
              <p className="text-body sm:text-body-lg text-ink-50 mb-5 leading-relaxed">
                Spread across approximately two acres, Smt. Paarvati Devi Hospital has been
                a beacon of hope for patients across Punjab and beyond for over two decades.
              </p>
              <p className="text-body text-ink-50 mb-6 leading-relaxed">
                With 100+ beds, 5 modular laminar operation theatres, two intensive care units,
                and a fully computerized laboratory, we combine cutting-edge medical technology
                with warm, personalized care. Our team of 50+ specialists and 200+ support staff
                work tirelessly to ensure every patient receives the best possible treatment.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-7">
                {[
                  { label: "NABH Accredited", icon: Award },
                  { label: "5 Modular OT", icon: ShieldCheck },
                  { label: "24/7 Emergency", icon: Clock },
                  { label: "100+ Beds", icon: Award },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-gray-100/80 shadow-subtle">
                    <div className="w-9 h-9 rounded-md bg-teal-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-ink-200 font-medium leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-block">
                <MagneticButton strength={0.15}>
                  <span className="btn-secondary gap-2 h-11 px-6 text-sm font-semibold rounded-lg group shadow-sm">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </Link>
            </Reveal>
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
              <Reveal key={doc.id} delay={i * 0.1}>
                <Link href="/doctors" className="card card-hover overflow-hidden group block h-full">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithSkeleton
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold text-teal-600 mb-1.5">{doc.specialty}</div>
                    <h4 className="heading-display text-h4 mb-1">{doc.name}</h4>
                    <p className="text-sm text-ink-50 mb-3 line-clamp-1">{doc.qualification}</p>
                    <div className="flex items-center gap-2 text-xs text-ink-50">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      {doc.experience} Experience
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-lg relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Patient Stories</span>
            <h2 className="heading-display text-h2 mb-4">
              What Our{" "}
              <span className="gradient-text">Patients Say</span>
            </h2>
            <p className="text-body text-ink-50">
              Real stories from real patients. Their trust has been our greatest motivation
              for over two decades.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <TestimonialsCarousel testimonials={testimonials} />
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="container-lg">
          <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] bg-coral-500 rounded-full blur-3xl" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <h2 className="heading-display text-h2 text-white mb-4 max-w-2xl">
                  Your Health Deserves the Best Care.{" "}
                  <span className="text-coral-400">Book an Appointment Today.</span>
                </h2>
                <p className="text-teal-100/90 text-body-lg max-w-xl">
                  Skip the waiting room. Book an appointment with our specialists in under 60 seconds.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3" delay={0.15}>
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="btn-primary gap-2 h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto justify-center">
                      <Calendar className="w-4 h-4" />
                      Book Now
                    </span>
                  </MagneticButton>
                </Link>
                <a href={`tel:${hospitalInfo.phone}`} className="w-full sm:w-auto">
                  <MagneticButton strength={0.15}>
                    <span className="bg-white/10 hover:bg-white/20 text-white border border-white/20 inline-flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
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
