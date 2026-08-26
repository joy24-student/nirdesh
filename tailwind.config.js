/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#02040A",
          deep: "#050813",
          card: "#070B17",
          panel: "#0A1020",
          border: "#0C1326"
        },
        nirdesh: {
          blue: "#168BFF",
          cyan: "#00C8FF",
          royal: "#2855FF",
          violet: "#7437FF",
          purple: "#A760FF",
          green: "#1FD98B"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'nirdesh-gradient': 'linear-gradient(120deg, #00C8FF 0%, #1677FF 35%, #3154FF 58%, #7437FF 82%, #A760FF 100%)',
        'nirdesh-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 200, 255, 0.15), transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'glow-spin 12s linear infinite',
        'scan': 'scan 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
