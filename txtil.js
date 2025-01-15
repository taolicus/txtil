const pattern_bg = [
  [1,1,1],
  [1,1,1],
  [1,1,1],
]

const pattern_01 = [
  [1]
]

const pattern_02 = [
  [1, 0],
  [0, 1]
]

const layer_bg = {
  character: [' ', '.', ',', ';', ' ', '\'', '"', '´', ' '],
  pattern: pattern_bg
}

const layer_01 = {
  character: 'X',
  pattern: pattern_01,
  xOffset: 2,
  yOffset: 2
}

const layer_02 = {
  character: '#',
  pattern: pattern_02,
}

const w = 3//39;
const h = 3//32;

let noise = [];

for(let y = 0; y < h; y++) {
  let row = [];
  for(let x = 0; x < w; x++) {
    const randomSymbol = Math.floor(Math.random() * symbols.length);
    row.push(symbols[randomSymbol]);
  }
  noise.push(row);
}

function collapseLayers(bgLayer, fgLayer) {
  let collapsedLayers = structuredClone(bgLayer)
  for(let y = 0; y < collapsedLayers.length; y++) {
    if(fgLayer[y]) {
      for(let x = 0; x < collapsedLayers[y].length; x++) {
        if(fgLayer[y][x]) collapsedLayers[y][x] = fgLayer[y][x]
      }
    }
  }
  return collapsedLayers
}

function renderLayer(layer) {
  layer.forEach(y => {
    y.forEach(x => {
      process.stdout.write(x);
    })
    process.stdout.write('\n');
  });
}

function renderComposition(composition) {
  let render = structuredClone(composition[0])
  for(let l = 1; l < composition.length; l++) { // skip index 0 (bg layer)
    render = collapseLayers(render, composition[l])
  }
  renderLayer(render)
}

let composition = [
  layer_bg
  pattern_01,
  pattern_02,
]

renderComposition(composition)
