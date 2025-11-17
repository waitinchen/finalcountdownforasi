import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-blue': '#0a0e27',
        'space-dark': '#1a1a2e',
        'space-darker': '#16213e',
        'neon-blue': '#64c8ff',
        'electric-cyan': '#4ade80',
        'warning-yellow': '#fbbf24',
        'danger-red': '#ef4444',
        'text-primary': '#e0e6ed',
        'text-secondary': '#8b9dc3',
        'text-muted': '#5a7ba8',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)',
        'neon-glow': 'linear-gradient(90deg, #4ade80 0%, #fbbf24 50%, #ef4444 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config