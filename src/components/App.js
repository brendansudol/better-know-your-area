import React, { Component } from 'react'

import Map from './Map'

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
    fetch('/data/acs.json')
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

    const datum = data.find(d => d.GEOID === geoid)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={search} />
          <button type="submit">Submit</button>
        </form>
        <pre>{JSON.stringify(datum, null, 2)}</pre>
        <Map geoid={geoid} />
      </div>
    )
  }
}

export default App
