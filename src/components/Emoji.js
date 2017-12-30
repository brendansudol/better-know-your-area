import React from 'react'

const Emoji = ({ label, symbol }) => (
  <span role="img" aria-label={label}>
    {symbol}
  </span>
)

export default Emoji
