import React, { Component } from 'react'

import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import Modal from './Modal'
import PlaceMap from './PlaceMap'
import Tables from './Tables'
import { sample } from '../util/misc'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cat: props.initCat,
      geoid: props.initGeo,
      data: [],
      modal: false,
    }
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/data.json`)
      .then(response => response.json())
      .then(data => this.setState({ data }, this.onDataLoaded))
  }

  onDataLoaded = () => {
    const { geoid } = this.state
    if (!geoid) this.randomize()
  }

  handleFilterClick = cat => () => {
    this.setState({ cat }, this.updateUrl)
  }

  handleSelect = geo => {
    if (!geo) return
    this.setState({ geoid: geo.value }, this.updateUrl)
  }

  randomize = () => {
    const { data } = this.state
    if (!data.length) return

    const rando = sample(data.filter(d => d.sumlevel === '050'))
    this.setState({ geoid: rando.geoid }, this.updateUrl)
  }

  toggleModal = () => {
    this.setState(prev => ({ modal: !prev.modal }))
  }

  updateUrl = () => {
    const { cat, geoid } = this.state
    window.location.hash = `g=${geoid}&c=${cat}`
  }

  render() {
    const { cat, data, geoid, modal } = this.state

    const datum = data.find(d => d.geoid === geoid)
    const isLoading = data.length === 0

    const selectOptions = data
      .filter(d => d.sumlevel === '050')
      .map(d => ({ label: d.name, value: d.geoid }))

    return (
      <div>
        <Header
          geoid={geoid}
          geoOptions={selectOptions}
          onChange={this.handleSelect}
          randomize={this.randomize}
          toggleModal={this.toggleModal}
        />

        <PlaceMap datum={datum} />

        {isLoading ? (
          <Loading />
        ) : (
          <Tables
            cat={cat}
            data={data}
            geoid={geoid}
            randomize={this.randomize}
            updateCat={this.handleFilterClick}
          />
        )}

        {datum && <Footer />}

        <Modal open={modal} toggle={this.toggleModal} />
      </div>
    )
  }
}

export default App
