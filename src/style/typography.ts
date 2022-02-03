import { css } from './theme'

export const typography = {
  h1: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$heading',
    fontSize: '$lg',
    lineHeight: '$heading',
    letterSpacing: '$heading'
  }),
  h2: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$heading',
    fontSize: '14px',
    lineHeight: '$heading',
    letterSpacing: '$heading'
  }),
  h3: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: 600,
    fontSize: '$xl',
    lineHeight: '$heading',
    letterSpacing: '$heading'
  }),
  b1: css({
    fontFamily: '$body',
    fontStyle: '$normal',
    fontWeight: '$bold',
    fontSize: '$md',
    lineHeight: '$body',
    letterSpacing: '$body'
  }),
  b2: css({
    fontFamily: '$body',
    fontStyle: '$normal',
    fontWeight: '$body',
    fontSize: '$sm',
    lineHeight: '$body',
    letterSpacing: '$body'
  }),
  b3: css({
    fontFamily: '$body',
    fontStyle: '$normal',
    fontWeight: 400,
    fontSize: '$sm',
    lineHeight: '$body',
    letterSpacing: '$body'
  }),
  b4: css({
    fontFamily: '$body',
    fontStyle: '$normal',
    fontWeight: '$body',
    fontSize: '$xs',
    lineHeight: '$body',
    letterSpacing: '$body'
  }),
  button: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$heading',
    fontSize: '14px',
    lineHeight: '$heading',
    letterSpacing: '$heading'
  }),
  buttonSmall: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$body',
    fontSize: '$xs',
    lineHeight: '$body',
    letterSpacing: '$body'
  }),
  balance: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$heading',
    fontSize: '$xxl',
    lineHeight: '$heading',
    letterSpacing: '0.03em'
  }),
  amount: css({
    fontFamily: '$heading',
    fontStyle: '$normal',
    fontWeight: '$heading',
    fontSize: '25px',
    lineHeight: '$heading',
    letterSpacing: '0.03em'
  }),
  code: css({
    fontFamily: '$code',
    fontSttyle: '$normal',
    fontWeight: 400,
    fontSize: '$sm',
    lineHeight: '$body',
    letterSpacing: '$body'
  })
}
