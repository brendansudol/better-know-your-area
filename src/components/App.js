import React, { Component } from 'react'

import Code from './Code'
import Map from './Map'

import { comparePlaces, pick } from '../util'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      geoid: props.initialGeo,
      search: props.initialGeo,
    }
  }

  componentDidMount() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ geoid: this.state.search })
  }

  render() {
    const { data, geoid, search } = this.state

    if (data.length === 0) return <p>Loading...</p>

    const datum = data.find(d => d.geoid === geoid)
    const usa = data.find(d => d.geoid === '01000US')

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={search} />
          <button type="submit">Submit</button>
        </form>
        <Code data={pick(datum, ['geoid', 'name', 'level', 'metrics'])} />
        <Code data={comparePlaces(datum, usa)} />
        <Map data={data} geoid={geoid} />
      </div>
    )
  }
}

export default App
