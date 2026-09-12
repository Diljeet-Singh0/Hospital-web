import Link from "next/link";
import { hospitalInfo, navLinks } from "@/data/hospital";
import { specialities } from "@/data/specialities";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const socialIcons = [
  {
    name: "Facebook",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-100 pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <Heart className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <span className="font-display font-semibold text-white text-xl block leading-none">
                    Smt. Paarvati Devi
                  </span>
                  <span className="text-xs text-teal-300 tracking-wider uppercase font-medium">
                    Multispeciality Hospital
                  </span>
                </div>
              </Link>
              <p className="text-teal-200/80 text-sm leading-relaxed mb-5 max-w-sm">
                Spread across approx two acres, the hospital has two ICUs, pre and post recovery rooms,
                critical care beds, modular laminar operation theatres catering to multi specialties.
              </p>
              <div className="flex gap-3">
                {socialIcons.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-teal-800 hover:bg-coral-500 flex items-center justify-center transition-colors"
                    aria-label={s.name}
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-display font-semibold text-white text-lg">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200/80 hover:text-coral-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-semibold text-white text-lg">Departments</h4>
            <ul className="space-y-3">
              {specialities.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/specialities"
                    className="text-sm text-teal-200/80 hover:text-coral-400 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/specialities"
                  className="text-sm text-coral-400 hover:text-coral-300 font-medium inline-flex items-center gap-1"
                >
                  View All Departments &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-semibold text-white text-lg">Reach Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral-400 shrink-0 mt-0.5" />
                <span className="text-sm text-teal-200/80 leading-relaxed">
                  {hospitalInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-coral-400 shrink-0" />
                <a
                  href={`tel:${hospitalInfo.phone}`}
                  className="text-sm text-teal-200/80 hover:text-coral-400 font-medium"
                >
                  {hospitalInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-coral-400 shrink-0" />
                <a
                  href={`mailto:${hospitalInfo.email}`}
                  className="text-sm text-teal-200/80 hover:text-coral-400 break-all"
                >
                  {hospitalInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-coral-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-teal-100">24/7 Emergency</div>
                  <div className="text-xs text-teal-300/70 mt-0.5">
                    OPD: Mon - Sat, 9:00 AM - 7:00 PM
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-teal-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-teal-300/70">
            {hospitalInfo.accreditations.map((acc) => (
              <span
                key={acc}
                className="px-3 py-1 rounded-full bg-teal-800 border border-teal-700 text-teal-200 font-medium"
              >
                {acc}
              </span>
            ))}
          </div>
          <p className="text-xs text-teal-300/70">
            © {new Date().getFullYear()} Smt. Paarvati Devi Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
