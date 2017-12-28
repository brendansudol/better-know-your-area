import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Footer from './Footer'
import Loading from './Loading'
import PlaceMap from './PlaceMap'
import Tables from './Tables'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      cat: props.initCat,
      geoid: props.initGeo,
    }
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/sample.json`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleFilterClick = cat => () => {
    this.setState({ cat }, this.updateUrl)
  }

  handleSelect = geo => {
    if (!geo) return
    this.setState({ geoid: geo.value }, this.updateUrl)
  }

  updateUrl = () => {
    const { cat, geoid } = this.state
    window.location.hash = `g=${geoid}&c=${cat}`
  }

  render() {
    const { data, cat, geoid } = this.state

    const datum = data.find(d => d.geoid === geoid)
    const isLoading = data.length === 0

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    // if (!datum) return <p>BAD GEOID (TODO: BETTER UI)</p>

    return (
      <div>
        <header className="clearfix white bg-black">
          <div className="sm-col">
            <a href="/" className="btn p2 h5 caps">
              Better know your area
            </a>
          </div>
          <div className="sm-col-right black">
            <div className="mb1 sm-m0 px2 py1 h6" style={{ width: 250 }}>
              <VirtualizedSelect
                options={selectOptions}
                onChange={this.handleSelect}
                value={geoid}
              />
            </div>
          </div>
        </header>

        <PlaceMap datum={datum} />

        {isLoading ? (
          <Loading />
        ) : (
          <Tables
            cat={cat}
            data={data}
            geoid={geoid}
            updateCat={this.handleFilterClick}
          />
        )}

        {!isLoading && <Footer />}
      </div>
    )
  }
}

export default App
