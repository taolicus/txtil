import fs from 'node:fs'

function txtToMap(txt) {
  return txt.split('\n').map(line => line.split(''))
}

function apply(map1, map2, offsetY = 0, offsetX = 0) {
  let render = structuredClone(map1)
  for(let y = 0; y < map2.length; y++) {
    if(map1[y + offsetY]) {
      for(let x = 0; x < map2[y].length; x++) {
        if(map1[y + offsetY][x + offsetX] && map2[y][x] !== ' ') render[y + offsetY][x + offsetX] = map2[y][x]
      }
    }
  }
  return render
}

function canvas(w, h) {
  let canvas = []
  for(let y = 0; y < h; y++) {
    let row = []
    for(let x = 0;x < w; x++) {
      row.push(' ')
    }
    canvas.push(row)
  }
  return {
    map: canvas
  }
}

function render(composition) {
  let render = composition[0].map
  for (let l = 1; l < composition.length; l++) {
    const layer = composition[l]
    const offsetY = 'offsetY' in layer ? layer.offsetY : 0
    const offsetX = 'offsetX' in layer ? layer.offsetX : 0
    render = apply(
      render, 
      layer.map, 
      offsetY,
      offsetX,
    )
  }
  return render.map(row => row.join('')).join('\n')
}

function layer(path, offsetY = null, offsetX = null) {
  const txt = fs.readFileSync(`./txt/${path}`, 'utf8')
  let map = txtToMap(txt)
  let layer = { map }
  if(offsetY) layer.offsetY = offsetY
  if(offsetX) layer.offsetX = offsetX
  return layer
}

const layers = [
  canvas(36, 39),
  layer('tr.txt'),
  layer('cr.txt', 4, 6),
  layer('sq.txt', 8, 10),
]

const r = render(layers)
console.log(r)
