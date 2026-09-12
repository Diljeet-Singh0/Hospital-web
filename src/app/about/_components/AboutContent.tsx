"use client";

import Reveal, { StaggerChildren } from "@/components/ui/ScrollReveal";
import CountUpStat from "@/components/ui/CountUpStat";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { hospitalInfo } from "@/data/hospital";
import { facilities, stats } from "@/data/testimonials";
import { doctors } from "@/data/doctors";
import {
  Heart,
  Eye,
  Target,
  Users,
  Building2,
  Stethoscope,
  CheckCircle2,
  Award,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "Every patient is treated with warmth, empathy, and respect. Healthcare is not just treatment—it's care.",
  },
  {
    icon: Eye,
    title: "Excellence in Care",
    desc: "We relentlessly pursue clinical excellence through continuous learning, innovation, and adopting global best practices.",
  },
  {
    icon: Target,
    title: "Integrity & Trust",
    desc: "Transparent communication, ethical practices, and honest medical advice form the foundation of every interaction.",
  },
  {
    icon: Users,
    title: "Patient-Centered",
    desc: "From diagnosis to recovery, every decision is made with the patient's comfort, dignity, and well-being at the center.",
  },
];

const milestones = [
  { year: "2003", title: "The Beginning", desc: "Smt. Paarvati Devi Hospital was established with a 30-bed facility and a vision to bring quality healthcare to Amritsar." },
  { year: "2010", title: "First Expansion", desc: "Expanded to 60 beds, added a state-of-the-art ICU and our first modular Operation Theatre." },
  { year: "2015", title: "NABH Accreditation", desc: "Achieved prestigious NABH accreditation, marking our commitment to highest standards of patient safety and care." },
  { year: "2019", title: "Super Multispeciality", desc: "Added Neurosciences, Cardiology Cath Lab, and upgraded to 100+ beds with 5 Modular Laminar OTs." },
  { year: "2023", title: "20 Years Strong", desc: "Celebrated 20 years of service with 50,000+ happy patients and 200+ surgeries per month." },
];

