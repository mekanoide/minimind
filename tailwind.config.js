/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './**/*.vue'
  ],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace']
      },
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e5',
          200: '#fecdd2',
          300: '#fca5ae',
          400: '#fa7283',
          500: '#f2415b',
          600: '#e01f45',
          700: '#bc1439',
          800: '#9e1337',
          900: '#871434',
          950: '#4b0617'
        },
        label01: {
          50: '#f8f6ed',
          100: '#efedd8',
          200: '#e0dcb6',
          300: '#cbc68b',
          400: '#ada752',
          500: '#9b9747',
          600: '#7a7836',
          700: '#5e5d2d',
          800: '#4c4c28',
          900: '#424225',
          950: '#222310'
        },
        label02: {
          50: '#f9f6f8',
          100: '#f5eef1',
          200: '#ebdfe4',
          300: '#dcc5ce',
          400: '#c6a0ae',
          500: '#b28292',
          600: '#9b6776',
          700: '#83535f',
          800: '#6e4650',
          900: '#624149',
          950: '#362126'
        },
        label03: {
          50: '#f6f4f0',
          100: '#e9e2d8',
          200: '#d5c6b3',
          300: '#bda387',
          400: '#aa8665',
          500: '#9b7457',
          600: '#855f49',
          700: '#68473b',
          800: '#5b4038',
          900: '#503833',
          950: '#2d1d1b'
        },
        label04: {
          50: '#f4f9f8',
          100: '#dbece7',
          200: '#b7d8d0',
          300: '#8bbdb1',
          400: '#619e92',
          500: '#488479',
          600: '#386962',
          700: '#30554f',
          800: '#2a4542',
          900: '#263b39',
          950: '#122120'
        },
        label05: {
          50: '#f2f4fb',
          100: '#e7eaf8',
          200: '#d4d8f1',
          300: '#bac0e7',
          400: '#9da0dc',
          500: '#8785cf',
          600: '#766cbf',
          700: '#6359a6',
          800: '#524c87',
          900: '#45426d',
          950: '#292640'
        },
        label06: {
          50: '#fcf7fc',
          100: '#f8eff8',
          200: '#f1ddf0',
          300: '#e5c2e2',
          400: '#d59dd0',
          500: '#bf76b7',
          600: '#a6599c',
          700: '#85467b',
          800: '#6e3a66',
          900: '#5b3454',
          950: '#391933'
        }
      }
    }
  },
  safelist: [
    {
      pattern: /bg-+|text-+/,
      variants: ['hover']
    }
  ],
  variants: {
    extend: {}
  },
  plugins: []
}