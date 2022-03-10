export const min = (...elms: number[]) => 
  elms.reduce((el, min) => el < min? el: min, elms[0])
