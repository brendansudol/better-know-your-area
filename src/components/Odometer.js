import Od from 'odometer'
import React, { PureComponent } from 'react'

class Odometer extends PureComponent {
  componentDidMount() {
    const { value, zeroStart, ...options } = this.props

    this.od = new Od({
      el: this.node,
      value: zeroStart ? 0 : value,
      ...options,
    })

    if (zeroStart) this.od.update(value)
  }

  componentDidUpdate() {
    this.od.update(this.props.value)
  }

  render() {
    return <div ref={node => (this.node = node)} />
  }
}

export default Odometer
