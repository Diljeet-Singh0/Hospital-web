import type { Metadata } from "next";
import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroAnimation from "@/components/layout/IntroAnimation";
import { IntroProvider } from "@/context/IntroContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Smt. Paarvati Devi Hospital | Super Multispeciality Hospital in Amritsar",
    template: "%s | Smt. Paarvati Devi Hospital",
  },
  description:
    "Smt. Paarvati Devi Hospital - NABH Accredited Super Multispeciality Hospital in Amritsar with 22+ years of experience. 100+ beds, 5 modular OT, 24/7 emergency, ICU, NICU and more.",
  keywords: [
    "hospital in Amritsar",
    "multispeciality hospital",
    "Paarvati Hospital",
    "best hospital Punjab",
    "cardiology hospital",
    "orthopaedic hospital",
    "maternity hospital",
    "24x7 emergency",
  ],
  authors: [{ name: "Smt. Paarvati Devi Hospital" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parvatihospital.com/",
    title: "Smt. Paarvati Devi Hospital | Super Multispeciality Hospital in Amritsar",
    description:
      "NABH Accredited Super Multispeciality Hospital in Amritsar. 22+ years, 100+ beds, 5 modular OT, 24/7 emergency care.",
    siteName: "Smt. Paarvati Devi Hospital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smt. Paarvati Devi Hospital",
    description: "Super Multispeciality Hospital in Amritsar, Punjab.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased bg-cream text-ink">
        <IntroProvider>
          <IntroAnimation />
          <div id="site-content">
            <Navbar />
            <main className="pt-16 lg:pt-[72px]">{children}</main>
            <Footer />
          </div>
        </IntroProvider>
      </body>
    </html>
  );
}
