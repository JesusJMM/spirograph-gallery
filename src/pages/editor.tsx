import { styled } from '../stitchesTheme'
import { useState } from 'react'
import useScreenSize from '../hooks/useScreenSize'
import { min } from '../utils/arrays'
import Sidebar from '../components/editor/Sidebar'
import CanvasControls from '../components/editor/canvasControls'

const Layout = styled('div', {
  display: 'flex',
  flexDirection: 'column-reverse',
  paddingBlock: '$6',
  '& .sticky': {
    backgroundColor: '$slate2',
    position: 'sticky',
    top: 0,
    borderBottom: 'solid 1px $slate8'
  },
  '@md':{
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '350px 2fr',
  }
})

const Editor = () => {
  const { x, y } = useScreenSize()
  const maxCanvasSize = 400
  console.log(x, y)
  const canvasSize = min(x - 32, y - 32, maxCanvasSize)

  const [r1, setR1] = useState(50)
  const [r2, setR2] = useState(25)
  const [k, setK] = useState(50)
  const [p, setP] = useState('1.0')
  const [speed, setSpeed] = useState(1)
  const [cycloidType, setCycloidType] = useState<'epi' | 'hypo'>('epi')
  const [reset, setReset] = useState(false)

  const [play, setPlay] = useState(true)
  const [hide, setHide] = useState(false)

  return (
    <Layout>
      <Sidebar 
        {...{ r1, r2, k, p, speed, cycloidType }}
        onChangeR1={([r]) => {
          setR1(r)
          setR2(r / parseFloat(p))
        }}
        onChangeK={([k]) => setK(k)}
        onChangeR2={([r]) => {
          setK(r)
          setR2(r)
          setP((r / r1).toString())
        }}
        onChangeP={(e) => {
          const _p = parseFloat(e.target.value)
          setP(e.target.value)
          setR2(r1 / _p)
        }}
        onChangeSpeed={(e) => setSpeed(parseInt(e.target.value))}
        onChangeCycloidType={(e) => setCycloidType(e)}
        />
      <div className="sticky">
        <CanvasControls
          r1={r1}
          r2={r2}
          k={k}
          canvasSize={canvasSize}
          speed={speed}
          cycloidType={cycloidType}
          reset={reset}
          play={play}
          hide={hide}
          onPlay={() => setPlay(!play)}
          onHide={() => setHide(!hide)}
          onReset={() => setReset(!reset)}
        />
      </div>
    </Layout>
  )
}

export default Editor
