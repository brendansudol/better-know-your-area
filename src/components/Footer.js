import React from 'react'

import Link from './Link'

const Footer = () => (
  <footer className="mb3 px2 sm-px3 h6">
    <Link href="/" className="mr2 black">
      Better Know Your Area
    </Link>
    <Link external href="https://twitter.com/brensudol" className="mr2 black">
      @brensudol
    </Link>
    <Link
      external
      href="https://github.com/brendansudol/better-know-your-area"
      className="mr2 black"
    >
      code
    </Link>
  </footer>
)

export default Footer
