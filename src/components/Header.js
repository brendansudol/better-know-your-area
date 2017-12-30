import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Emoji from './Emoji'

const Header = ({ geoid, geoOptions, onChange }) => (
  <header className="clearfix white bg-black">
    <div className="sm-col">
      <a href="/" className="btn p2 sm-px3 h5 caps">
        <Emoji label="USA" symbol={'🇺🇸'} />
        <Emoji label="Neighborhood" symbol={'🏡'} />
        <Emoji label="Data" symbol={'📊'} />
        <span className="ml1">Better know your area</span>
      </a>
    </div>
    <div className="sm-col-right black">
      <div className="mb2 sm-m0 px2 sm-px3 sm-py1 h6" style={{ width: 250 }}>
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
