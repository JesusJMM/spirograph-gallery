import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import globalStyles from './globalStyles';
import Loader from './components/loader';

const Gallery = React.lazy(() => import('./pages/gallery'))
const Editor = React.lazy(() => import('./pages/editor'))

const App = () => {
  globalStyles()
  return (
    <Routes>
      <Route path='/' element={
        <React.Suspense fallback={<Loader r1={100} r2={100 / 2.4}k={100/2.4 - 12} />}>
          <Gallery />
        </React.Suspense>
      } />
      <Route path='/editor' element={
        <React.Suspense fallback={<Loader  r1={100} r2={100 / 2.4}k={100/2.4 - 12}/>}>
          <Editor />
        </React.Suspense>
      } />
    </Routes>
  )

}

export default App
