import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

const Header = ({ geoid, geoOptions, onChange }) => (
  <header className="clearfix white bg-black">
    <div className="sm-col">
      <a href="/" className="btn p2 h5 caps">
        Better know your area
      </a>
    </div>
    <div className="sm-col-right black">
      <div className="mb1 sm-m0 px2 py1 h6" style={{ width: 250 }}>
        <VirtualizedSelect
          options={geoOptions}
          onChange={onChange}
          value={geoid}
        />
      </div>
    </div>
  </header>
)

export default Header
