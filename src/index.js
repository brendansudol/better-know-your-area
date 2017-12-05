import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

const hash = window.location.hash.slice(1)
const initialGeo = hash || '05000US51059'

render(<App geoid={initialGeo} />, document.getElementById('root'))
