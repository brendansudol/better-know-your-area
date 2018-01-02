import { format } from 'd3-format'

import { isNumeric } from './misc'

export const formatNum = format(',.0f')

export const fmt = (val, spec = ',.2f') =>
  isNumeric(val) ? format(spec)(val) : '--'

export const formatDec = (x, n = 2) => fmt(x, `,.${n}f`)

export const formatPerc = (x, n = 0) => fmt(x, `+.${n}%`)

export const formatDiff = x =>
  isNumeric(x) ? `${format('+.0%')(x)} ${x < 0 ? '↓' : '↑'}` : '--'
