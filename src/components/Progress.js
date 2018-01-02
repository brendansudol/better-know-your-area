import React from 'react'

const Progress = ({ w }) => (
  <div
    className="mt1 bg-silver col-11 hint--bottom-left hint--no-animate"
    aria-label={`width: ${w}%`}
  >
    <div
      className="bg-black width-animate"
      style={{ height: 8, width: `${w}%` }}
    />
  </div>
)

export default Progress
