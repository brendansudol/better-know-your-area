import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Map from './Map'

import { METRICS } from '../util/metrics'
import { comparePlaces } from '../util/misc'
import { formatNum, formatPerc } from '../util/formats'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      geoid: props.initialGeo,
      selectGeo: null,
    }
  }

  componentDidMount() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleSelect = selectGeo => {
    this.setState({ selectGeo })
  }

  render() {
    const { initialGeo } = this.props
    const { data, selectGeo } = this.state

    if (data.length === 0) return <p>Loading...</p>

    console.log(selectGeo)
    const geoid = selectGeo ? selectGeo.value : initialGeo

    const datum = data.find(d => d.geoid === geoid)
    const usa = data.find(d => d.geoid === '01000US')
    const comp = comparePlaces(datum, usa)

    const { name, population, metrics } = datum
    const { diffs } = comp

    const metricsData = METRICS.map(m => ({
      ...m,
      value: metrics[m.id],
      diff: diffs[m.id],
    }))

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    return (
      <div className="p2">
        <div className="h5" style={{ maxWidth: 400 }}>
          <VirtualizedSelect
            options={selectOptions}
            onChange={this.handleSelect}
            value={selectGeo}
          />
        </div>

        <div className="mb2">
          <h2>{name}</h2>
          <div className="mb1">Population: {formatNum(population)}</div>
          {metricsData.map(d => (
            <div key={d.id}>
              {d.name}: {d.value}{' '}
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
