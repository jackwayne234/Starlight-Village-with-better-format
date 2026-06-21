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
  "glow-bridge": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
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

const titles = {
  "glow-bridge": "Glow Bridge Circuit",
  "junction-line": "Junction Line Repair",
  "storm-gauge": "Storm Gauge Calibration",
  "beacon-signal": "Beacon Signal Tune",
  "water-routing": "Stormwater Routing"
};

export function createRepairPuzzle(themeId) {
  const tiles = cloneTiles(layouts[themeId] ?? layouts["glow-bridge"]);
  const puzzle = {
    themeId,
    title: titles[themeId] ?? "Repair Circuit",
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
