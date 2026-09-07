/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#FF9933",
          deep: "#E69500",
          light: "#FFF3E0",
          glow: "rgba(255, 153, 51, 0.2)",
        },
        navy: {
          DEFAULT: "#0F172A",
          gov: "#002D62",
          light: "#1E293B",
          muted: "#334155",
        },
        cream: {
          DEFAULT: "#FFFBEB",
          soft: "#FEF3C7",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F1F5F9",
          muted: "#F8FAFC",
        },
        border: "#E5E7EB",
        input: "#E2E8F0",
        ring: "#FF9933",
        background: "#F8FAFC",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#FF9933",
          foreground: "#0F172A",
        },
        secondary: {
          DEFAULT: "#002D62",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#475569",
        },
        accent: {
          DEFAULT: "#FFFBEB",
          foreground: "#0F172A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        success: {
          DEFAULT: "#15803D",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#D97706",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'saffron-glow': '0 4px 20px 0 rgba(255, 153, 51, 0.25)',
        'glass-card': '0 8px 30px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
