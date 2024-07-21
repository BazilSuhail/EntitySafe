/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'backrground-color': '#121212',
        'navbar-color': '#18181C', 
        'search-color': '#202020', 
        'base-color': 'rgb(48,48,48)', 
      },
      boxShadow: {
        'contact-shadow': '0px 0px 30px rgba(255, 177, 134, 0.434)', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
/*320f03 

        
*/
