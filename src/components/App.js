import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Loading from './Loading'
import Map from './Map'

import { METRICS } from '../util/metrics'
import { computeDiff } from '../util/misc'
import { formatNum, formatPerc } from '../util/formats'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      selected: props.initialGeo,
    }
  }

  componentDidMount() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleSelect = geo => {
    this.setState({ selected: geo.value })
  }

  render() {
    const { data, selected: geoid } = this.state
    const datum = data.find(d => d.geoid === geoid)

    if (data.length === 0) return <Loading />
    if (!datum) return <p>BAD GEOID (TODO: BETTER UI)</p>

    const { name, population, related, metrics } = datum
    const state = data.find(d => d.geoid === related.state)
    const usa = data.find(d => d.geoid === '01000US')

    const metricsData = METRICS.map(m => {
      const val = metrics[m.id]
      const valState = state.metrics[m.id]
      const valUsa = usa.metrics[m.id]

      return {
        ...m,
        val,
        state: { val: valState, diff: computeDiff(val, valState) },
        usa: { val: valUsa, diff: computeDiff(val, valUsa) },
      }
    })

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    return (
      <div className="p2">
        <div className="h5" style={{ maxWidth: 400 }}>
          <VirtualizedSelect
            options={selectOptions}
            onChange={this.handleSelect}
            value={geoid}
          />
        </div>

        <div className="mb2">
          <h2>{name}</h2>
          <div className="mb1">Population: {formatNum(population)}</div>
          {metricsData.map(d => (
            <div key={d.id}>
              {d.name}: {d.val}{' '}
              <span className={`${d.usa.diff < 0 ? 'red' : 'green'}`}>
                {formatPerc(d.usa.diff)}
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
