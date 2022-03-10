import * as React from 'react'
import { useState, useEffect } from 'react'

export default function useOnScreen(ref: React.RefObject<HTMLElement>) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting)
    },
    {
      threshold: 0.5
    }
  )

  useEffect(() => {
    if(ref.current != null){
      observer.observe(ref.current)
      return () => { observer.disconnect() }
    }
  }, [])

  return isIntersecting
}
