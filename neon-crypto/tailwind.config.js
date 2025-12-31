/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0f0f0f",
        primary: {
          DEFAULT: "#7000FF",
          dark: "#5000CC",
          light: "#8000FF",
        },
        secondary: {
          DEFAULT: "#00C2FF",
          dark: "#0099CC",
          light: "#33D1FF",
        },
        neon: {
          purple: "#7000FF",
          blue: "#00C2FF",
          green: "#10B981",
          red: "#EF4444",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #7000FF 0%, #00C2FF 100%)',
        'neon-gradient-vertical': 'linear-gradient(180deg, #7000FF 0%, #00C2FF 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(112, 0, 255, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 194, 255, 0.5)',
        'neon-purple-lg': '0 0 40px rgba(112, 0, 255, 0.6)',
        'neon-blue-lg': '0 0 40px rgba(0, 194, 255, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(112, 0, 255, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(112, 0, 255, 0.6)' 
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slide-in': {
          '0%': { 
            transform: 'translateX(-20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        'scale-in': {
          '0%': { 
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};