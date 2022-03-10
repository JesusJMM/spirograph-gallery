import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { toileLoop } from 'toile-canvas'
import { BrowserRouter } from 'react-router-dom'

toileLoop()
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
