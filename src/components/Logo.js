import React, { Component } from 'react'

import { easeCubicOut } from 'd3-ease'
import { select, selectAll } from 'd3-selection'
import 'd3-transition'

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const contains = (arr, el) => arr.indexOf(el) > -1
const sample = arr => arr[rand(0, arr.length - 1)]
const complete = (transition, callback) => {
  let n = 0
  transition.on('start', () => ++n).on('end', () => {
    if (!--n) callback.apply(this, arguments)
  })
}

class Logo extends Component {
  componentDidMount() {
    let rects = selectAll('.usa-logo rect')
    let rectsArr = [...rects._groups[0]]
    let [data, active] = [[], []]

    rects.each(function() {
      var r = select(this)
      data.push({ x: +r.attr('x'), y: +r.attr('y') })
    })

    rects.data(data).on('mouseover', function() {
      flip(this)
    })

    setInterval(() => flip(sample(rectsArr)), 2000)

    function flip(a) {
      if (contains(active, a)) return

      active.push(a)
      let b = sample(rectsArr.filter(r => !contains(active, r)))
      active.push(b)

      selectAll([a, b])
        .data([b.__data__, a.__data__])
        .transition()
        .ease(easeCubicOut)
        .duration(1000)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .call(complete, () => {
          active = active.filter(r => r !== a && r !== b)
        })
    }
  }

