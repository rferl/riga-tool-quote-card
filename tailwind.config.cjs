/** @type {import('tailwindcss').Config} */

// Values used across 
const sideNavMinWidth = '2rem'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        skolar: ['skolar'],
        'skolar-sans': ['skolar-sans'],
      },
      colors: {
        'gray': {
          '5': '#FDFDFD',
          '25': '#FBFCFD'
        },
        'orange-riga': {
          '5': '#FFF9F7',
          '15': '#FAF3EF',
          '50': '#F9CCB6',
          '100': '#F6B892',
          '200': '#F3A46E',
          '300': '#F0904A',
          '400': '#ED7C26',
          '500': '#EA6802',
          '600': '#F16500',
          '700': '#DD5B00',
          '800': '#C95100',
          '900': '#B54700',
          '950': '#A13D00',
        },
        'blue-riga': {
          '3': '#F5F9FC',
          '5': '#F1F8FD',
          '15': '#ECF7FF',
          '50': '#94B6FF',
          '100': '#7AACFF',
          '200': '#60A2FF',
          '300': '#4698FE',
          '400': '#2C8EF4',
          '500': '#0284EA',
          '600': '#0181C9',
          '700': '#0077BF',
          '800': '#006DB5',
          '900': '#0063AB',
          '950': '#0059A1',
        },
        'white-translucent': {
          '3': 'rgba(255, 255, 255, 0.3)',
          '5': 'rgba(255, 255, 255, 0.5)',
          '8': 'rgba(255, 255, 255, 0.8)',
        }
      },
      spacing: {
        'min-sidenav': sideNavMinWidth
      },
      maxWidth: {
        'min-sidenav': sideNavMinWidth
      },
      lineHeight: {
        'half': '0.5'
      },
      gridTemplateColumns: {
        'card': 'repeat(auto-fit, minmax(180px, 1fr))',
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        'scale-up-down': {
          '0%, 100%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.05)' },
          '66%': { transform: 'scale(0.98)' },
        }
      },
      animation: {
        'scale-up-down': 'scale-up-down 1s ease-in-out'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

