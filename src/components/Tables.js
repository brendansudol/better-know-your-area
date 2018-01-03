import React from 'react'

import GeoError from './GeoError'
import NumDiff from './NumDiff'
import Progress from './Progress'

import { METRICS, catOptions } from '../util/metrics'
import { computeDiff, stateCodes } from '../util/misc'
import { fmt } from '../util/formats'

const Tables = ({ cat, data, geoid, updateCat }) => {
  const datum = data.find(d => d.geoid === geoid)

  if (!datum) return <GeoError />

  const { related, metrics } = datum

  const state = data.find(d => d.geoid === related.state)
  const usa = data.find(d => d.geoid === '01000US')

  const stateAbbrev = stateCodes[state.name]

  const dataByMetrics = METRICS.map(m => {
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

  const dataByCat = catOptions
    .slice(1)
    .map(cat => ({
      cat,
      metrics: dataByMetrics.filter(d => d.catLower === cat.id),
    }))
    .filter(d => (cat !== 'all' ? d.cat.id === cat : true))

  return (
    <div className="px2 py3 sm-px3">
      <div className="mb2">
        {catOptions.map(c => (
          <button
            key={c.id}
            type="button"
            className={`mb1 mr1 px1 py05 btn h6 regular ${
              cat === c.id ? 'btn-primary bg-black' : 'btn-outline'
            }`}
            onClick={updateCat(c.id)}
          >
            {c.display}
          </button>
        ))}
      </div>

      <div className="mb2">
        {dataByCat.map(({ cat, metrics }) => (
          <div key={cat.id}>
            <h3>{cat.display}</h3>

            <div className="overflow-auto">
              <table className="mb3 bg-white table-light border rounded">
                <thead className="left-align h5 nowrap">
                  <tr>
                    <th className="w-p-40" style={{ minWidth: 240 }}>
                      Metric
                    </th>
                    <th className="w-p-15">Value</th>
                    <th className="w-p-15">vs. {stateAbbrev || 'State'}</th>
                    <th className="w-p-15">vs. USA</th>
                    <th className="w-p-15" style={{ minWidth: 100 }}>
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map(m => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td className="monospace">{fmt(m.val, m.fmt)}</td>
                      <td>
                        <NumDiff x={m.state.diff} />
                      </td>
                      <td>
                        <NumDiff x={m.usa.diff} />
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
    </div>
  )
}

export default Tables
