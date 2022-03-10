import { useRef, useEffect, useState } from 'react'
import * as React from 'react'
import Toile, { toileLoopSubscribe, toileLoopUnsubcribe } from 'toile-canvas'
import { styled } from '../../stitchesTheme'
import ButtonContainer from '../utils/ButtonContainer'
import { IconButton } from '../ui/buttom'
import {
  PlayIcon,
  PauseIcon,
  SymbolIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  ImageIcon,
} from '@radix-ui/react-icons'
import useOnScreen from '../../hooks/useOnScreen'

export const StyledCanvas = styled('canvas', {
  borderRadius: '$sm',
  border: '1px solid $slate8',
})

const Container = styled('div', {
  filter: 'opacity(0)',
  transform: 'translateY(-8px)',
  transition: 'filter 550ms ease, transform 600ms ease',
  '&.visible':{
    filter: 'opacity(1)',
    transform: 'translateY(0px)',
  },
  '& > .buttonContainer':{
    filter: 'opacity(1)',
    transform: 'translateY(0px)',
  },
  '@md': {
    '& > .buttonContainer': {
      transition: 'all 220ms ease-out',
      filter: 'opacity(0)',
      transform: 'translateY(-8px)',
    },
    '&:hover > .buttonContainer , &:focus': {
      filter: 'opacity(1)',
      transform: 'translateY(0px)',
    },
  }
})
const Legend = styled('div', {
  fontSize: '14px',
  color: '$slate10',
  position: 'absolute',
  transform: 'translate(7px, -27px)',
})

interface CanvasProps {
  drawFunction: (toile: Toile, loop: boolean) => () => void
  loop: boolean
  canvasID: string
  hide: boolean
  onPlayButton?: React.MouseEventHandler
  onHideButton?: React.MouseEventHandler
  onResetButton?: React.MouseEventHandler
  info?: string
}

const Canvas: React.FC<CanvasProps> = ({
  loop,
  hide,
  drawFunction,
  canvasID,
  onPlayButton,
  onHideButton,
  onResetButton,
  info,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const toile = useRef<Toile | null>(null)
  const isVisible = useOnScreen(canvas)
  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if (ctx) {
      toile.current = new Toile(ctx, 245, 245)
    }
  }, [])
  useEffect(() => {
    if (toile.current) {
      const draw = drawFunction(toile.current, loop)
      if (loop && isVisible) {
        toileLoopSubscribe(draw, canvasID)
      } else {
        toileLoopUnsubcribe(canvasID)
        draw()
      }
    }
  }, )
  return (
    <Container  className={isVisible ? 'visible' : ''}>
      <StyledCanvas ref={canvas}/>
      <Legend>
        <p>{info}</p>
      </Legend>
      <ButtonContainer className='buttonContainer'>
        <IconButton
          color='violet'
          icon={hide ? <EyeClosedIcon /> : <EyeOpenIcon />}
          onClick={onHideButton}
        />
        <IconButton
          color='blue'
          icon={loop ? <PlayIcon /> : <PauseIcon />}
          onClick={onPlayButton}
        />
        <IconButton
          color='violet'
          icon={<SymbolIcon />}
          onClick={onResetButton}
        />
      </ButtonContainer>
    </Container>
  )
}

export default Canvas
