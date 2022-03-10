import { createStitches, createTheme } from '@stitches/react'
import {
  blue,
  slate,
  violet,
  blueDark,
  slateDark,
  violetDark,
} from '@radix-ui/colors'

export const { styled, css, globalCss } = createStitches({
  media: {
    sm: '( min-width: 30em)',
    md: '( min-width: 48em)',
    lg: '( min-width: 62em)',
    xl: '( min-width: 80em)',
    '2xl': '( min-width: 96em)',
  },
  theme: {
    colors: {
      ...blue,
      ...slate,
      ...violet,
    },
    shadows: {
      ...slate,
    },
    space: {
      1: '3px',
      2: '5px',
      3: '8px',
      4: '12px',
      5: '1em',
      6: '1.5em',
    },
    radii: {
      sm: '8px',
      lg: '16px',
      round: '100em',
    },
  }
})
export const darkTheme = createTheme({
  colors: {
    ...blueDark,
    ...slateDark,
    ...violetDark,
  }
})
