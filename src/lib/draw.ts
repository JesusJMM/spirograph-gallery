import Toile from 'toile-canvas'
import { blue, red } from '@radix-ui/colors'
import { Point } from './spirograph'

export function drawSpirographGuides(draw: Toile, r1: number, r2: number, target: Point, c: Point){
  draw.Scol = blue.blue9
  draw.circle(0, 0, r1)
  draw.Scol = red.red9
  draw.circle(c.x, c.y, r2)
  draw.line(c.x, c.y, target.x, target.y)
  draw.circle(target.x, target.y, 3)
}
