import Toile, { toileLoopUnsubcribe } from 'toile-canvas'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { styled } from '../stitchesTheme'
import { violet } from '@radix-ui/colors'
import { toileLoopSubscribe, toileFramesFunctions} from 'toile-canvas'
import { spirografhLaps } from '../utils/spirographs'

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
})

interface LoaderProps {
  r1: number,
  r2: number,
  k: number,
}

const Loader: React.FC<LoaderProps> = ({r1, r2, k}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  function _draw(draw: Toile){
    let a = 0
    let points : {x: number, y: number}[] = []
    draw.origin(draw.width/2,draw.height/2)
    draw.Scol = violet.violet9
    draw.Fcol = ''
    draw.Swidth = 3
    draw.ctx.lineCap = 'round'
    console.log(spirografhLaps(r1, r2))
    return () => {
      if(a > Math.PI * spirografhLaps(r1, r2) * 5){
        return
      }
      draw.clear()
      a+= 0.1
      points.push({
        x: (r1 - r2) * Math.cos(a) + k * Math.cos(a * (1 - (r1 / r2))),
        y: (r1 - r2) * Math.sin(a) + k * Math.sin(a * (1 - (r1 / r2))),
      })
      draw.lines(points)
    }
  }
  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if(ctx){
      const frame = _draw(new Toile(ctx, 200, 200))
      toileLoopSubscribe(frame, 'loader')
      return () => toileLoopUnsubcribe('loader')
    }
  })
  return (
    <Container> 
      <canvas ref={canvas} />
    </Container>
  )
}
export default Loader
