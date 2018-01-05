import React from 'react'

const NoMatch = ({ randomize }) => (
  <div className="px2 py3">
    <div className="mt2 p2 sm-p3 mx-auto bg-white" style={{ maxWidth: 500 }}>
      <strong>Sorry!</strong> We couldn't find that place. Please select another
      county from above or{' '}
      <button
        type="button"
        className="btn p0 red align-baseline"
        onClick={randomize}
      >
        explore a new area
      </button>.
    </div>
  </div>
)

export default NoMatch
