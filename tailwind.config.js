/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'recipon-mustard': '#E7CC65',
        'recipon-beach': '#1B383A',
        'recpion-gray': '#656565',
        'recipon-light-gray': '#F0F0F0',
        'recipon-very-light-gray': '#F8F8F8',
      },
      fontFamily: {
        abril: ['AbrilFatface_400Regular'],
        'montserrat-100': ['Montserrat_100Thin'],
        'montserrat-200': ['Montserrat_200ExtraLight'],
        'montserrat-300': ['Montserrat_300Light'],
        montserrat: ['Montserrat_400Regular'],
        'montserrat-500': ['Montserrat_500Medium'],
        'montserrat-600': ['Montserrat_600SemiBold'],
        'montserrat-700': ['Montserrat_700Bold'],
        'montserrat-800': ['Montserrat_800ExtraBold'],
        'montserrat-900': ['Montserrat_900Black'],
        'montserrat-100-italic': ['Montserrat_100Thin_Italic'],
        'montserrat-200-italic': ['Montserrat_200ExtraLight_Italic'],
        'montserrat-300-italic': ['Montserrat_300Light_Italic'],
        'montserrat-italic': ['Montserrat_400Regular_Italic'],
        'montserrat-400-italic': ['Montserrat_400Regular_Italic'],
        'montserrat-500-italic': ['Montserrat_500MediumItalic'],
        'montserrat-600-italic': ['Montserrat_600SemiBold_Italic'],
        'montserrat-700-italic': ['Montserrat_700Bold_Italic'],
        'montserrat-800-italic': ['Montserrat_800ExtraBold_Italic'],
        'montserrat-900-italic': ['Montserrat_900Black_Italic'],
      },
    },
  },
  plugins: [],
};
