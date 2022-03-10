import * as React from 'react'
import { styled } from '../../stitchesTheme'
import { IconButton } from '../ui/buttom'
import {
  PlayIcon,
  PauseIcon,
  SymbolIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@radix-ui/react-icons'
import ButtonContainer from '../utils/ButtonContainer'

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& p': {
    textAlign: 'center',
    paddingBottom: '.5em',
  },
  paddingBlock: '3rem',
})

interface CanvasContainerProps {
  title: string
  playState: boolean
  show: boolean
  onPlay: React.MouseEventHandler
  onReset: React.MouseEventHandler
  onShow: React.MouseEventHandler
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children, title, playState, onPlay, onReset, show,
  onShow
}) => {
  return(
    <Container> 
      <div> 
        <p>{title}</p>
        {children}
        <ButtonContainer>
          <IconButton color="violet" icon={
            show ? <EyeOpenIcon /> : <EyeClosedIcon />
          } onClick={onShow}/>
          {playState 
          ? <IconButton color="blue" icon={<PauseIcon/>}  onClick={onPlay}/>
          : <IconButton color="blue" icon={<PlayIcon/>}  onClick={onPlay}/>
          }
          <IconButton color="violet" icon={<SymbolIcon />} onClick={onReset}/>
        </ButtonContainer>
      </div>
    </Container>
  )
}
export default CanvasContainer
