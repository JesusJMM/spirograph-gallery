export function spirografhLaps(r1: number, r2: number){
  const z = r1 / r2
  const y = Math.floor(z)
  if(y === z){
    return 1
  }
  return Math.floor(1 / ((r1 / r2) - y))
}
export function spirografhLapsFromP(r1:number, p: number){
  const z = r1 / p
  const y = Math.floor(p)
  if( y === p){
    return 1
  }
  return Math.round(1 / ((r1 / z) - y))
}
