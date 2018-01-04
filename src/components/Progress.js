import React from 'react'

const Progress = ({ tooltip, width }) => (
  <div
    className="mt1 bg-silver col-11 cursor-help numeric hint--bottom-left hint--no-animate"
    aria-label={tooltip}
  >
    <div
      className="bg-black width-animate"
      style={{ height: 8, width: `${width}%` }}
    />
  </div>
)

export default Progress
