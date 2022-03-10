import * as React from 'react'
import { styled } from '../../stitchesTheme'
import Canvas from '../canvas/CanvasEditor'
import ButtonContainer from '../utils/ButtonContainer'
import { IconButton } from '../ui/buttom'
import * as Icon from '@radix-ui/react-icons'

const CanvasContainer = styled('div', {
  widht: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

interface canvasControlsProps {
  k: number,
  r1: number,
  r2: number,
  play: boolean,
  hide: boolean,
  cycloidType: 'epi' | 'hypo'
  speed?: number
  reset?: boolean
  canvasSize: number,
  onPlay: React.MouseEventHandler,
  onHide: React.MouseEventHandler,
  onReset: React.MouseEventHandler
}

const CanvasControls: React.FC<canvasControlsProps> = ({
  k,
  r1,
  r2,
  play,
  hide,
  cycloidType,
  speed,
  reset,
  canvasSize,
  onHide,
  onPlay,
  onReset,
}) => {
  return (
      <CanvasContainer>
        <Canvas
          width={canvasSize}
          height={canvasSize}
          r1={r1}
          r2={r2}
          k={k}
          play={play}
          hide={hide}
          cycloidType={cycloidType}
          speed={speed}
          reset={reset}
        />
        <ButtonContainer>
          <IconButton
            color='violet'
            icon={hide ? <Icon.EyeClosedIcon /> : <Icon.EyeOpenIcon />}
            onClick={onHide}
          />
          <IconButton
            color='blue'
            icon={play ? <Icon.PlayIcon /> : <Icon.PauseIcon />}
            onClick={onPlay}
          />
          <IconButton
            color='violet'
            icon={<Icon.SymbolIcon />}
            onClick={onReset}
          />
        </ButtonContainer>
      </CanvasContainer>
  )
}
export default CanvasControls
