/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        navy: '#0B1B3D',
        'navy-light': '#1a2d54',
        blue: '#3B82F6',
        'blue-dark': '#2563EB',
        'blue-light': '#60A5FA',
        // Dark mode surface colors
        'dark-bg': '#0f1117',
        'dark-surface': '#1a1d27',
        'dark-card': '#22252f',
        'dark-border': '#2e3240',
        'dark-hover': '#2a2d38',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
