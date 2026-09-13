import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#E8F4F4",
          100: "#C6E3E3",
          200: "#9FD0D0",
          300: "#6FB6B6",
          400: "#489E9E",
          500: "#2D8585",
          600: "#0F6E6E",
          700: "#0C5A5A",
          800: "#0A4A4A",
          900: "#083B3B",
        },
        cream: {
          DEFAULT: "#FAFAF8",
          50: "#FDFDFC",
          100: "#F7F7F4",
          200: "#EFEFEA",
        },
        coral: {
          400: "#FF8A65",
          500: "#FF7043",
          600: "#F4511E",
        },
        ink: {
          DEFAULT: "#1A1D1F",
          50: "#6B7280",
          100: "#4B5563",
          200: "#374151",
          300: "#1F2937",
          400: "#111827",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        pixel: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "'Courier New'", "monospace"],
      },
      spacing: {
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "6.5": "52px",
        "7": "56px",
        "8": "64px",
        "9": "72px",
        "10": "80px",
        "11": "88px",
        "12": "96px",
        "16": "128px",
        "20": "160px",
      },
      borderRadius: {
        "card": "16px",
        "sm-card": "12px",
      },
      boxShadow: {
        "subtle": "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        "card": "0 4px 6px -2px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 15px -3px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.06)",
      },
      fontSize: {
        "hero": ["68px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "hero-sm": ["42px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h1": ["50px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h2": ["42px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h3": ["28px", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "h4": ["22px", { lineHeight: "1.3" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
      },
      animation: {
        'blob': 'blob 8s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
