//tailwind.config.ts
import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  important : true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add other paths here where Tailwind should look for class names
    './app/**/*.{js,ts,jsx,tsx}', // If using an 'app' directory
    './src/**/*.{js,ts,jsx,tsx}', // If using a 'src' directory
  ],
  theme: {
    extend: {
      colors: {
        'thd-blau': '#1a4273',
        'donau-blau': '#009fe3',
        'dark-grey': '#313131',
        'dark-grey-transparent2': 'rgba(49, 49, 49, 0.2)',
        'dark-grey-transparent5': 'rgba(49, 49, 49, 0.5)',
        'dark-grey-transparent6': 'rgba(49, 49, 49, 0.6)',
        'dark-grey-transparent7': 'rgba(49, 49, 49, 0.7)',
        'dark-grey-transparent8': 'rgba(49, 49, 49, 0.8)',
        'dark-grey-transparent9': 'rgba(49, 49, 49, 0.9)',
        'light-grey': '#434343',
        'light-grey-transparent1': 'rgba(67, 67, 67, 0.1)', 
        'light-grey-transparent2': 'rgba(67, 67, 67, 0.2)', 
        'light-grey-transparent3': 'rgba(67, 67, 67, 0.3)', 
        'light-grey-transparent4': 'rgba(67, 67, 67, 0.4)', 
        'light-grey-transparent5': 'rgba(67, 67, 67, 0.5)', 
        'light-grey-transparent6': 'rgba(67, 67, 67, 0.6)', 
        'light-grey-transparent7': 'rgba(67, 67, 67, 0.7)', // 50% opacity
        'light-grey-transparent8': 'rgba(67, 67, 67, 0.8)', 
        'light-grey-transparent9': 'rgba(67, 67, 67, 0.9)', 

        
        'schema-bg': 'rgba(255, 255, 255, 0.9)',
        'schema-color': '#313131', // Assuming schema-color is dark-grey
      },
      fontFamily: {
        'orator': ['Orator_Std_Medium', 'serif'],
        'saira': ['Saira', 'sans-serif'],
      },
      fontSize: {
        'tile': '28px',
        'text': '14px',
      },
      lineHeight: {
        'custom': '1.4rem',
      },
      typography: {
        DEFAULT: {
            css: {
              h2: {
                fontFamily: 'Orator_Std_Medium', // Font family for headings
                fontSize: '28pt', // Font size for headings
              },
              '.prose-tile': {
                fontFamily: 'Saira, sans-serif !important', // Font family for tiles
                fontSize: '28px', // Font size for tiles
              },
              '.prose-text': {
                fontFamily: 'Saira, sans-serif', // Font family for text
                fontSize: '14px', // Font size for text
                lineHeight: '1.428571429', // Line height for text
                color: '#333333', // Text color
              },
            },
        },
    },
    },
  },
  plugins: [
    // Include any Tailwind plugins you might need, for example:
    require('@tailwindcss/forms'),
    //require('@tailwindcss/typography'), // Include Tailwind Typography plugin
    // Add other plugins here
  ],
  // If you're using JIT mode or need to specify other configurations, add them here
  mode: 'jit',
};

export default config;
