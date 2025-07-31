const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#583c27",
        accent: "#b19982",
        background: "#fffaf3",
        muted: "#f3ece7",
        foreground: "#1a1a1a",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        sans: ["Inter", ...fontFamily.sans],
        body: "var(--font-body)",
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0,0,0,0.06)",
      },
      userSelect: {
        none: "none",
        text: "text",
        all: "all",
        auto: "auto",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
