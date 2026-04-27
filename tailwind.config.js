/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1c3355',
          navy2: '#243f68',
          navy3: '#2c4c7c',
          navy4: '#3a5d92',
          orange: '#f5a623',
          orange2: '#ffb84d',
          orange3: '#e89829',
          ink: '#1c3355',
          ink2: '#1c3355',
          ink3: '#243f68',
          light: '#1c3355',
          light2: '#243f68',
          light3: '#3a5d92'
        }
      },
      fontFamily: {
        display: ['"Exo 2"', 'system-ui', 'sans-serif'],
        body: ['Saira', 'system-ui', 'sans-serif']
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'orb': 'orb 20s ease-in-out infinite',
        'truck-drive': 'truck-drive 25s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'ping-slow': 'ping 4s cubic-bezier(0,0,0.2,1) infinite'
      },
      keyframes: {
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        orb: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,20px) scale(0.95)' }
        },
        'truck-drive': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' }
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' }
        }
      }
    }
  },
  plugins: []
}
