import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Logo from './Logo'

const Header = ({ geoid, geoOptions, onChange, randomize, toggleModal }) => (
  <div>
    <header className="clearfix px2 py1 sm-px3 bg-red white">
      <div className="left logo-holder">
        <Logo />
        <a href="/" className="btn px0 py1 h4 sm-h3">
          Better Know Your Area
        </a>
      </div>
      <div className="right xs-hide">
        <button
          type="button"
          className="btn px0 py1 h5 regular"
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
            options={geoOptions}
            onChange={onChange}
            value={geoid}
          />
        </div>
      </div>
      <div className="right py1">
        <button type="button" className="btn p0 h6 regular" onClick={randomize}>
          <img
            src={`${process.env.PUBLIC_URL}/img/refresh.svg`}
            alt="randomize"
            width="16"
            height="16"
            className="align-tb"
          />
          <span className="ml05 xs-hide">Randomize</span>
        </button>
      </div>
    </nav>
  </div>
)

export default Header
