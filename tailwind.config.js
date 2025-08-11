/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-1': 'float-1 20s linear infinite',
        'float-2': 'float-2 25s linear infinite',
        'float-3': 'float-3 18s linear infinite',
        'float-4': 'float-4 22s linear infinite',
      },
      keyframes: {
        'float-1': {
          '0%': { 
            transform: 'translateX(-100px) translateY(0px) rotate(0deg)', 
            opacity: '0.1' 
          },
          '50%': { 
            transform: 'translateX(50vw) translateY(-20px) rotate(180deg)', 
            opacity: '0.3' 
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px)) translateY(0px) rotate(360deg)', 
            opacity: '0.1' 
          }
        },
        'float-2': {
          '0%': { 
            transform: 'translateX(-100px) translateY(0px) rotate(0deg)', 
            opacity: '0.15' 
          },
          '50%': { 
            transform: 'translateX(50vw) translateY(20px) rotate(-180deg)', 
            opacity: '0.25' 
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px)) translateY(0px) rotate(-360deg)', 
            opacity: '0.15' 
          }
        },
        'float-3': {
          '0%': { 
            transform: 'translateX(-100px) translateY(0px) rotate(0deg)', 
            opacity: '0.2' 
          },
          '50%': { 
            transform: 'translateX(50vw) translateY(-10px) rotate(360deg)', 
            opacity: '0.4' 
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px)) translateY(0px) rotate(720deg)', 
            opacity: '0.2' 
          }
        },
        'float-4': {
          '0%': { 
            transform: 'translateX(-100px) translateY(0px) rotate(0deg)', 
            opacity: '0.1' 
          },
          '50%': { 
            transform: 'translateX(50vw) translateY(15px) rotate(-360deg)', 
            opacity: '0.3' 
          },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px)) translateY(0px) rotate(-720deg)', 
            opacity: '0.1' 
          }
        }
      }
    },
  },
  plugins: [],
}