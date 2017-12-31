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
      <div className="inline-block mr1">
        <svg
          className="align-middle usa-logo"
          viewBox="0 0 216 160"
          width="43.2"
          height="32"
        >
          <rect x="0" y="20" width="16" height="16" />
          <rect x="120" y="120" width="16" height="16" />
          <rect x="80" y="100" width="16" height="16" />
          <rect x="20" y="100" width="16" height="16" />
          <rect x="0" y="80" width="16" height="16" />
          <rect x="40" y="80" width="16" height="16" />
          <rect x="180" y="60" width="16" height="16" />
          <rect x="160" y="100" width="16" height="16" />
          <rect x="180" y="80" width="16" height="16" />
          <rect x="160" y="140" width="16" height="16" />
          <rect x="140" y="120" width="16" height="16" />
          <rect x="80" y="60" width="16" height="16" />
          <rect x="20" y="40" width="16" height="16" />
          <rect x="100" y="40" width="16" height="16" />
          <rect x="100" y="60" width="16" height="16" />
          <rect x="60" y="100" width="16" height="16" />
          <rect x="100" y="80" width="16" height="16" />
          <rect x="80" y="120" width="16" height="16" />
          <rect x="200" y="40" width="16" height="16" />
          <rect x="160" y="80" width="16" height="16" />
          <rect x="200" y="0" width="16" height="16" />
          <rect x="140" y="40" width="16" height="16" />
          <rect x="80" y="40" width="16" height="16" />
          <rect x="80" y="80" width="16" height="16" />
          <rect x="100" y="120" width="16" height="16" />
          <rect x="40" y="40" width="16" height="16" />
          <rect x="120" y="100" width="16" height="16" />
          <rect x="60" y="40" width="16" height="16" />
          <rect x="60" y="80" width="16" height="16" />
          <rect x="200" y="20" width="16" height="16" />
          <rect x="160" y="60" width="16" height="16" />
          <rect x="40" y="100" width="16" height="16" />
          <rect x="20" y="60" width="16" height="16" />
          <rect x="160" y="40" width="16" height="16" />
          <rect x="120" y="60" width="16" height="16" />
          <rect x="60" y="120" width="16" height="16" />
          <rect x="0" y="60" width="16" height="16" />
          <rect x="140" y="60" width="16" height="16" />
          <rect x="180" y="40" width="16" height="16" />
          <rect x="140" y="100" width="16" height="16" />
          <rect x="60" y="60" width="16" height="16" />
          <rect x="100" y="100" width="16" height="16" />
          <rect x="60" y="140" width="16" height="16" />
          <rect x="20" y="80" width="16" height="16" />
          <rect x="140" y="80" width="16" height="16" />
          <rect x="180" y="20" width="16" height="16" />
          <rect x="0" y="40" width="16" height="16" />
          <rect x="120" y="40" width="16" height="16" />
          <rect x="120" y="80" width="16" height="16" />
          <rect x="40" y="60" width="16" height="16" />
        </svg>
      </div>
    )
  }
}

export default Logo
