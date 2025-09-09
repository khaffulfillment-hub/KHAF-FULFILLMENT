// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ enable class-based dark mode switching
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // covers React/TS files
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables for theme-aware colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Custom color for buttons
        customButton: "#79F531",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Optional brand / accent
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      },
    },
  },
  plugins: [],
};
