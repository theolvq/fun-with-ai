module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        dash: 'dash 1.5s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        dash: {
          '0%': {
            'stroke-dasharray': '1, 150',
            'stroke-dashoffset': 0,
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': -35,
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': -124,
          },
        },
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
