import React from 'react'

const Progress = ({ tooltip, width }) => (
  <div
    className="mt1 bg-silver col-11 cursor-help is-numeric hint--bottom-left hint--no-animate"
    aria-label={tooltip}
  >
    <div
      className="bg-black"
      style={{ height: 8, width: `${width}%`, transition: 'width 0.5s ease' }}
    />
  </div>
)

export default Progress
