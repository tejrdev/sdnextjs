/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Open Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
        mont: 'Montserrat, sans-serif'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.4' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem'],
        '2xl': ['1.63rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.15rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      maxWidth: ({ theme, breakpoints }) => ({
        ...theme('spacing'),
        container: '85.375rem',
        ...breakpoints(theme('screens')),
      }),
      colors: {
        'gold': '#D7B865',
        'darkgold': '#B88610',
        'orangegold': '#F9A600',
        'gold-yellow': '#fef5dd',
        'blue': '#0000ff',
      },
      screens: {
        xsm: '480px',
        sm: '640px',
        md: '768px',
        lg: '992px',
        tablet: '1025px',
        xl: '1200px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'auto-fill': (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
          'auto-fit': (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
        },
        {
          values: theme('width'),
          variants: ['responsive'],
        }
      )
    }),
  ],
}

