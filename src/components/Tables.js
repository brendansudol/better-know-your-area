import React from 'react'

import GeoError from './GeoError'
import Link from './Link'
import NumDiff from './NumDiff'
import Progress from './Progress'

import { METRICS, catOptions } from '../util/metrics'
import { COUNTY_CT, censusUrl, computeDiff, stateCodes } from '../util/misc'
import { fmt, formatNum as num } from '../util/formats'

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
    const ptile = +fmt(rank / COUNTY_CT * 100, '.1f')
    const tooltip = `${num(rank)} / ${num(COUNTY_CT)} (${num(ptile)}%)`
    const valState = state.metrics[m.id]
    const valUsa = usa.metrics[m.id]

    return {
      ...m,
      catLower,
      val,
      rank,
      ptile,
      tooltip,
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

      <div>
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
                        <Progress tooltip={m.tooltip} width={m.ptile} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="pb3 h5 border-bottom border-silver">
        <div>More data from US Census Bureau:</div>
        <Link external href={censusUrl(geoid, '02')} className="mr1 black bold">
          Social
        </Link>
        <Link external href={censusUrl(geoid, '04')} className="mr1 black bold">
          Housing
        </Link>
        <Link external href={censusUrl(geoid, '03')} className="mr1 black bold">
          Economics
        </Link>
        <Link external href={censusUrl(geoid, '05')} className="black bold">
          Demographics
        </Link>
      </div>
    </div>
  )
}

export default Tables
