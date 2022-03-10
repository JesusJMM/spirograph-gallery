import * as React from 'react'
import { styled } from '../../stitchesTheme'

export const Input = styled('input', {
  padding: '$3 $5',
  margin: 0,
  border: 'none',
  borderRadius: '$sm',
  backgroundColor: '$slate3',
  color: '$slate12',
  outline: '2px solid transparent',
  transition: 'outline 100ms ease',
  '&:hover':{
    backgroundColor: '$slate4',
  },
  '&:focus': {
    outline: '2px solid $violet8 ',
  }
})
export const FormGroup = styled('div', {
  paddingBlock: '$4',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

