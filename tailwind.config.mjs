/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        }
      },
      gridTemplateColumns: {
        'screen': 'minmax(0, 2fr) minmax(0, 1fr)',
      },
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
};
