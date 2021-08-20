const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './assets/scss/*.{css,scss}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        header: [
          'Source Sans Pro',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      spacing: {
        '102': '28rem'
      },

      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.50"),
            code: {color: theme("colors.gray.50"), fontFamily: theme("font.mono")},
            a: {color: theme("colors.gray.50")},
            'a code': {color: theme("colors.gray.50")},

            h1: { color: theme("colors.gray.50") },
            h2: { color: theme("colors.gray.50") },
            h3: { color: theme("colors.gray.50") },
            h4: { color: theme("colors.gray.50") },
          }
        }
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
