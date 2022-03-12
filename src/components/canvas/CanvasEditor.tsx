import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { styled } from '../../stitchesTheme'
import Toile, { toileLoopSubscribe, toileLoopUnsubcribe } from 'toile-canvas'
import { blue, red, violet } from '@radix-ui/colors'
import { spirograph, Point } from '../../lib/spirograph'

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

function drawSpirographGuides(draw: Toile, r1: number, r2: number, target: Point, c: Point){
  draw.Scol = blue.blue9
  draw.circle(0, 0, r1)
  draw.Scol = red.red9
  draw.circle(c.x, c.y, r2)
  draw.line(c.x, c.y, target.x, target.y)
  draw.circle(target.x, target.y, 3)
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
      if(play){
        angle.current += 0.04
      }
      const currentLaps = Math.round(angle.current / (Math.PI * 4) )
      const {circle, target} = spirograph(angle.current, r1, r2, k, cycloidType)
      if(currentLaps <= maxLaps){
        points.current.push(target)
      }
      if(justCalculate) return
      // draw
      draw.clear()
      draw.Scol=violet.violet9
      draw.lines(points.current)
      if(!hide){
        drawSpirographGuides(draw, r1, r2, target, circle)
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
