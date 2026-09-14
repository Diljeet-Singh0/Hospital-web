"use client";

import { useState } from "react";
import Reveal from "@/components/ui/ScrollReveal";
import { hospitalInfo } from "@/data/hospital";
import { specialities } from "@/data/specialities";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Heart,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [hospitalInfo.address, "Amritsar, Punjab, India"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [
      `${hospitalInfo.phone} (24/7)`,
      `${hospitalInfo.emergencyPhone} (Emergency)`,
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [hospitalInfo.email, "appointments@parvatihospital.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["OPD: Mon - Sat, 9 AM - 7 PM", "Emergency: 24 / 7"],
  },
];

export default function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    specialty: "",
    doctor: "",
    date: "",
    message: "",
    type: "appointment",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({
        name: "",
        phone: "",
        email: "",
        specialty: "",
        doctor: "",
        date: "",
        message: "",
        type: form.type,
      });
    }, 2500);
  };

  return (
    <div>
      <section className="relative py-8 sm:py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-coral-400/15 rounded-full blur-3xl" />
        </div>
        <div className="container-lg relative">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow">Get in Touch</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="heading-display text-[32px] sm:text-h1 lg:text-hero mb-4 sm:mb-6 leading-[1.12] sm:leading-[1.05]">
                Let's Take the
                <br />
                <span className="gradient-text">First Step Together.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-body-lg text-ink-50 max-w-2xl leading-relaxed">
                Whether you're booking a consultation, seeking a second opinion, or just have a
                question — we're here to help. Our team responds within 2 hours during OPD hours.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-lg">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 mb-10 sm:mb-14">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="card p-4 sm:p-6 group hover:border-teal-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center mb-3.5 sm:mb-5 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-semibold text-ink text-sm sm:text-base mb-1.5 sm:mb-2">{item.title}</h4>
                  {item.lines.map((l, j) => (
                    <p key={j} className="text-xs sm:text-sm text-ink-50 leading-relaxed">{l}</p>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <div className="card p-0 overflow-hidden h-full lg:sticky lg:top-28">
                <div className="h-56 sm:h-80 w-full bg-gray-200">
                  <iframe
                    src={hospitalInfo.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hospital Location"
                  />
                </div>
                <div className="p-4 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink text-sm sm:text-base">Hospital Location</h4>
                      <p className="text-xs text-ink-50">Smt. Paarvati Devi Hospital</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline justify-center"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="card p-0 overflow-hidden">
                <div className="flex border-b border-gray-100">
                  {[
                    { id: "appointment", label: "Book Appointment", icon: Calendar },
                    { id: "contact", label: "Contact Us", icon: MessageSquare },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        update("type", tab.id);
                        setSubmitted(false);
                      }}
                      className={`flex-1 px-3 sm:px-6 py-3.5 sm:py-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-colors ${
                        form.type === tab.id
                          ? "border-coral-500 text-coral-500 bg-coral-500/5"
                          : "border-transparent text-ink-50 hover:text-ink"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 sm:p-8">
                  {submitted ? (
                    <div className="py-10 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-teal-100 flex items-center justify-center mb-4 sm:mb-5">
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />
                      </div>
                      <h3 className="heading-display text-xl sm:text-h3 mb-2">Thank You!</h3>
                      <p className="text-sm sm:text-base text-ink-50 max-w-sm mx-auto">
                        {form.type === "appointment"
                          ? "Your appointment request has been received. Our team will confirm within 2 hours."
                          : "Your message has been sent. Our team will get back to you shortly."}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label-base">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="John Doe"
                            className="input-base"
                          />
                        </div>
                        <div>
                          <label className="label-base">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="input-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-base">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          className="input-base"
                        />
                      </div>

                      {form.type === "appointment" && (
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="label-base">Preferred Department</label>
                            <select
                              value={form.specialty}
                              onChange={(e) => update("specialty", e.target.value)}
                              className="input-base appearance-none bg-white cursor-pointer"
                            >
                              <option value="">Select Department</option>
                              {specialities.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label-base">Preferred Date</label>
                            <input
                              type="date"
                              value={form.date}
                              onChange={(e) => update("date", e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              className="input-base"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="label-base">
                          {form.type === "appointment" ? "Additional Notes" : "Your Message *"}
                        </label>
                        <textarea
                          required={form.type === "contact"}
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          rows={4}
                          placeholder={
                            form.type === "appointment"
                              ? "Tell us briefly about your concern..."
                              : "How can we help you today?"
                          }
                          className="input-base resize-none"
                        />
                      </div>

                      <div className="flex items-start gap-3 text-xs text-ink-50 leading-relaxed">
                        <Heart className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-ink-200">Important:</strong> We do NOT charge
                          any online payments for appointments. All payments are made only at
                          the hospital. Beware of fraud calls.
                        </p>
                      </div>

                      <button type="submit" className="w-full">
                        <MagneticButton>
                          <span className="btn-primary w-full justify-center gap-2">
                            <Send className="w-4 h-4" />
                            {form.type === "appointment" ? "Request Appointment" : "Send Message"}
                          </span>
                        </MagneticButton>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20 bg-white/60">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <Reveal>
              <div className="text-center md:text-left mb-2 md:mb-0">
                <span className="eyebrow">Quick Access</span>
                <h2 className="heading-display text-2xl sm:text-h2 max-w-md">
                  Everything You <span className="gradient-text">Need</span>
                </h2>
              </div>
            </Reveal>
            {[
              {
                num: "01",
                title: "24/7 Emergency",
                desc: "Ambulance, trauma care, and emergency OPD always open.",
                phone: hospitalInfo.emergencyPhone,
              },
              {
                num: "02",
                title: "OPD Registration",
                desc: "Skip queues. Walk-ins welcome between 9 AM - 7 PM.",
                phone: hospitalInfo.phone,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={(i + 1) * 0.1}>
                <div className="card p-4 sm:p-6 h-full hover:border-teal-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 font-display font-bold text-5xl sm:text-7xl text-teal-100/60 leading-none select-none pr-3">
                    {item.num}
                  </div>
                  <h4 className="font-display text-base sm:text-h4 mb-1.5 sm:mb-2 relative z-10">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-ink-50 leading-relaxed mb-3 sm:mb-4 relative z-10">{item.desc}</p>
                  <a
                    href={`tel:${item.phone}`}
                    className="text-teal-600 font-semibold text-xs sm:text-sm inline-flex items-center gap-1 hover:text-coral-500 transition-colors relative z-10"
                  >
                    {item.phone} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
