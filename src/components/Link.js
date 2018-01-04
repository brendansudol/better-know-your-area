import React from 'react'

const externalAttribs = {
  rel: 'noopener noreferrer',
  target: '_blank',
}

const Link = ({ children, external = false, ...rest }) => {
  let attribs = { ...rest }
  if (external) Object.assign(attribs, externalAttribs)

  return <a {...attribs}>{children}</a>
}

export default Link
