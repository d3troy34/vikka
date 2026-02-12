/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vekka: {
          ink: '#0C0A09',
          deep: '#1C1917',
          off: '#292524',
          moss: '#451A03',
          amber: '#D97706',
          'amber-mid': '#FBBF24',
          gold: '#FDE68A',
          yellow: '#f8ed44',
          'footer-brown': '#78350F',
        },
      },
      fontFamily: {
        display: ['Sora', 'Space Grotesk', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        deck: '0 35px 90px -32px rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        hero: '2.75rem',
      },
    },
  },
  plugins: [],
};
