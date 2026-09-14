import Link from "next/link";
import { hospitalInfo } from "@/data/hospital";
import { MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white pt-[42px] pb-[22px] border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* ═══ TOP SECTION: Brand & Navigation Columns ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[36px] gap-y-[20px] pb-[22px] items-start">
          {/* Brand & Description */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-[9px] mb-[10px] group select-none">
              <div className="w-[30px] h-[30px] rounded-[8px] bg-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors">
                <Heart className="w-[15px] h-[15px] text-white fill-white" />
              </div>
              <span className="font-display font-bold text-[20px] tracking-tight text-white group-hover:text-teal-400 transition-colors">
                Paarvati
              </span>
            </Link>
            <p className="text-neutral-400 text-[13px] leading-[1.6] max-w-[310px]">
              Our team of experienced professionals is committed to delivering
              compassionate and personalized care to help you.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-5 sm:gap-x-[28px] gap-y-6 sm:gap-y-0">
            {/* Column 1: Company */}
            <div>
              <h4 className="text-white font-semibold text-[13.5px] mb-[10px]">
                Company
              </h4>
              <ul className="space-y-[6px] text-[13px]">
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Our History
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-white font-semibold text-[13.5px] mb-[10px]">
                Services
              </h4>
              <ul className="space-y-[6px] text-[13px]">
                <li>
                  <Link href="/specialities" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link href="/specialities" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Neurosciences
                  </Link>
                </li>
                <li>
                  <Link href="/specialities" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Orthopaedics
                  </Link>
                </li>
                <li>
                  <Link href="/specialities" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Paediatrics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Patient Resources */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-semibold text-[13.5px] mb-[10px]">
                Patient Resources
              </h4>
              <ul className="space-y-[6px] text-[13px]">
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Information
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors block leading-relaxed">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══ MIDDLE SECTION: Rounded Bordered Bar (Location, Contact, Stay Always) ═══ */}
        <div className="border border-white/20 rounded-[18px] sm:rounded-full px-4 sm:px-[30px] py-3.5 sm:py-[13px] my-[10px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] sm:gap-[20px] items-center">
            {/* Location */}
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-medium text-neutral-300 flex items-center gap-[6px] leading-tight">
                <MapPin className="w-[13px] h-[13px] text-white/80 shrink-0" />
                Location
              </span>
              <span className="text-[12px] text-neutral-400 leading-snug mt-[3px]">
                {hospitalInfo.address}
              </span>
            </div>

            {/* Contact */}
            <div className="flex flex-col text-left sm:pl-[14px]">
              <span className="text-[11px] font-medium text-neutral-300 flex items-center gap-[6px] leading-tight">
                <Phone className="w-[13px] h-[13px] text-white/80 shrink-0" />
                Contact
              </span>
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="text-[12px] text-neutral-400 hover:text-white transition-colors leading-snug mt-[3px]"
              >
                {hospitalInfo.phone}
              </a>
            </div>

            {/* Stay Always / Social */}
            <div className="flex flex-col sm:items-end text-left sm:text-right">
              <span className="text-[11px] font-medium text-neutral-300 leading-tight mb-[4px]">
                Stay Always
              </span>
              <div className="flex items-center gap-[12px] text-white/80">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-white hover:scale-110 transition-all"
                >
                  <svg className="w-[14px] h-[14px] fill-currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="hover:text-white hover:scale-110 transition-all"
                >
                  <svg className="w-[14px] h-[14px] fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-white hover:scale-110 transition-all"
                >
                  <svg className="w-[14px] h-[14px] fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM SECTION: Policy Links & Copyright ═══ */}
        <div className="pt-[10px] flex flex-col sm:flex-row items-center justify-between gap-[6px] text-neutral-400 text-[11.5px]">
          <div>
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>{" "}
            <Link href="/about" className="hover:text-white transition-colors ml-[10px]">
              Terms and conditions
            </Link>
          </div>
          <div className="text-neutral-400 text-[11.5px]">
            © {new Date().getFullYear()} Smt. Paarvati Devi Hospital. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
