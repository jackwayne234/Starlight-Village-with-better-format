const directions = {
  up: { row: -1, col: 0, opposite: "down" },
  right: { row: 0, col: 1, opposite: "left" },
  down: { row: 1, col: 0, opposite: "up" },
  left: { row: 0, col: -1, opposite: "right" }
};

const tileConnections = {
  start: ["right"],
  output: ["left"],
  blank: [],
  line: ["left", "right"],
  turn: ["right", "down"],
  tee: ["left", "right", "down"]
};

const layouts = {
  "water-wheel": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("blank", 0, true)]
  ],
  "glow-bridge": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
  ],
  "root-pump": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 0), tile("output", 0, true)]
  ],
  "junction-line": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("turn", 3)],
    [tile("blank", 0, true), tile("line", 0), tile("output", 1, true)]
  ],
  "storm-gauge": [
    [tile("start", 0, true), tile("line", 1), tile("turn", 2)],
    [tile("blank", 0, true), tile("line", 0), tile("line", 0)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("output", 1, true)]
  ],
  "beacon-signal": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 3), tile("output", 0, true)]
  ],
  "water-routing": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 3), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("blank", 0, true)]
  ]
};

const defaultTheme = {
  title: "Repair Circuit",
  instructions: "Rotate the paths to carry light from the start node to every output.",
  objective: "Route the glow.",
  successMessage: "Circuit complete.",
  colors: {
    panel: "#6f5137",
    panelDark: "#3e2d24",
    boardInset: "#4f382b",
    tile: "#2f3e3f",
    tileLit: "#49675b",
    conduit: "#c97945",
    conduitLit: "#ffe08a",
    node: "#d8aa57",
    glow: "#ffe08a",
    accent: "#8fd9f0"
  }
};

const themes = {
  "water-wheel": {
    title: "Water Wheel Circuit",
    instructions: "Rotate the copper paths to carry light from the seed battery to the generator.",
    objective: "Wake the wheel.",
    successMessage: "Generator linked. Water wheel ready."
  },
  "glow-bridge": {
    title: "Glow Bridge Circuit",
    instructions: "Rotate the living paths to wake the bridge plants and relight the crossing.",
    objective: "Wake the bridge.",
    successMessage: "Glow path linked. Bridge is awake."
  },
  "root-pump": {
    title: "Root Pump Channels",
    instructions: "Rotate the living root paths to carry glow from the seed node into the pump.",
    objective: "Wake the roots.",
    successMessage: "Root channels linked. Pump is awake.",
    colors: {
      panel: "#566647",
      panelDark: "#26362e",
      boardInset: "#334336",
      tileLit: "#536f55",
      conduit: "#9bbd74",
      conduitLit: "#d8f49d",
      node: "#b7cf76",
      glow: "#d8f49d",
      accent: "#8fd9f0"
    }
  },
  "junction-line": {
    title: "Junction Line Repair",
    instructions: "Rotate the junction paths to reconnect the line through the switchyard.",
    objective: "Link the line.",
    successMessage: "Junction linked. Current is steady."
  },
  "storm-gauge": {
    title: "Storm Gauge Calibration",
    instructions: "Rotate the signal paths to stabilize the gauge before the next wind surge.",
    objective: "Calibrate gauge.",
    successMessage: "Gauge linked. Storm readings stable."
  },
  "beacon-signal": {
    title: "Beacon Signal Tune",
    instructions: "Rotate the signal paths to carry light back up to the hill beacon.",
    objective: "Tune the beacon.",
    successMessage: "Signal linked. Beacon is shining."
  },
  "water-routing": {
    title: "Stormwater Routing",
    instructions: "Rotate the runoff channels to guide rainwater from the barrels into the storm drain.",
    objective: "Route the runoff.",
    successMessage: "Runoff redirected. Drain is clear.",
    colors: {
      panel: "#536954",
      panelDark: "#243934",
      boardInset: "#324a45",
      tileLit: "#416b69",
      conduit: "#7ebebf",
      conduitLit: "#bdeee6",
      glow: "#bdeee6"
    }
  }
};

export function createRepairPuzzle(themeId) {
  const tiles = cloneTiles(layouts[themeId] ?? layouts["glow-bridge"]);
  const theme = createTheme(themeId);
  const puzzle = {
    themeId,
    title: theme.title,
    theme,
    rows: tiles.length,
    cols: tiles[0].length,
    selected: { row: 0, col: 1 },
    tiles,
    connected: new Set(),
    completed: false
  };
  updateConnections(puzzle);
  return puzzle;
}

function createTheme(themeId) {
  const theme = themes[themeId] ?? {};
  return {
    ...defaultTheme,
    ...theme,
    colors: {
      ...defaultTheme.colors,
      ...(theme.colors ?? {})
    }
  };
}

export function movePuzzleSelection(puzzle, rowDelta, colDelta) {
  puzzle.selected.row = wrap(puzzle.selected.row + rowDelta, puzzle.rows);
  puzzle.selected.col = wrap(puzzle.selected.col + colDelta, puzzle.cols);
}

export function rotateSelectedTile(puzzle) {
  const selected = puzzle.tiles[puzzle.selected.row][puzzle.selected.col];
  if (selected.locked) {
    return false;
  }

  selected.rotation = (selected.rotation + 1) % 4;
  updateConnections(puzzle);
  return true;
}

export function getTileConnections(tile) {
  const exits = tileConnections[tile.type] ?? [];
  return exits.map((direction) => rotateDirection(direction, tile.rotation));
}

function updateConnections(puzzle) {
  const connected = new Set();
  const queue = [{ row: 0, col: 0 }];

  while (queue.length) {
    const current = queue.shift();
    const key = tileKey(current.row, current.col);
    if (connected.has(key)) {
      continue;
    }

    connected.add(key);
    getTileConnections(puzzle.tiles[current.row][current.col]).forEach((direction) => {
      const movement = directions[direction];
      const next = { row: current.row + movement.row, col: current.col + movement.col };
      const nextTile = puzzle.tiles[next.row]?.[next.col];
      if (!nextTile) {
        return;
      }

      if (getTileConnections(nextTile).includes(movement.opposite)) {
        queue.push(next);
      }
    });
  }

  puzzle.connected = connected;
  puzzle.completed = getOutputKeys(puzzle).every((key) => connected.has(key));
  return puzzle.completed;
}

function getOutputKeys(puzzle) {
  const keys = [];
  puzzle.tiles.forEach((row, rowIndex) => {
    row.forEach((tileData, colIndex) => {
      if (tileData.type === "output") {
        keys.push(tileKey(rowIndex, colIndex));
      }
    });
  });
  return keys;
}

function tile(type, rotation = 0, locked = false) {
  return { type, rotation, locked };
}

function cloneTiles(rows) {
  return rows.map((row) => row.map((source) => ({ ...source })));
}

function rotateDirection(direction, rotation) {
  const order = ["up", "right", "down", "left"];
  return order[(order.indexOf(direction) + rotation) % order.length];
}

function wrap(value, max) {
  return (value + max) % max;
}

function tileKey(row, col) {
  return `${row},${col}`;
}
