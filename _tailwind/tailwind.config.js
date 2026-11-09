// Tailwind v3 config for the public site. Run from the repo root with:
//   npx tailwindcss@3.4.17 -c _tailwind/tailwind.config.js -i _tailwind/input.css -o css/tailwind.css --minify
// Same palette and fonts as the old inline `tailwind.config` blocks on the pages.
module.exports = {
  content: [
    './index.html',
    './partners.html',
    './blog/*.html',
    './_drafts/**/*.html',
    './scripts/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a1a2e', light: '#2d2d4a', dark: '#12121f' },
        cream: '#f5f2eb',
        copper: { DEFAULT: '#b87333', light: '#d4915a' },
        charcoal: '#2d3748',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
};
