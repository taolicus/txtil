const pattern_bg = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const pattern_01 = [
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
];

const pattern_02 = [
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1],
];

const layer_bg = {
  character: [' ',
    '.',
    ',',
    ';',
    ' ',
    "'",
    '"',
    '´',
    ' '],
  pattern: pattern_bg,
  method: 'random',
  w: 36,
  h: 39,
};

const layer_01 = {
  character: '+',
  pattern: pattern_01,
  xOffset: 6,
  yOffset: 6,
};

const layer_02 = {
  character: '#',
  pattern: pattern_02,
  xOffset: 14,
  yOffset: 14,
};

function getCharacter(character, method) {
  if (Array.isArray(character)) {
    if (method === 'random') {
      const randomIndex = Math.floor(Math.random() * character.length);
      return character[randomIndex];
    } else {
      return character[0]
    }
  } else {
    return character
  }
}

function applyLayer(render, layer) {
  const xOffset = layer.xOffset || 0;
  const yOffset = layer.yOffset || 0;
  const h = layer.h || layer.pattern.length
  for (let y = 0; y < h; y++) {
    const w = layer.w || layer.pattern[y].length
    for (let x = 0; x < w; x++) {
      const targetX = x + xOffset;
      const targetY = y + yOffset;
      if (layer.pattern[y][x]) render[targetY][targetX] = getCharacter(layer.character, layer.method || false);
    }
  }
  return render;
}

function renderLayer(layer) {
  let render = [];
  const h = layer.h || layer.pattern.length;
  for (let y = 0; y < h; y++) {
    render.push([]);
    const w = layer.w || layer.pattern[y].length;
    for (let x = 0; x < w; x++) {
      render[y].push(getCharacter(layer.character, layer.method || false));
    }
  }
  return render;
}

function renderComposition(composition) {
  let first_layer = structuredClone(composition[0]);
  let render = renderLayer(first_layer);
  for (let l = 1; l < composition.length; l++) {
    // skip index 0 (bg layer)
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
  layer_01,
  layer_02,
];

renderComposition(composition);