export default function AboutContent() {
  return (
    <div>
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-400/15 rounded-full blur-3xl" />
        </div>
        <div className="container-lg relative">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow">About Paarvati Hospital</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="heading-display text-hero-sm lg:text-hero mb-6 leading-[1.05]">
                22 Years of{" "}
                <span className="gradient-text">Healing</span>,
                <br />
                Hope & Humanity.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-50 max-w-2xl leading-relaxed">
                What began as a modest 30-bed facility in 2003 has grown into one of Punjab's
                most trusted Super Multispeciality Hospitals—standing on a foundation of trust,
                expertise, and 50,000+ restored smiles.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-lg">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop"
                    alt="Hospital building exterior"
                    width={500}
                    height={600}
                    className="rounded-card aspect-[4/5]"
                  />
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop"
                    alt="Modern hospital waiting area"
                    width={500}
                    height={400}
                    className="rounded-card aspect-[5/4]"
                  />
                </div>
                <div className="space-y-4 pt-10">
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop"
                    alt="Doctor with patient consultation"
                    width={500}
                    height={400}
                    className="rounded-card aspect-[5/4]"
                  />
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop"
                    alt="Modern operation theatre"
                    width={500}
                    height={600}
                    className="rounded-card aspect-[4/5]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.15}>
              <span className="eyebrow">Our Story</span>
              <h2 className="heading-display text-h2 mb-6 max-w-lg">
                A Legacy Built on{" "}
                <span className="gradient-text">Trust</span> & Excellence.
              </h2>
              <div className="space-y-5 text-ink-50 leading-relaxed">
                <p>
                  Smt. Paarvati Devi Hospital was founded with a simple yet powerful vision:
                  to make world-class healthcare accessible to the people of Amritsar and the
                  entire Majha region, without compromising on quality or compassion.
                </p>
                <p>
                  Spread across approximately two acres of prime land, the hospital today
                  boasts 100+ beds, 5 modular laminar flow operation theatres, two intensive
                  care units (ICU & HDU), a Level III Neonatal ICU, fully computerized
                  pathology & microbiology labs, and advanced radiology services.
                </p>
                <p>
                  But beyond the walls and equipment, it's our people who define us. A team
                  of 50+ renowned specialists, 100+ skilled nurses, and 200+ dedicated support
                  staff working round the clock with a single motto: every patient deserves
                  nothing less than our absolute best.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Acres Campus", value: "2", icon: Building2 },
                  { label: "Specialists", value: "50+", icon: Stethoscope },
                  { label: "Support Staff", value: "200+", icon: Users },
                  { label: "Accreditations", value: "2+", icon: Award },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-card bg-white border border-gray-100 shadow-subtle">
                    <item.icon className="w-6 h-6 text-teal-600 mb-3" />
                    <div className="font-display font-bold text-3xl text-ink mb-1">{item.value}</div>
                    <div className="text-sm text-ink-50">{item.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-lg relative">
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.id} className="text-center lg:text-left">
                <div className="font-display font-bold text-5xl lg:text-6xl text-white mb-2 leading-none">
                  <CountUpStat target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-teal-100 font-medium">{s.label}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-lg">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Our Core Values</span>
            <h2 className="heading-display text-h2 mb-4">
              The Principles That <span className="gradient-text">Guide Us</span>
            </h2>
            <p className="text-body text-ink-50">
              Every decision, every treatment, and every interaction is shaped by these values.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card p-7 h-full group hover:border-teal-200">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center mb-5 transition-all duration-300">
                    <v.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="heading-display text-h4 mb-3">{v.title}</h3>
                  <p className="text-sm text-ink-50 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-lg">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Our Journey</span>
            <h2 className="heading-display text-h2 mb-4">
              Milestones of <span className="gradient-text">Excellence</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px bg-teal-100 md:-translate-x-1/2" />
            <div className="space-y-8 sm:space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.1}>
                  <div className={`relative md:grid md:grid-cols-2 md:gap-10 pl-10 sm:pl-16 md:pl-0 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <div className="absolute left-2.5 sm:left-4.5 md:left-1/2 top-3 w-3.5 h-3.5 rounded-full bg-coral-500 md:-translate-x-1/2 ring-4 ring-cream" />
                    <div className={`${i % 2 === 1 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <div className="card p-5 sm:p-6 md:p-7 block text-left">
                        <div className="font-display font-bold text-2xl text-teal-600 mb-1">{m.year}</div>
                        <h4 className="heading-display text-h4 mb-2">{m.title}</h4>
                        <p className="text-sm text-ink-50 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-lg">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="eyebrow">Hospital Infrastructure</span>
              <h2 className="heading-display text-h2 mb-5">
                World-Class Facilities,
                <br />
                <span className="gradient-text">Patient-Centered Design</span>
              </h2>
              <p className="text-body text-ink-50 leading-relaxed mb-8">
                Every corner of our hospital has been designed with patient comfort, safety,
                and accessibility in mind. From spacious, well-ventilated rooms to advanced
                medical technology — no detail has been overlooked.
              </p>
              <div className="flex gap-3">
                {[
                  { label: "NABH", icon: Shield },
                  { label: "ISO 9001", icon: Award },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 px-4 py-2.5 rounded-card bg-teal-50 border border-teal-100">
                    <c.icon className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-700">{c.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4">
                {facilities.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 rounded-card bg-white border border-gray-100 hover:border-teal-200 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-ink-200 font-medium leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-lg">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Leadership Team</span>
            <h2 className="heading-display text-h2 mb-4">
              Meet the Faces Behind <span className="gradient-text">Our Vision</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.slice(0, 4).map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.08}>
                <Link href="/doctors" className="card card-hover overflow-hidden group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithSkeleton
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold text-teal-600 mb-1.5">{doc.specialty}</div>
                    <h4 className="heading-display text-h4 mb-1">{doc.name}</h4>
                    <p className="text-sm text-ink-50 mb-3">{doc.qualification}</p>
                    <span className="text-coral-500 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Link href="/doctors">
              <MagneticButton>
                <span className="btn-secondary">
                  Meet Our Full Team
                </span>
              </MagneticButton>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-lg">
          <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-8 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-coral-500 rounded-full blur-3xl" />
            </div>
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <Reveal className="lg:col-span-8">
                <h2 className="heading-display text-h2 text-white mb-3 max-w-2xl">
                  Ready to Experience the Paarvati Difference?
                </h2>
                <p className="text-teal-100/90 text-body-lg max-w-xl">
                  Consult with our specialists, take a hospital tour, or simply drop by.
                  We're here for you 24/7.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 lg:text-right" delay={0.1}>
                <div className="flex flex-col sm:flex-row lg:inline-flex gap-3">
                  <Link href="/contact">
                    <MagneticButton>
                      <span className="btn-primary w-full sm:w-auto">Book Appointment</span>
                    </MagneticButton>
                  </Link>
                  <a href={`tel:${hospitalInfo.phone}`} className="btn-outline border-white/30 text-white hover:bg-white hover:text-teal-700 w-full sm:w-auto justify-center">
                    Call Us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
