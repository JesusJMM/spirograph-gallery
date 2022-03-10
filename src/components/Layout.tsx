import * as React from 'react'
import { styled } from '../stitchesTheme'

const Layout = styled('div', {
  width: '100%',
  height: '100%',
  display: 'grid',
  variants:{
    layout: {
      inline: {
        display: 'grid',
        gridTemplateColumns: '66% 1fr',
        gridTemplateRows: '1fr'
      },
      vertical: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})

export default Layout
