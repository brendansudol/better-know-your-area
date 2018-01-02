import React, { Component } from 'react'

import { easeCubicOut } from 'd3-ease'
import { select, selectAll } from 'd3-selection'
import 'd3-transition'

import Usa from './Usa2'
import { contains, sample } from '../util/misc'

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

    setInterval(() => {
      flip(sample(rectsArr))
      flip(sample(rectsArr))
    }, 2000)

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

    function complete(transition, callback) {
      let n = 0
      transition.on('start', () => ++n).on('end', () => {
        if (!--n) callback.apply(this, arguments)
      })
    }
  }

  render() {
    return (
      <div className="inline-block mr1">
        <Usa />
      </div>
    )
  }
}

export default Logo
