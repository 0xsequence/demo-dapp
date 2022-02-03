import { globalCss } from './theme'

globalCss({
  '*': {
    boxSizing: 'border-box'
  },

  body: {
    background: '$background',
    margin: 0
  }
})()
