/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A1628',
          'primary-light': '#1E3A8A',
          secondary: '#3B82F6',
          cta: '#CA8A04',
          'cta-light': '#D4AF37',
          background: '#FAF8F3',
          'background-alt': '#F5F3EE',
          text: '#0A1628',
          'text-muted': '#64748B',
          gold: '#D4AF37',
          'gold-dark': '#B8941F',
          cream: '#FAF8F3',
          white: '#FFFFFF',
          navy: '#0A1628',
        }
      },
      fontFamily: {
        heading: ['Bodoni Moda', 'serif'],
        body: ['Jost', 'sans-serif'],
        sans: ['Jost', 'sans-serif'],
        serif: ['Bodoni Moda', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
