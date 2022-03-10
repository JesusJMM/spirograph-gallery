import { StyledCanvas } from './GalleryCanvas'
import * as React from 'react'
import Toile, { toileLoopSubscribe, toileLoopUnsubcribe} from 'toile-canvas'

interface canvasProps {
  width: number
  height: number
  drawFunction: (toile: Toile, loop: boolean) => () => void
  loop?: boolean
  canvasID: string
}
const Canvas: React.FC<canvasProps> = ({width, height, loop = true, canvasID, drawFunction}) => {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const toile = React.useRef<Toile | null>(null)
  React.useEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    if (ctx) {
      toile.current = new Toile(ctx, width, height)
    }
  }, [])

  React.useEffect(() => {
    if (toile.current) {
      const draw = drawFunction(toile.current, loop)
      if (loop) {
        toileLoopSubscribe(draw, canvasID)
      } else {
        toileLoopUnsubcribe(canvasID)
        draw()
      }
    }
  }, )
  return (
    <StyledCanvas ref={canvas}/>
  )
}

export default Canvas
