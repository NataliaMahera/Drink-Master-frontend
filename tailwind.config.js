/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        sm: '1.25rem',
        md: '2rem',
        lg: '6.25rem',
      },
    },
    darkMode: 'class',
    screens: {
      sm: '375px',
      // => @media (min-width: 375px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      'primary-text-color': '#F3F3F3',
      'primary-text-button-color': '#161F37',
      'pagination-button-color': '#4070CD',
      'button-hover-color': '#0A0A11',
      'welcome-text-color': '#FAFAFA',
      'filter-scroll-text': '#434D67',
      'hover-text-color': '#253d6f',
      'border-color': 'rgba(243, 243, 243, 0.2)',
      'border-color-for-light': 'rgba(22, 31, 55, 0.2)',
      'border-color-add': 'rgba(64, 112, 205, 0.5)',
      'grey-text-color': 'rgba(243, 243, 243, 0.5)',
      'hover-button-border-color': 'rgba(64, 112, 205, 0.5)',
      'ingredients-card-bg': ' rgba(22, 31, 55, 0.5)',
      transparent: 'rgba(243, 243, 243, 0)',
      'background-color': '#06060c;',
      'light-theme-bg-color': '#D2D2D2',
      'dark-theme-bg-color': '#0A0A11',

      'error-color': '#da1414',
      'correct-color': '#3cbc81',
    },
  },
  plugins: [],
};
