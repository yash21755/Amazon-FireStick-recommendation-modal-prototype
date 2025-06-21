/** @type {import('tailwindcss').Config} */
// filepath: Frontend/tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      animation: {
        shake: "shake 0.2s infinite",
        dashSpin: 'dashSpin 1s linear infinite',
      },    
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" }, 
          "75%": { transform: "translateX(3px)" },  
        }, 
        dashSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        calligraphy: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
}
