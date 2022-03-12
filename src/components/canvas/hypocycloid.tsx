import Toile from 'toile-canvas'
import { useState, useRef } from 'react'
import * as React from 'react'
import Canvas from './GalleryCanvas'
import { violet } from '@radix-ui/colors'
import { spirografhLapsFromP } from '../../utils/spirographs'
import { spirograph } from '../../lib/spirograph'
import { drawSpirographGuides } from '../../lib/draw'

interface HypocycloidProps {
  canvasID: string
  p: number
  k?: number
  R?: number
  color?: string
}

const Hypocycloid: React.FC<HypocycloidProps> = ({ canvasID, p, k = 0, R=100, color=violet.violet9 }) => {
  const [play, setPlay] = useState(true)
  const [hide, setHide] = useState(true)
  const points = useRef<{ x: number; y: number }[]>([])
  const angle = useRef(0)

  const _draw = (draw: Toile, loop: boolean) => {
    draw.Fcol = ''
    draw.origin(draw.width / 2, draw.height / 2)
    draw.Swidth = 2
    draw.ctx.lineJoin = 'round'
    const r1 = R
    const r2 = r1 / p
    return () => {
      if (angle.current > spirografhLapsFromP(r1, p) * Math.PI * 2) {
        setPlay(false)
        angle.current = spirografhLapsFromP(r1, p) * Math.PI * 2
      }
      draw.clear()
      draw.Scol = color
      if (play) {
        angle.current += 0.05
      }
      const _k = k === 0 ? r2 : k
      const { circle, target } = spirograph(angle.current, r1, r2, _k, 'hypo')
      if (play) points.current.push(target)
      draw.lines(points.current)

      if (!hide) {
        drawSpirographGuides(draw, r1, r2, target, circle)
      }
    }
  }
  return (
    <Canvas
      drawFunction={_draw}
      loop={play}
      hide={hide}
      canvasID={canvasID}
      onPlayButton={() => {
        if (angle.current >= spirografhLapsFromP(R, p) * Math.PI * 2) {
          angle.current = 0
          points.current = []
        }
        setPlay(!play)
      }}
      onHideButton={() => setHide(!hide)}
      onResetButton={() => {
        setPlay(true)
        angle.current = 0
        points.current = []
      }}
      info={`p: ${p}`}
    />
  )
}
export default Hypocycloid
