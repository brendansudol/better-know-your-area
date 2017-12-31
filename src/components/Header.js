import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

const Header = ({ geoid, geoOptions, onChange, toggleModal }) => (
  <div>
    <header className="clearfix px2 py1 sm-px3 bg-red white">
      <div className="left">
        <a href="/" className="btn px0 py1 h3">
          Better Know Your Area
        </a>
      </div>
      <div className="right">
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
        <div className="h6" style={{ width: 250, padding: '6px 0' }}>
          <VirtualizedSelect
            options={geoOptions}
            onChange={onChange}
            value={geoid}
          />
        </div>
      </div>
      <div className="right py1">
        <button type="button" className="btn p0 h6 regular">
          Randomize
        </button>
      </div>
    </nav>
  </div>
)

export default Header
