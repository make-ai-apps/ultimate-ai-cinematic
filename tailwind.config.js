/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#05050a',
        bone: '#f4f1ea'
      }
    }
  },
  plugins: []
};
