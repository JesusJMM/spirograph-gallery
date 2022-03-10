import * as React from 'react'
import { styled } from '../../stitchesTheme'

const Button = styled('button', {
  padding: '$3 $6',
  border: 'none',
  borderRadius: '$sm',
  backgroundColor: '$slate2',
  cursor: 'pointer',
  color: '$slate12',
  outline: '0px solid transparent',
  transition: 'background-color 100ms ease, outline-color 100ms ease',
  '&:hover, &:active': {
    backgroundColor: '$slate4'
  },
  '&:focus': {
    outline: '2px solid $slate6',
    outlineOffset: '2px'
  },
  variants:{
    color : {
      blue: {
        backgroundColor: '$blue4',
        color: '$blue11',
        '&:hover, &:active': {
          backgroundColor: '$blue5'
        },
        '&:focus': {
          outline: '2px solid $blue7',
        },
      },
      violet: {
        backgroundColor: '$violet4',
        color: '$violet11',
        '&:hover, &:active': {
          backgroundColor: '$violet5'
        },
        '&:focus': {
          outline: '2px solid $violet7',
        },
      }
    },
    size: {
      md: {
        fontSize: '1em',
        fontWeight: '600',
        margin: '$5 $6'
      },
      lg: {
        fontSize: '1.5em',
        fontWeight: '600',
        margin: '$5 $6'
      }
    }
  }
})

const StyledIconButton = styled(Button, {
  padding: '0.5em',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
})

interface IconButtonProps {
  icon: React.ReactNode
  color?: 'blue' | 'violet'
  onClick?: React.MouseEventHandler
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, color, ...props}) => {
  return (
    <StyledIconButton color={color} {...props}> { icon } </StyledIconButton>
  )
}

export default Button
