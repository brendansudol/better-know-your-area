import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'

import DiffNum from './DiffNum'
import Footer from './Footer'
import Loading from './Loading'
import Progress from './Progress'
import Map from './Map'

import { CATEGORIES, METRICS } from '../util/metrics'
import { computeDiff } from '../util/misc'
import { fmt } from '../util/formats'

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

    const { name, related, metrics } = datum
    const state = data.find(d => d.geoid === related.state)
    const usa = data.find(d => d.geoid === '01000US')

    const metricsData = METRICS.map(m => {
      const catLower = m.category.toLowerCase()
      const { value: val, rank } = metrics[m.id]
      const valState = state.metrics[m.id]
      const valUsa = usa.metrics[m.id]

      return {
        ...m,
        catLower,
        val,
        rank,
        ptile: +fmt(rank / 3142 * 100, '.1f'),
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

        {true && <Map data={data} geoid={geoid} name={name} />}

        <div className="px2 py3">
          <div className="mb2">
            {catOptions.map(c => (
              <button
                key={c.id}
                type="button"
                className={`mb1 mr1 px1 py05 btn h6 regular ${
                  cat === c.id ? 'btn-primary bg-black' : 'btn-outline'
                }`}
                onClick={this.handleFilterClick(c.id)}
              >
                {c.display}
              </button>
            ))}
          </div>

          <div className="mb2">
            {metricsByCat.map(({ cat, metrics }) => (
              <div key={cat.id} className="mb2">
                <h3>{cat.display}</h3>

                <div className="overflow-auto">
                  <table className="bg-white table-light border">
                    <thead className="left-align">
                      <tr>
                        <th className="w-p-40">Metric</th>
                        <th className="w-p-15">Value</th>
                        <th className="w-p-15">vs. State</th>
                        <th className="w-p-15">vs. USA</th>
                        <th className="w-p-15">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map(m => (
                        <tr key={m.id}>
                          <td>{m.name}</td>
                          <td className="monospace">{fmt(m.val, m.fmt)}</td>
                          <td>
                            <DiffNum x={m.state.diff} />
                          </td>
                          <td>
                            <DiffNum x={m.usa.diff} />
                          </td>
                          <td>
                            <Progress w={m.ptile} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default App
