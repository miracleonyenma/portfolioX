const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './assets/scss/*.{css,scss}',
    './assets/css/*.{css,scss}'
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
        '102': '28rem',
        '134' : '36rem'
      },

      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.100"),
            code: {color: theme("colors.gray.100"), fontFamily: theme("font.mono")},
            a: {color: theme("colors.gray.100")},
            'a code': {color: theme("colors.gray.100")},
            em: {color: theme("colors.gray.100")},
            strong: {color: theme("colors.gray.100")},

            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.100") },
            h4: { color: theme("colors.gray.100") },
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
