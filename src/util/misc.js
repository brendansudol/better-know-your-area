import { METRICS } from './metrics'

export const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const contains = (arr, el) => arr.indexOf(el) > -1

export const sample = arr => arr[rand(0, arr.length - 1)]

export const pick = (obj, props) =>
  props.reduce((a, e) => {
    a[e] = obj[e]
    return a
  }, {})

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

export const toObj = arrOfObjs => Object.assign({}, ...arrOfObjs)

export const computeDiff = (val1, val2) => {
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

export const getParams = str =>
  str
    .slice(1)
    .split('&')
    .filter(d => d.length)
    .reduce((params, hash) => {
      const [key, val] = hash.split('=')
      const valGood = val === undefined ? null : decodeURIComponent(val)
      return Object.assign(params, { [key]: valGood })
    }, {})

export const MAPBOX_KEY =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

export const COUNTY_CT = 3142

export const censusUrl = (geoid, dp) => {
  const base = 'https://factfinder.census.gov/bkmk/table/1.0/en/ACS/15_5YR'
  const geo = `0500000US${geoid.split('US')[1]}`

  return `${base}/DP${dp}/${geo}`
}

export const stateCodes = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
}
