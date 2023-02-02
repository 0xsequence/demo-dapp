import { style, keyframes } from '@vanilla-extract/css'

export const blink = keyframes({
  '0%': { visibility: 'hidden' },
  '50%': { visibility: 'hidden' },
  '100%': {visibility: 'visible' }
})

export const cursor = style({
  animation: `${blink} 2s infinite`,
})