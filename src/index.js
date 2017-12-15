import React from 'react'
import { render } from 'react-dom'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import App from './components/App'

const hash = window.location.hash.slice(1)
const initialGeo = hash || '04000US51'

render(<App initialGeo={initialGeo} />, document.getElementById('root'))
