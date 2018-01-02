import React from 'react'

import { formatPerc } from '../util/formats'

const color = x => (x === 0 ? 'black' : x < 0 ? 'red' : 'green')

const NumDiff = ({ x }) => (
  <span className={`monospace ${color(x)}`}>
    {x === 0 ? 'Same' : formatPerc(x)}
  </span>
)

export default NumDiff
