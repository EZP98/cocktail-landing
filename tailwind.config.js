/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#FFF4EE',
          100: '#FFE4D6',
          200: '#FFC9AD',
          300: '#FFA37A',
          400: '#FF7D47',
          500: '#FF6128',
          600: '#E04D18',
          700: '#B93D12',
          800: '#96320F',
          900: '#7A2B10',
          950: '#431205',
        },
        lounge: {
          dark:    '#0A0A0B',
          card:    '#111113',
          surface: '#16161A',
          border:  '#1E1E22',
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
