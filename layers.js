import { canvas, layer } from './txtil.js'

const layers = [
  canvas(36, 20),
  layer('tr.txt', 1, 1),
  layer('sq.txt', 8, 14),
  layer('tr-sm.txt', 11, 5),
  layer('sq-sm.txt', 4, 18),
  layer('cr-sm.txt', 14, 18),
  layer('cr.txt', 5, 7),
]

export default layers