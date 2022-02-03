import * as scales from '@radix-ui/colors'
import { createStitches, PropertyValue, CSS as BaseCSS } from '@stitches/react'

type ScaleIndices = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Scale = {
  [K in ScaleIndices as `tint${K}`]: string
}

const normalizeRadixColorScale = <T>(scale: T): Scale => {
  return Object.values(scale).reduce((acc, x, idx) => {
    return { ...acc, [`tint${idx + 1}`]: x }
  }, {})
}

export const breakpoints = {
  sm: 0,
  md: 480,
  lg: 769,
  xl: 1281
}

export const { styled, css, keyframes, globalCss, getCssText, createTheme, theme, config } = createStitches({
  theme: {
    radii: {
      1: '4px',
      2: '8px',
      3: '15px',
      4: '30px',
      5: '75px',
      circle: '9999px' // 100%
    },

    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 32,
      5: 64,
      6: 128
    },

    borderWidths: {
      thin: '1px',
      thick: '2px'
    },

    zIndices: {
      modal: 17
    },

    colors: {
      positive: '#2fc888',
      negative: '#ff5454',
      alert: '#F4B03E',

      ...normalizeRadixColorScale(scales.grayDark),

      tint1: 'black',

      // Semantic vars
      background: '$tint1',

      inputBackground: '$tint2',

      uiBackground: '$tint3',
      uiBackgroundHover: '$tint4',
      uiBackgroundActive: '$tint5',

      border: '$tint6',
      borderHover: '$tint7',
      borderActive: '$tint8',

      textTertiary: '$tint10',
      textSecondary: '$tint11',
      textPrimary: '$tint12',

      gradientPrimary:
        'linear-gradient(83.57deg, rgba(39, 249, 111, 0) 13.55%, rgba(34, 201, 161, 0.65) 98.35%), linear-gradient(265.77deg, rgba(97, 12, 235, 0) 44.4%, rgba(70, 27, 92, 0) 44.41%, #661A8D 110.31%), #4B35A2',
      gradientPrimaryHover:
        'linear-gradient(83.57deg, rgba(69, 255, 141, 0) 13.55%, rgba(44, 211, 171, 0.85) 98.35%), linear-gradient(265.77deg, rgba(127, 42, 255, 0) 44.4%, rgba(100, 57, 122, 0) 44.41%, #661a8d 110.31%), #8B75E2',
      gradientSecondary:
        'linear-gradient(83.57deg, rgba(0, 0, 0, 0) 13.55%, rgba(34, 201, 191, 0.25) 98.35%), linear-gradient(265.77deg, rgba(92, 47, 115, 0) 58.48%, rgba(92, 47, 115, 0.5) 110.31%), #FFFFFF',
      gradientSecondaryHover:
        'linear-gradient(83.57deg, rgba(0, 0, 0, 0) 13.55%, rgba(34, 201, 191, 0.15) 98.35%), linear-gradient(265.77deg, rgba(92, 47, 115, 0) 58.48%, rgba(92, 47, 115, 0.4) 110.31%), #FFFFFF',
      gradientTertiary:
        'linear-gradient(83.57deg, rgba(0, 0, 0, 0) 13.55%, rgba(34, 201, 191, 0.2) 98.35%), linear-gradient(265.77deg, rgba(92, 47, 115, 0) 58.48%, rgba(92, 47, 115, 0.3) 110.31%), rgba(74, 74, 74, 0.5)'
    },

    fonts: {
      heading: 'Arial',
      body: 'Arial',
      code: 'monospace'
    },

    fontSizes: {
      xs: '10px',
      sm: '12px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '35px'
    },

    fontWeights: {
      heading: 500,
      body: 600,
      bold: 700
    },

    letterSpacings: {
      heading: '0.01em',
      body: '0.02em'
    },

    fontStyles: {
      normal: 'normal',
      italic: 'italic'
    },

    lineHeights: {
      heading: 1.2,
      body: 1.4
    }
  },

  media: {
    sm: `(min-width: ${breakpoints.sm}px)`,
    md: `(min-width: ${breakpoints.md}px)`,
    lg: `(min-width: ${breakpoints.lg}px)`,
    xl: `(min-width: ${breakpoints.xl}px)`
  },

  utils: {
    size: (value: PropertyValue<'width'>) => ({
      width: value,
      height: value
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value: PropertyValue<'marginLeft'>) => ({
      marginTop: value,
      marginBottom: value
    }),
    mt: (value: PropertyValue<'marginLeft'>) => ({
      marginTop: value
    }),
    mb: (value: PropertyValue<'marginLeft'>) => ({
      marginBottom: value
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value: PropertyValue<'paddingLeft'>) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    pt: (value: PropertyValue<'paddingLeft'>) => ({
      paddingTop: value
    }),
    pb: (value: PropertyValue<'paddingLeft'>) => ({
      paddingBottom: value
    })
  }
})

export type Theme = typeof theme

export type CSS = BaseCSS<typeof config>
