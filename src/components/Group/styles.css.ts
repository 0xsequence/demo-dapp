import { vars, responsiveStyle } from '@0xsequence/design-system'
import { style } from '@vanilla-extract/css'

export const groupItems = style({
  display: 'grid',
  gridColumnGap: vars.space[2],
  gridRowGap: vars.space[2],
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  '@media': responsiveStyle({
    lg: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    },
    xl: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    }
  })
})
