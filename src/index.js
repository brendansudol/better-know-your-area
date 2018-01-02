import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import { getParams } from './util/misc'
import { isCat } from './util/metrics'

import './styles'

const { g: geo, c: cat } = getParams(window.location.hash)
const initGeo = geo || '05000US51059'
const initCat = isCat(cat) ? cat.toLowerCase() : 'all'

render(
  <App initGeo={initGeo} initCat={initCat} />,
  document.getElementById('root')
)
