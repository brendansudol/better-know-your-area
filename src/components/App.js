import React, { Component } from 'react'

class App extends Component {
  state = { data: [] }

  componentDidMount() {
    fetch('/data/acs.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  render() {
    const { geoid } = this.props
    const { data } = this.state

    if (data.length === 0) return <p>Loading...</p>

    const datum = data.find(d => d.GEOID === geoid)

    return (
      <div>
        <pre>{JSON.stringify(datum, null, 2)}</pre>
      </div>
    )
  }
}

export default App
