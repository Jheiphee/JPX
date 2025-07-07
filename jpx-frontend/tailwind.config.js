// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class', // optional kung gagamit ng dark mode toggle
  theme: {
    extend: {
      colors: {
        coffee: '#1b1512',
        metallicgold: '#d4af37',
        darkgold: '#b8912d',
        offwhite: '#f9f9f6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 12px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover', 'focus'],
      backgroundColor: ['hover', 'focus'],
      borderColor: ['hover', 'focus'],
    },
  },
  plugins: [],
};
