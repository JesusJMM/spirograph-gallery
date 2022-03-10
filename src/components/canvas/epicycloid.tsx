import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { spirografhLapsFromP } from '../../utils/spirographs'
import Canvas from './GalleryCanvas'
import Toile from 'toile-canvas'
import { blue, red, violet } from '@radix-ui/colors'

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
      if (play && Math.abs(angle.current) < maxAngle) {
        angle.current -= V
      }else{
        setPlay(false)
        angle.current = -maxAngle
      }
      const a = angle.current
      draw.clear()
      draw.Scol = color
      const cx = (R + r2) * Math.cos(a)
      const cy = (R + r2) * Math.sin(a)
      const _h = h == 0 ? r2 : h
      if (play && Math.abs(a) < maxAngle) {
        points.current.push({
          x: cx - _h * Math.cos((R + r2) / r2 * a),
          y: cy - _h * Math.sin((R + r2) / r2 * a),
        })
      }
      draw.lines(points.current)
      if (!hide) {
        draw.Scol = blue.blue9
        draw.circle(0, 0, R)
        draw.Scol = red.red9
        draw.circle(cx, cy, r2)
        draw.line(cx, cy,
          cx - _h * Math.cos((R + r2) / r2 * a),
          cy - _h * Math.sin((R + r2) / r2 * a)
        )
      }
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
      }}
      onResetButton={() => {
        setPlay(true)
        if(Math.abs(angle.current) > maxAngle)
        angle.current = 0
        points.current = []
      }}
      info={`p: ${p}`}
    />
  )
}

export default Epicycloid
