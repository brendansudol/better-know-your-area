import { METRICS } from './metrics'

export const pick = (obj, props) =>
  props.reduce((a, e) => {
    a[e] = obj[e]
    return a
  }, {})

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

export const toObj = arrOfObjs => Object.assign({}, ...arrOfObjs)

const computeDiff = (val1, val2) => {
  if (!isNumeric(val1) || !isNumeric(val2)) return
  return val1 / val2 - 1
}

export const comparePlaces = (d1, d2) => {
  const diffs = toObj(
    METRICS.map(({ id }) => ({
      [id]: computeDiff(d1.metrics[id], d2.metrics[id]),
    }))
  )

  return {
    name: `${d1.name} vs. ${d2.name}`,
    diffs,
  }
}

export const MAPBOX_KEY =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
