/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        primary: '#6B4C8C',
        'primary-light': '#9B7FBE',
        accent: '#C8A951',
        'bg-soft': '#F9F6FF',
        'text-muted': '#6B6B6B',
        border: '#E8E0F0',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
