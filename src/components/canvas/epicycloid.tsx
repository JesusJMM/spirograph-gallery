import * as React from 'react'
import { useState, useRef } from 'react'
import { spirografhLapsFromP } from '../../utils/spirographs'
import Canvas from './GalleryCanvas'
import Toile from 'toile-canvas'
import { violet } from '@radix-ui/colors'
import { spirograph } from '../../lib/spirograph'
import { drawSpirographGuides } from '../../lib/draw'

interface EpicycloidProps {
  canvasID: string
  p: number
  R?: number
  V?: number
  h?: number
  color?: string
}

const Epicycloid: React.FC<EpicycloidProps> = ({
  canvasID,
  p,
  h = 0,
  R = 48,
  V = 0.04,
  color = violet.violet9,
}) => {
  const [play, setPlay] = useState(true)
  const [hide, setHide] = useState(true)
  const points = useRef<{ x: number; y: number }[]>([])
  const angle = useRef(0)
  const maxAngle = spirografhLapsFromP(R, p) * Math.PI * 2

  const _draw = (draw: Toile, loop: boolean) => {
    draw.origin(draw.width / 2, draw.height / 2)
    draw.Swidth = 2
    draw.Fcol = ''
    draw.ctx.lineJoin = 'round'
    draw.ctx.lineCap = 'round'
    const r2 = R / p
    return () => {
      if(Math.abs(angle.current) < maxAngle) {
        angle.current -= V
      }else{
        setPlay(false)
        angle.current = -maxAngle
      }
      draw.clear()
      draw.Scol = color
      const _h = h == 0 ? r2 : h
      const {circle, target } = spirograph(angle.current, R, r2, _h, 'epi')
      if(Math.abs(angle.current) < maxAngle) points.current.push(target)
      draw.lines(points.current)

      if (!hide) drawSpirographGuides(draw, R, r2, target, circle)
    }
  }

  return (
    <Canvas
      loop={play}
      hide={hide}
      drawFunction={_draw}
      canvasID={canvasID}
      onHideButton={() => setHide(!hide)}
      onPlayButton={() => {
        setPlay(!play)
        if(Math.abs(angle.current) == maxAngle){
          angle.current = 0
          points.current = []
        }
      }}
      onResetButton={() => {
        setPlay(true)
        angle.current = 0
        points.current = []
      }}
      info={`p: ${p}`}
    />
  )
}

export default Epicycloid
