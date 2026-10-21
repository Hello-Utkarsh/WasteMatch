/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F5',
        brand: {
          50: '#FDF2F2',
          100: '#FDE8E8',
          200: '#FBD5D5',
          500: '#D1343A',
          600: '#BA262C',
          700: '#A81818',
          800: '#8A1414',
          900: '#680E0E',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F3F0EE',
          muted: '#EBE7E4',
        },
        ink: {
          primary: '#1A1818',
          secondary: '#555150',
          muted: '#8C8785',
        },
        status: {
          success: '#15803D',
          'success-bg': '#DCFCE7',
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Poppins',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        card: '0 4px 16px -2px rgba(26, 24, 24, 0.06), 0 2px 6px -1px rgba(26, 24, 24, 0.04)',
        elevated: '0 12px 32px -4px rgba(26, 24, 24, 0.1), 0 4px 12px -2px rgba(26, 24, 24, 0.05)',
      },
    },
  },
  plugins: [],
};

