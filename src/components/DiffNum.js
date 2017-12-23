import React from 'react'

import { formatPerc } from '../util/formats'

const DiffNum = ({ x }) => (
  <div className={`monospace ${x < 0 ? 'red' : 'green'}`}>
    {x < 0 ? '↓' : '↑'} {formatPerc(x)}
  </div>
)

export default DiffNum
