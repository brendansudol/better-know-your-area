import extent from 'geojson-extent'
import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react'

import { MAPBOX_KEY } from '../util'

mapboxgl.accessToken = MAPBOX_KEY

class Map extends Component {
  state = { lng: -96, lat: 37, zoom: 2 }

  componentDidMount() {
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.mapHolder,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
    })

    map.on('load', () => {
      fetch('/data/geom.json')
        .then(response => response.json())
        .then(data => this.addToMap(data))
    })

    map.on('move', () => {
      const { lng, lat } = map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      })
    })

    this._mapbox = { map }
  }

  addToMap = data => {
    const { geoid } = this.props
    const { map } = this._mapbox

    const datum = data.find(d => d.geoid === geoid)
    const bounds = extent(datum.geom)

    map.addSource('place', {
      type: 'geojson',
      data: datum.geom,
    })

    map.addLayer({
      id: 'place',
      type: 'fill',
      source: 'place',
      paint: {
        'fill-color': '#333',
        'fill-opacity': 0.4,
      },
    })

    map.fitBounds(bounds, { padding: 20 })
  }

  render() {
    const { lng, lat, zoom } = this.state

    return (
      <div>
        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        <div
          id="map"
          style={{ height: 300, width: 400 }}
          ref={div => (this.mapHolder = div)}
        />
      </div>
    )
  }
}

export default Map
