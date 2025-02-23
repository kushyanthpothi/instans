/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
      },
      gridTemplateColumns: {
        'screen': '65fr 35fr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
