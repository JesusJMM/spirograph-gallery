export interface Point {
  x: number,
  y: number,
}
export interface spirographData {
  circle: Point,
  target: Point,
}
export function epicycloid(angle: number, r1: number, r2: number): number {
  return (r1 + r2) / r2 * angle 
}
export function hypocycloid(angle: number, r1: number, r2: number): number {
  return angle * (1 - r1 / r2)
}
export function spirograph(angle: number, r1: number, r2: number, k: number, type: 'epi' | 'hypo'): spirographData{
  const cSign = type == 'epi' ? -1: 1
  const c = {
    x: (r1 - r2 * cSign) * Math.cos(angle),
    y: (r1 - r2 * cSign) * Math.sin(angle),
  }
  const f = type === 'epi' ? epicycloid : hypocycloid
  const point = {
    x: c.x - k * Math.cos(f(angle, r1, r2)),
    y: c.y - k * Math.sin(f(angle, r1, r2))
  }
  return {circle: c, target: point}
}
