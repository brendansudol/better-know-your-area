import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Link from './Link'
import Logo from './Logo'
import { tweetUrl } from '../util/misc'

const Header = ({
  datum,
  geoid,
  geoOptions,
  onChange,
  randomize,
  toggleModal,
}) => (
  <div>
    <header className="clearfix px2 py1 sm-px3 bg-red white">
      <div className="left logo-holder">
        <Logo />
        <a href="/" className="btn px0 py1 h5 sm-h3">
          Better Know Your Area
        </a>
      </div>
      <div className="right">
        <button
          type="button"
          className="btn px0 py1 h6 sm-h5 regular"
          onClick={toggleModal}
        >
          About
        </button>
      </div>
    </header>
    <nav className="clearfix px2 sm-px3">
      <div className="left">
        <div className="h6 select-holder" style={{ padding: '6px 0' }}>
          <VirtualizedSelect
            placeholder="Select a county..."
            options={geoOptions}
            onChange={onChange}
            value={geoid}
          />
        </div>
      </div>
      <div className="right py1">
        <button
          type="button"
          className="m0 sm-mr2 btn p0 h6 regular align-tt"
          onClick={randomize}
        >
          Randomize
        </button>
        <Link
          external
          href={tweetUrl(datum)}
          className="btn p0 h6 regular align-tt xs-hide"
        >
          Share
        </Link>
      </div>
    </nav>
  </div>
)

export default Header
