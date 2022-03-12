export interface point {
  x: number,
  y: number,
}
export interface spirographData {
  cx: number,
  cy: number,
  target: point,
}
export function epicycloid(angle: number, r1: number, r2: number, k: number): spirographData {
  const cx = (r1 - r2) * Math.cos(angle)
  const cy = (r1 - r2) * Math.sin(angle)
  const point: point = {
    x: cx - k * Math.cos((r1 + r2) / r2 * angle),
    y: cy - k * Math.sin((r1 + r2) / r2 * angle)
  }
  return {cx, cy, target: point}
}
export function hypocycloid(angle: number, r1: number, r2: number, k: number): spirographData {
  const cx = (r1 - r2) * Math.cos(angle)
  const cy = (r1 - r2) * Math.sin(angle)
  const point: point = {
    x: cx - k * Math.cos(angle * (1 - r1 / r2)),
    y: cy - k * Math.sin(angle * (1 - r1 / r2))
  }
  return {cx, cy, target: point}
}
