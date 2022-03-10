import { useEffect, useState } from "react";

export default function useScreenSize(){
  const [ x, setX ] = useState(0)
  const [ y, setY ] = useState(0)
  useEffect(() => {
    const callback = () => {
      setX(window.innerWidth)
      setY(window.innerHeight)
    }
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])
  return {x, y}
}
