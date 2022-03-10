import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { styled } from '../../stitchesTheme'
import Toile, { toileLoopSubscribe, toileLoopUnsubcribe } from 'toile-canvas'
import { blue, red, violet } from '@radix-ui/colors'

const StyledCanvas = styled('canvas', {
  border: 'solid 1px $slate8',
  borderRadius: '$sm',
})

interface canvasEditorProps {
  width: number,
  height: number,
  k: number,
  r1: number,
  r2: number,
  play: boolean,
  hide: boolean,
  cycloidType: 'epi' | 'hypo'
  speed?: number
  reset?: boolean
}

function getMaxLaps(r1: number, r2: number){
  let laps = 0
  let l = 0
  const proportion = r1 / r2
  const decimalProptn = proportion % 1
  for (let i = 0; i < 100; i ++){
    l += decimalProptn
    laps = i
    if(l === l - (l % 1)){
      break
    }
  }
  return laps
}

const Canvas: React.FC<canvasEditorProps> = ({
  width,
  height,
  k,
  r1,
  r2,
  play,
  hide,
  speed = 1,
  cycloidType,
  reset = false
}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const toile = useRef<Toile | null>(null)
  const points = useRef<{x: number, y: number}[]>([])
  const angle = useRef(0)
  const maxLaps = getMaxLaps(r1,r2)
  const type = cycloidType === 'hypo' ? 1 : -1

  // initialize
  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if(ctx){
      toile.current = new Toile(ctx, width, height)
    }
  })
  // resize the canvas
  useEffect(() => {
    console.log(toile.current)
    if(toile.current){
      toile.current.resize(width, height)
    }
  }, [width, height])
  // create the _draw Function
  function _draw(draw: Toile, justCalculate = false){
    // set up part
    draw.origin(draw.width/ 2, draw.height / 2)  
    draw.Fcol = ''
    draw.Swidth = 2
    draw.ctx.lineCap = 'round'
    draw.ctx.lineJoin = 'round'
    // return a function that will executed in each frame
    return () => {
      draw.clear()
      if(play){
        angle.current += 0.04
      }
      const a = angle.current
      const cx = (r1 - r2 * type) * Math.cos(a)
      const cy = (r1 - r2 * type) * Math.sin(a)
      let point = {x: 0, y: 0}
      if(cycloidType === 'epi'){
        point.x = cx - k * Math.cos((r1 + r2) / r2 * a)
        point.y = cy - k * Math.sin((r1 + r2) / r2 * a)
      }else{
        point.x = cx + k * Math.cos(a * (1 - r1 / r2)) 
        point.y = cy + k * Math.sin(a * (1 - r1 / r2))
      }
      if(Math.round(a / (Math.PI * 4) ) <= maxLaps){
        points.current.push({...point})
      }

      if(justCalculate) return
      // draw stuff
      draw.Scol=violet.violet9
      draw.lines(points.current)
      if(!hide){
        draw.Scol = blue.blue9
        draw.circle(0, 0, r1)
        draw.Scol = red.red9
        draw.circle(cx, cy, r2)
        draw.line(cx, cy, point.x, point.y)
        draw.circle(point.x, point.y, 3)
      }
    }
  }
  // reset
  useEffect(() => {
    angle.current = 0
    points.current = []
  }, [r1, r2, k, cycloidType, reset])

  useEffect(() => {
    const key = 'canvasEditor'
    if(toile.current){
      const frame = _draw(toile.current)
      const calculationFrame = _draw(toile.current, true)
      if(play){
        toileLoopSubscribe(() => {
          for(let i = 0; i < speed ? speed: 0; i++){
            calculationFrame()
          }
          frame()
        }, key)
      }else {
        toileLoopUnsubcribe(key)
        frame()
      }
    }
  })
  return(
    <StyledCanvas ref={canvas}/>
  )
}
export default Canvas
