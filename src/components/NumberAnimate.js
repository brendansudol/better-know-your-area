import React from 'react'
import { Motion, spring } from 'react-motion'

import { fmt } from '../util/formats'

const NumberAnimate = ({ value, format = ',.2f' }) => (
  <Motion defaultStyle={{ x: 0 }} style={{ x: spring(value) }}>
    {i => <span>{fmt(i.x, format)}</span>}
  </Motion>
)

export default NumberAnimate
