import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Tokens from Vitabits pre-launch brief
        brand: {
          // Surface (header, footer, soft bands) — NOT for text on white
          surface: "#80ED99",
          // AA-compliant green for text, icons, borders on white
          green: "#1B6B3A",
          "green-hover": "#155A30",
          // Deep green for headlines on light bands
          "green-deep": "#0E3F22",
          // Soft band top of Gradient B
          "green-tint": "#F5FBF7",
          // Primary text (near-black, warm)
          ink: "#0F1A10",
          // Secondary text
          "ink-muted": "#4A5D4A",
          // Accent orange from Vitabits logo (used only on the wordmark)
          orange: "#F39C3C",
        },
        // Semantic tokens (shadcn compatibility)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "#0E7C3A",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Scale from brief
        "kicker": ["13px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "26px" }],
        "body-lg": ["17px", { lineHeight: "28px" }],
        "h1-mobile": ["36px", { lineHeight: "42px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h1": ["56px", { lineHeight: "60px", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      spacing: {
        // Extend with brief scale increments
        "18": "4.5rem",
        "section-mobile": "64px",
        "section": "96px",
      },
      borderRadius: {
        // Brief radii: 12 (inputs), 16 (buttons/small cards), 24 (feature cards)
        input: "12px",
        btn: "16px",
        card: "24px",
        pill: "9999px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,26,16,0.04), 0 8px 24px rgba(15,26,16,0.06)",
        cta: "0 12px 32px rgba(27,107,58,0.24)",
        sticky: "0 -6px 20px rgba(15,26,16,0.08)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      backgroundImage: {
        "gradient-a":
          "linear-gradient(135deg, #80ED99 0%, #1B6B3A 100%)",
        "gradient-b":
          "linear-gradient(180deg, #F5FBF7 0%, #FFFFFF 100%)",
        "gradient-a-radial":
          "radial-gradient(ellipse at top, rgba(128,237,153,0.35) 0%, rgba(128,237,153,0) 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "float-y": "float-y 6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)",
        "accordion-up": "accordion-up 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
