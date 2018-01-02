import extent from 'geojson-extent'
import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react'

import { MAPBOX_KEY } from '../util/misc'

mapboxgl.accessToken = MAPBOX_KEY

class PlaceMap extends Component {
  state = { lng: -96, lat: 37, zoom: 2, loaded: false }

  componentDidMount() {
    const { datum } = this.props
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.mapHolder,
      style: 'mapbox://styles/mapbox/streets-v9',
      interactive: false,
      center: [lng, lat],
      zoom,
    })

    map.scrollZoom.disable()

    map.on('load', () => {
      if (datum) this.initPlace(datum.geom)
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

  componentWillReceiveProps(newProps) {
    const { datum } = newProps
    if (!datum) return

    const { loaded } = this.state
    const { geoid, geom } = datum
    if (!loaded) return this.initPlace(geom)
    if (geoid !== this.props.geoid) return this.highlightPlace(geom)
  }

  initPlace = geom => {
    const { map } = this._mapbox

    map.addSource('place', {
      type: 'geojson',
      data: geom,
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

    map.fitBounds(extent(geom), { padding: 24 })

    this.setState({ loaded: true })
  }

  highlightPlace = geom => {
    const { map } = this._mapbox
    map.getSource('place').setData(geom)
    map.fitBounds(extent(geom), { padding: 24 })
  }

  render() {
    const { datum } = this.props

    return (
      <div className="relative">
        <div
          id="map"
          style={{ height: 300, width: '100%' }}
          ref={div => (this.mapHolder = div)}
        />
        {datum && (
          <div
            className="absolute"
            style={{
              maxWidth: 300,
              top: '50%',
              transform: 'translate(0, -50%)',
            }}
          >
            <span
              className="ml2 sm-ml3 h1 bold bg-white multiline-padded-text"
              style={{ lineHeight: '1.3', padding: '4px 8px' }}
            >
              {datum.name}
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default PlaceMap
