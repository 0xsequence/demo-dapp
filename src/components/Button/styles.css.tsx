import { vars } from '@0xsequence/design-system'
import { style } from '@vanilla-extract/css'

export const button = style({
  border: 'none',
  display: 'inline-block',
  userSelect: 'none',
  cursor: 'pointer',

  color: vars.colors.text100,
  backgroundColor: vars.colors.buttonGlass,
  position: 'relative',
  width: '100%',
  height: '50px',
  borderRadius: '15px',
  padding: '15px',
  alignItems: 'center',

  ':hover': {
    opacity: 0.8
  },

  ':disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    opacity: 0.6
  }
})