const pattern_bg = [
  [1,1,1],
  [1,1,1],
  [1,1,1],
];

const pattern_01 = [
  [1],
];

const pattern_02 = [
  [1, 0],
  [0, 1],
];

const layer_bg = {
  character: [' ', '.', ',', ';', ' ', "'", '"', '´', ' '],
  //character: '•',
  pattern: pattern_bg,
  method: 'random',
};

const layer_01 = {
  character: 'X',
  pattern: pattern_01,
  xOffset: 1,
  yOffset: 1,
};

const layer_02 = {
  character: '#',
  pattern: pattern_02,
};

// const w = 3;//39;
// const h = 3;//32;

// let noise = [];

// for(let y = 0; y < h; y++) {
//   let row = [];
//   for(let x = 0; x < w; x++) {
//     const randomSymbol = Math.floor(Math.random() * symbols.length);
//     row.push(symbols[randomSymbol]);
//   }
//   noise.push(row);
// }

function getCharacter(character, method) {
  if(typeof character === 'string') return character;
  if(Array.isArray(character)) {
    if(method === 'random') {
      const randomIndex = Math.floor(Math.random() * character.length);
      return character[randomIndex];
    }
    else {
      return character[0]
    }
  }
}

function applyLayer(render, layer) {
  for(let y = 0; y < layer.pattern.length; y++) {
    for(let x = 0; x < layer.pattern[y].length; x++) {
      if(layer.pattern[y][x]) render[y][x] = getCharacter(layer.character, layer.method || false);
    }
  }
  return render;
}

function renderLayer(layer) {
  let render = [];
  for(let y = 0; y < layer.pattern.length; y++) {
    render.push([]);
    for(let x = 0; x < layer.pattern[y].length; x++) {
      render[y].push(getCharacter(layer.character, layer.method || false));
    }
  }
  return render;
}

function renderComposition(composition) {
  let first_layer = structuredClone(composition[0]);
  let render = renderLayer(first_layer);
  for(let l = 1; l < composition.length; l++) { // skip index 0 (bg layer)
    const current_layer = composition[l];
    render = applyLayer(render, current_layer);
  }
  printRender(render);
}

function printRender(render) {
  render.forEach(y => {
    y.forEach(x => {
      process.stdout.write(x);
    })
    process.stdout.write('\n');
  });
}

let composition = [
  layer_bg,
  layer_02,
  layer_01,
];

renderComposition(composition);
