import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

const hash = window.location.hash.slice(1)
const initialGeo = hash || '04000US51'

render(<App initialGeo={initialGeo} />, document.getElementById('root'))