  render() {
    return (
      <div className="inline-block align-middle mr1">
        <svg
          className="usa-logo"
          viewBox="0 0 178 118"
          width="44.5"
          height="29.5"
        >
          <rect x="0" y="20" width="8" height="8" />
          <rect x="0" y="30" width="8" height="8" />
          <rect x="0" y="40" width="8" height="8" />
          <rect x="0" y="50" width="8" height="8" />
          <rect x="0" y="60" width="8" height="8" />
          <rect x="10" y="0" width="8" height="8" />
          <rect x="10" y="10" width="8" height="8" />
          <rect x="10" y="20" width="8" height="8" />
          <rect x="10" y="30" width="8" height="8" />
          <rect x="10" y="40" width="8" height="8" />
          <rect x="10" y="50" width="8" height="8" />
          <rect x="10" y="60" width="8" height="8" />
          <rect x="10" y="70" width="8" height="8" />
          <rect x="20" y="0" width="8" height="8" />
          <rect x="20" y="10" width="8" height="8" />
          <rect x="20" y="20" width="8" height="8" />
          <rect x="20" y="30" width="8" height="8" />
          <rect x="20" y="40" width="8" height="8" />
          <rect x="20" y="50" width="8" height="8" />
          <rect x="20" y="60" width="8" height="8" />
          <rect x="20" y="70" width="8" height="8" />
          <rect x="30" y="0" width="8" height="8" />
          <rect x="30" y="10" width="8" height="8" />
          <rect x="30" y="20" width="8" height="8" />
          <rect x="30" y="30" width="8" height="8" />
          <rect x="30" y="40" width="8" height="8" />
          <rect x="30" y="50" width="8" height="8" />
          <rect x="30" y="60" width="8" height="8" />
          <rect x="30" y="70" width="8" height="8" />
          <rect x="30" y="80" width="8" height="8" />
          <rect x="40" y="10" width="8" height="8" />
          <rect x="40" y="20" width="8" height="8" />
          <rect x="40" y="30" width="8" height="8" />
          <rect x="40" y="40" width="8" height="8" />
          <rect x="40" y="50" width="8" height="8" />
          <rect x="40" y="60" width="8" height="8" />
          <rect x="40" y="70" width="8" height="8" />
          <rect x="40" y="80" width="8" height="8" />
          <rect x="50" y="10" width="8" height="8" />
          <rect x="50" y="20" width="8" height="8" />
          <rect x="50" y="30" width="8" height="8" />
          <rect x="50" y="40" width="8" height="8" />
          <rect x="50" y="50" width="8" height="8" />
          <rect x="50" y="60" width="8" height="8" />
          <rect x="50" y="70" width="8" height="8" />
          <rect x="50" y="80" width="8" height="8" />
          <rect x="60" y="10" width="8" height="8" />
          <rect x="60" y="20" width="8" height="8" />
          <rect x="60" y="30" width="8" height="8" />
          <rect x="60" y="40" width="8" height="8" />
          <rect x="60" y="50" width="8" height="8" />
          <rect x="60" y="60" width="8" height="8" />
          <rect x="60" y="70" width="8" height="8" />
          <rect x="60" y="80" width="8" height="8" />
          <rect x="60" y="90" width="8" height="8" />
          <rect x="70" y="10" width="8" height="8" />
          <rect x="70" y="20" width="8" height="8" />
          <rect x="70" y="30" width="8" height="8" />
          <rect x="70" y="40" width="8" height="8" />
          <rect x="70" y="50" width="8" height="8" />
          <rect x="70" y="60" width="8" height="8" />
          <rect x="70" y="70" width="8" height="8" />
          <rect x="70" y="80" width="8" height="8" />
          <rect x="70" y="90" width="8" height="8" />
          <rect x="80" y="10" width="8" height="8" />
          <rect x="80" y="20" width="8" height="8" />
          <rect x="80" y="30" width="8" height="8" />
          <rect x="80" y="40" width="8" height="8" />
          <rect x="80" y="50" width="8" height="8" />
          <rect x="80" y="60" width="8" height="8" />
          <rect x="80" y="70" width="8" height="8" />
          <rect x="80" y="80" width="8" height="8" />
          <rect x="80" y="90" width="8" height="8" />
          <rect x="80" y="100" width="8" height="8" />
          <rect x="80" y="110" width="8" height="8" />
          <rect x="90" y="10" width="8" height="8" />
          <rect x="90" y="20" width="8" height="8" />
          <rect x="90" y="30" width="8" height="8" />
          <rect x="90" y="40" width="8" height="8" />
          <rect x="90" y="50" width="8" height="8" />
          <rect x="90" y="60" width="8" height="8" />
          <rect x="90" y="70" width="8" height="8" />
          <rect x="90" y="80" width="8" height="8" />
          <rect x="90" y="90" width="8" height="8" />
          <rect x="90" y="100" width="8" height="8" />
          <rect x="100" y="10" width="8" height="8" />
          <rect x="100" y="20" width="8" height="8" />
          <rect x="100" y="30" width="8" height="8" />
          <rect x="100" y="40" width="8" height="8" />
          <rect x="100" y="50" width="8" height="8" />
          <rect x="100" y="60" width="8" height="8" />
          <rect x="100" y="70" width="8" height="8" />
          <rect x="100" y="80" width="8" height="8" />
          <rect x="100" y="90" width="8" height="8" />
          <rect x="110" y="20" width="8" height="8" />
          <rect x="110" y="30" width="8" height="8" />
          <rect x="110" y="40" width="8" height="8" />
          <rect x="110" y="50" width="8" height="8" />
          <rect x="110" y="60" width="8" height="8" />
          <rect x="110" y="70" width="8" height="8" />
          <rect x="110" y="80" width="8" height="8" />
          <rect x="110" y="90" width="8" height="8" />
          <rect x="120" y="20" width="8" height="8" />
          <rect x="120" y="40" width="8" height="8" />
          <rect x="120" y="50" width="8" height="8" />
          <rect x="120" y="60" width="8" height="8" />
          <rect x="120" y="70" width="8" height="8" />
          <rect x="120" y="80" width="8" height="8" />
          <rect x="130" y="30" width="8" height="8" />
          <rect x="130" y="40" width="8" height="8" />
          <rect x="130" y="50" width="8" height="8" />
          <rect x="130" y="60" width="8" height="8" />
          <rect x="130" y="70" width="8" height="8" />
          <rect x="130" y="80" width="8" height="8" />
          <rect x="140" y="40" width="8" height="8" />
          <rect x="140" y="50" width="8" height="8" />
          <rect x="140" y="60" width="8" height="8" />
          <rect x="140" y="70" width="8" height="8" />
          <rect x="140" y="80" width="8" height="8" />
          <rect x="140" y="90" width="8" height="8" />
          <rect x="150" y="30" width="8" height="8" />
          <rect x="150" y="40" width="8" height="8" />
          <rect x="150" y="50" width="8" height="8" />
          <rect x="150" y="60" width="8" height="8" />
          <rect x="150" y="70" width="8" height="8" />
          <rect x="150" y="90" width="8" height="8" />
          <rect x="150" y="100" width="8" height="8" />
          <rect x="160" y="20" width="8" height="8" />
          <rect x="160" y="30" width="8" height="8" />
          <rect x="160" y="40" width="8" height="8" />
          <rect x="160" y="50" width="8" height="8" />
          <rect x="160" y="60" width="8" height="8" />
          <rect x="170" y="10" width="8" height="8" />
          <rect x="170" y="20" width="8" height="8" />
        </svg>
      </div>
    )
  }
}

export default Logo
