import React, { Component } from 'react'

import Map from './Map'

import { comparePlaces } from '../util'
import { formatNum, formatPerc } from '../util/formats'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      geoid: props.initialGeo,
      search: props.initialGeo,
    }
  }

  componentDidMount() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ geoid: this.state.search })
  }

  render() {
    const { data, geoid, search } = this.state

    if (data.length === 0) return <p>Loading...</p>

    const datum = data.find(d => d.geoid === geoid)
    const usa = data.find(d => d.geoid === '01000US')
    const comp = comparePlaces(datum, usa)

    const { name, population, metrics } = datum
    const { diffs } = comp

    const metricsData = Object.entries(metrics).map(([metric, value]) => ({
      metric,
      value,
      diff: diffs[metric],
    }))

    return (
      <div className="p2">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={search} />
          <button type="submit">Submit</button>
        </form>

        <div className="mb2">
          <h2>{name}</h2>
          <div className="mb1">Population: {formatNum(population)}</div>
          {metricsData.map(d => (
            <div key={d.metric}>
              {d.metric}: {d.value}{' '}
              <span className={`${d.diff < 0 ? 'red' : 'green'}`}>
                {formatPerc(d.diff)}
              </span>
            </div>
          ))}
        </div>

        <Map data={data} geoid={geoid} />
      </div>
    )
  }
}

export default App
