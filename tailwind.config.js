/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050506',
        ember: {
          950: '#180405',
          900: '#260708',
          800: '#4b0e10',
          700: '#7f171a',
          500: '#dc2b2f',
        },
        glow: {
          orange: '#ff7a18',
          red: '#ff3240',
        },
      },
      boxShadow: {
        holo: '0 0 24px rgba(255, 50, 64, 0.35), 0 0 48px rgba(255, 122, 24, 0.2)',
      },
      borderRadius: {
        panel: '1.75rem',
      },
      backgroundImage: {
        'radar-grid':
          'radial-gradient(circle at center, rgba(255,50,64,0.18) 0, transparent 60%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'radar-grid': 'auto, 40px 40px, 40px 40px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(14px)' },
        },
      },
      animation: {
        drift: 'drift 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
