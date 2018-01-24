import React from 'react'

import Link from './Link'
import NoMatch from './NoMatch'
import NumDiff from './NumDiff'
import Progress from './Progress'
import { fmt, formatNum as num } from '../util/formats'
import { METRICS, catOptions } from '../util/metrics'
import { COUNTY_CT, censusUrl, computeDiff, stateCodes } from '../util/misc'

const Tables = ({ cat, data, geoid, randomize, updateCat }) => {
  const datum = data.find(d => d.geoid === geoid)

  if (!datum) return <NoMatch randomize={randomize} />

  const { related, metrics } = datum

  const state = data.find(d => d.geoid === related.state)
  const usa = data.find(d => d.geoid === '01000US')

  const stateAbbrev = stateCodes[state.name]

  const dataByMetrics = METRICS.map(m => {
    const catLower = m.category.toLowerCase()
    const { value: val, rank } = metrics[m.id]
    const ptile = +fmt(rank / COUNTY_CT * 100, '.1f')
    const tooltip = `${num(rank)} of ${num(COUNTY_CT)} (${num(ptile)}%)`
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
            className={`mb1 mr1 px1 py05 btn h6 regular btn-primary ${
              cat === c.id ? 'bg-black' : 'bg-white black'
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
              <table className="mb3 bg-white table-striped border rounded">
                <thead className="left-align h5 nowrap">
                  <tr>
                    <th className="w-40" style={{ minWidth: 240 }}>
                      Metric
                    </th>
                    <th className="w-15 right-align pr3">Value</th>
                    <th className="w-10 right-align pr3">
                      vs. {stateAbbrev || 'State'}
                    </th>
                    <th className="w-10 border-right border-silver right-align pr3">
                      vs. USA
                    </th>
                    <th className="w-20 pl3" style={{ minWidth: 100 }}>
                      County Rank
                    </th>
                  </tr>
                </thead>
                <tbody className="h5 sm-h4">
                  {metrics.map(m => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td className="monospace right-align pr3">
                        {fmt(m.val, m.fmt)}
                      </td>
                      <td className="right-align pr3">
                        <NumDiff x={m.state.diff} />
                      </td>
                      <td className="border-right border-silver right-align pr3">
                        <NumDiff x={m.usa.diff} />
                      </td>
                      <td className="pl3">
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
        <Link href={censusUrl(geoid, '02')} className="mr1 black bold" external>
          Social
        </Link>
        <Link href={censusUrl(geoid, '04')} className="mr1 black bold" external>
          Housing
        </Link>
        <Link href={censusUrl(geoid, '03')} className="mr1 black bold" external>
          Economics
        </Link>
        <Link href={censusUrl(geoid, '05')} className="black bold" external>
          Demographics
        </Link>
      </div>
    </div>
  )
}

export default Tables
