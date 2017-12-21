import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import Odometer from './Odometer'
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
    }).filter(m => (cat !== 'all' ? m.catLower === cat : true))

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    const catOptions = ['All', ...CATEGORIES].map(c => ({
      id: c.toLowerCase(),
      display: c,
    }))

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

        <div className="mb3">
          <Odometer value={metrics.median_house_value} />
        </div>

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
          <h2>{name}</h2>
          <div className="mb1">Population: {formatNum(population)}</div>

          {metricsData.map(d => (
            <div key={d.id} className="mb1 py1 border-bottom border-silver">
              <div>{d.name}</div>
              <div className="h3 monospace clearfix">
                <div className="sm-col sm-col-3">{fmt(d.val, d.fmt)}</div>
                <div className="sm-col sm-col-3">
                  {formatPerc(d.state.diff)}
                </div>
                <div className="sm-col sm-col-3">{formatPerc(d.usa.diff)}</div>
                <div className="sm-col sm-col-3">
                  <progress
                    value="0.375"
                    className="progress"
                    style={{ maxWidth: '80%' }}
                  >
                    0.375
                  </progress>
                </div>
              </div>
            </div>
          ))}

          {metricsData.map(d => (
            <div key={d.id} className="mb1 p1 bg-white clearfix">
              <div className="sm-col sm-col-4">{d.name}</div>
              <div className="sm-col sm-col-2">{d.val}</div>
              <div className="sm-col sm-col-2">{formatPerc(d.state.diff)}</div>
              <div className="sm-col sm-col-2">{formatPerc(d.usa.diff)}</div>
              <div className="sm-col sm-col-2">
                <progress
                  value="0.375"
                  className="progress"
                  style={{ maxWidth: '80%' }}
                >
                  0.375
                </progress>
              </div>
            </div>
          ))}

          <table>
            <thead className="left-align">
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Compared with State</th>
                <th>Compared with USA</th>
              </tr>
            </thead>
            <tbody>
              {metricsData.map(d => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.val}</td>
                  <td>{d.state.diff}</td>
                  <td>{d.usa.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    )
  }
}

export default App
