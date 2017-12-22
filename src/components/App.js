import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import Map from './Map'

import { CATEGORIES, METRICS } from '../util/metrics'
import { computeDiff } from '../util/misc'
import { fmt, formatNum, formatPerc } from '../util/formats'

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
    fetch(`${process.env.PUBLIC_URL}/data/data.json`)
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

    if (data.length === 0) return <Loading />
    if (!datum) return <p>BAD GEOID (TODO: BETTER UI)</p>

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    const catOptions = ['All', ...CATEGORIES].map(c => ({
      id: c.toLowerCase(),
      display: c,
    }))

    const { name, population, related, metrics } = datum
    const state = data.find(d => d.geoid === related.state)
    const usa = data.find(d => d.geoid === '01000US')

    const metricsData = METRICS.map(m => {
      const catLower = m.category.toLowerCase()
      const val = metrics[m.id]
      const valState = state.metrics[m.id]
      const valUsa = usa.metrics[m.id]

      return {
        ...m,
        catLower,
        val,
        state: { val: valState, diff: computeDiff(val, valState) },
        usa: { val: valUsa, diff: computeDiff(val, valUsa) },
      }
    })

    const metricsByCat = catOptions
      .slice(1)
      .map(cat => ({
        cat,
        metrics: metricsData.filter(m => m.catLower === cat.id),
      }))
      .filter(d => (cat !== 'all' ? d.cat.id === cat : true))

    return (
      <div className="p2">
        <Header />

        <div className="mb3 h5" style={{ maxWidth: 400 }}>
          <VirtualizedSelect
            options={selectOptions}
            onChange={this.handleSelect}
            value={geoid}
          />
        </div>

        <h2>{name}</h2>
        <div className="mb3">Population: {formatNum(population)}</div>

        <div className="mb2">
          {catOptions.map(c => (
            <button
              key={c.id}
              type="button"
              className={`mb1 mr1 btn btn-outline h5 ${
                cat === c.id ? 'bold' : 'regular'
              }`}
              onClick={this.handleFilterClick(c.id)}
            >
              {c.display}
            </button>
          ))}
        </div>

        {false && <Map data={data} geoid={geoid} />}

        <div className="mb2">
          {metricsByCat.map(({ cat, metrics }) => (
            <div key={cat.id} className="mb2">
              <h3>{cat.display}</h3>

              <table className="col-12 bg-white">
                <thead className="left-align">
                  <tr>
                    <th className="col-4" />
                    <th className="col-2">Metric</th>
                    <th className="col-2">vs. State</th>
                    <th className="col-2">vs. USA</th>
                    <th className="col-2">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map(m => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td className="monospace">{fmt(m.val, m.fmt)}</td>
                      <td className="monospace">{formatPerc(m.state.diff)}</td>
                      <td className="monospace">{formatPerc(m.usa.diff)}</td>
                      <td>
                        <progress
                          value="0.375"
                          className="progress"
                          style={{ maxWidth: '80%' }}
                        >
                          0.375
                        </progress>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    )
  }
}

export default App
