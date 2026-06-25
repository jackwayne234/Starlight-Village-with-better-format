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
  ],
  "market-lanterns": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("tee", 3), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("output", 0, true)]
  ],
  "rail-signal": [
    [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("tee", 0), tile("output", 0, true)],
    [tile("blank", 0, true), tile("output", 1, true), tile("blank", 0, true)]
  ],
  "archive-lens": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("output", 0, true)]
  ],
  "ch2-glowfen-grove": [
    [tile("start", 0, true), tile("turn", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("line", 1), tile("turn", 2)],
    [tile("blank", 0, true), tile("turn", 3), tile("output", 0, true)]
  ],
  "ch2-lantern-lily-pool": [
    [tile("start", 0, true), tile("tee", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 1), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 0), tile("output", 0, true)]
  ],
  "ch2-bog-bridge": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("turn", 3)],
    [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
  ],
  "ch2-frogsong-lock": [
    [tile("start", 0, true), tile("tee", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("output", 0, true)]
  ],
  "ch2-sunken-signpost": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
  ],
  "ch2-mist-pool": [
    [tile("start", 0, true), tile("turn", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 0), tile("output", 0, true)]
  ],
  "ch2-moss-gate": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 1), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("output", 0, true)]
  ],
  "ch2-old-fen-shrine": [
    [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch2-glowfen-ferry": [
    [tile("start", 0, true), tile("turn", 0), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch2-reedwatch-bank": [
    [tile("start", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("line", 1), tile("output", 0, true)]
  ],
  "ch3-mossline-switchyard": [
    [tile("start", 0, true), tile("line", 1), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("tee", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
  ],
  "ch3-cargo-cart-turntable": [
    [tile("start", 0, true), tile("tee", 1), tile("output", 0, true), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("output", 0, true), tile("blank", 0, true)]
  ],
  "ch3-signal-arm-row": [
    [tile("start", 0, true), tile("tee", 3), tile("line", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 2), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch3-conductor-booth": [
    [tile("start", 0, true), tile("line", 1), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("tee", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("tee", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
  ],
  "ch3-crane-hook-yard": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("line", 1), tile("output", 0, true)]
  ],
  "ch3-sparking-relay-shed": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch3-rain-slick-rails": [
    [tile("start", 0, true), tile("line", 1), tile("tee", 2), tile("output", 0, true)],
    [tile("blank", 0, true), tile("blank", 0, true), tile("tee", 2), tile("output", 0, true)],
    [tile("output", 2, true), tile("line", 1), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch3-tunnel-mouth": [
    [tile("start", 0, true), tile("tee", 3), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch3-clock-signal": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("line", 1), tile("output", 0, true)]
  ],
  "ch3-last-platform": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-stormedge-rise": [
    [tile("start", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 1), tile("turn", 2), tile("blank", 0, true)],
    [tile("output", 2, true), tile("turn", 0), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch4-weather-vane-roof": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-cliff-rope-lift": [
    [tile("start", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("tee", 2), tile("output", 0, true)],
    [tile("output", 2, true), tile("line", 1), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch4-wind-chime-pass": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 2), tile("turn", 2), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("tee", 1), tile("output", 0, true)]
  ],
  "ch4-lightning-rod-field": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("output", 2, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-lookout-post": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("tee", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("line", 1), tile("turn", 1), tile("blank", 0, true)]
  ],
  "ch4-cracked-stair": [
    [tile("start", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-cloud-harvester": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-summit-path": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("output", 2, true), tile("tee", 0), tile("blank", 0, true), tile("blank", 0, true)],
    [tile("blank", 0, true), tile("turn", 2), tile("line", 1), tile("output", 0, true)]
  ],
  "ch4-beacon-approach": [
    [tile("start", 0, true), tile("tee", 1), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("tee", 2), tile("line", 1), tile("output", 0, true)],
    [tile("blank", 0, true), tile("turn", 1), tile("line", 1), tile("output", 0, true)]
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
  },
  "market-lanterns": {
    title: "Market Lantern Grid",
    instructions: "Rotate the brass paths to carry glow from the village battery into every market lantern.",
    objective: "Relight the market.",
    successMessage: "Lantern grid linked. The market is warm again.",
    colors: {
      panel: "#705542",
      panelDark: "#352f2a",
      boardInset: "#4d3d32",
      tileLit: "#665b42",
      conduit: "#c89554",
      conduitLit: "#ffe3a3",
      node: "#d5b46c",
      glow: "#ffe3a3",
      accent: "#9fd6dc"
    }
  },
  "rail-signal": {
    title: "Glassrail Signal",
    instructions: "Rotate the signal paths to reconnect the crossing lights before the supply cart arrives.",
    objective: "Align signals.",
    successMessage: "Crossing signals linked. The rail is safe.",
    colors: {
      panel: "#5b605c",
      panelDark: "#263032",
      boardInset: "#394244",
      tileLit: "#4f6969",
      conduit: "#8ab8bd",
      conduitLit: "#c9f0f0",
      node: "#a9cac9",
      glow: "#c9f0f0",
      accent: "#f0c56b"
    }
  },
  "archive-lens": {
    title: "Archive Lens Array",
    instructions: "Rotate the lens paths to send starlight through every archive prism.",
    objective: "Focus the lens.",
    successMessage: "Lens array focused. The old maps shine clear.",
    colors: {
      panel: "#5d596d",
      panelDark: "#292836",
      boardInset: "#3a3748",
      tileLit: "#54506c",
      conduit: "#a994d6",
      conduitLit: "#e4d6ff",
      node: "#c1a9f0",
      glow: "#e4d6ff",
      accent: "#99d7be"
    }
  }
};

const layoutThemes = {
  "ch2-wetland-approach": {
    title: "Wetland Waymark Signal",
    instructions: "Rotate the wetland paths to wake the first waymark into the reeds.",
    objective: "Raise the waymark.",
    successMessage: "Waymark linked. The wetland route is open."
  },
  "ch2-glowfen-grove": {
    title: "Glowfen Root Channels",
    instructions: "Rotate the root paths to carry glow through the pump without flooding the side channel.",
    objective: "Wake the pump.",
    successMessage: "Root channels linked. Glowfen pump is awake."
  },
  "ch2-lantern-lily-pool": {
    title: "Lantern Lily Crossing",
    instructions: "Rotate the lily paths so glow reaches both crossing markers.",
    objective: "Light the lilies.",
    successMessage: "Lily crossing linked. The pool path is lit."
  },
  "ch2-bog-bridge": {
    title: "Bog Bridge Stones",
    instructions: "Rotate the bridge paths to raise the main stones and carry glow to the far marker.",
    objective: "Raise the bridge.",
    successMessage: "Bog bridge linked. The stones hold steady."
  },
  "ch2-frogsong-lock": {
    title: "Frogsong Lock",
    instructions: "Rotate the reed paths so one shared root line reaches every call stone.",
    objective: "Tune the stones.",
    successMessage: "Call stones linked. The reed gate is listening."
  },
  "ch2-sunken-signpost": {
    title: "Sunken Marker Line",
    instructions: "Rotate the marker paths to lift both route lights without needing an arrow.",
    objective: "Raise the marker.",
    successMessage: "Route marker linked. The wetland path is clear."
  },
  "ch2-mist-pool": {
    title: "Mist Vent Channels",
    instructions: "Rotate the vent paths through the center so warm water reaches both stones.",
    objective: "Thin the mist.",
    successMessage: "Vent channels linked. The mist is low."
  },
  "ch2-moss-gate": {
    title: "Moss Gate Roots",
    instructions: "Rotate the root paths so the shared trunk feeds all three gate sockets.",
    objective: "Open the gate.",
    successMessage: "Gate roots linked. The moss gate opens."
  },
  "ch2-old-fen-shrine": {
    title: "Rain Bowl Signal",
    instructions: "Rotate the signal paths so rain reaches each bowl in the right order.",
    objective: "Align the bowls.",
    successMessage: "Rain bowls linked. The stones ring clear."
  },
  "ch2-glowfen-ferry": {
    title: "Ferry Pulley Line",
    instructions: "Rotate the pulley paths so the dock posts pull the ferry back together.",
    objective: "Dock the ferry.",
    successMessage: "Pulley line linked. The ferry is docked."
  },
  "ch2-reedwatch-bank": {
    title: "Reedwatch Marker Grid",
    instructions: "Rotate the marker paths so the guide light reaches all three reedwatch posts.",
    objective: "Light the exit.",
    successMessage: "Reedwatch markers linked. The road out is lit."
  },
  "ch4-stormedge-rise": stormedgeTheme(
    "Storm Gauge Wind Channels",
    "Rotate the brass wind channels so every gauge needle receives steady storm pressure.",
    "Steady the gauge.",
    "Gauge channels linked. Storm readings hold steady."
  ),
  "ch4-weather-vane-roof": stormedgeTheme(
    "Weather Vane Channel",
    "Rotate the wind channels so the roof vane sends gusts into every safe output.",
    "Align the vane.",
    "Vane channels linked. Wind moves cleanly."
  ),
  "ch4-cliff-rope-lift": stormedgeTheme(
    "Cliff Lift Pulley Line",
    "Rotate the brass paths so the lift ropes share pressure through each pulley output.",
    "Balance the lift.",
    "Pulley channels linked. The basket is steady."
  ),
  "ch4-wind-chime-pass": stormedgeTheme(
    "Wind Chime Sequence",
    "Rotate the wind channels so gusts reach the chimes in a calm route order.",
    "Calm the pass.",
    "Chime channels linked. The gust pattern is clear."
  ),
  "ch4-lightning-rod-field": stormedgeTheme(
    "Lightning Ground Path",
    "Rotate the brass grounding paths so each rod shares one safe charge route.",
    "Ground the rods.",
    "Ground paths linked. The rods are safe."
  ),
  "ch4-lookout-post": stormedgeTheme(
    "Lookout Scope Line",
    "Rotate the instrument paths so the scope catches the beacon line through the rain.",
    "Align the scope.",
    "Scope channels linked. The beacon is visible."
  ),
  "ch4-cracked-stair": stormedgeTheme(
    "Ridge Stair Brace",
    "Rotate the brace channels so each stair lock receives steady ridge pressure.",
    "Brace the stair.",
    "Brace channels linked. The steps hold."
  ),
  "ch4-cloud-harvester": stormedgeTheme(
    "Cloud Harvester Condenser",
    "Rotate the condenser channels so clean rain reaches every ridge basin.",
    "Tune the harvester.",
    "Condenser channels linked. Clean water gathers safely."
  ),
  "ch4-summit-path": stormedgeTheme(
    "Summit Marker Chain",
    "Rotate the marker channels so each high mist lamp catches the route signal.",
    "Mark the summit.",
    "Marker channels linked. The summit path is visible."
  ),
  "ch4-beacon-approach": stormedgeTheme(
    "Beacon Gate Signal",
    "Rotate the final wind channels so the beacon gate receives every route signal.",
    "Open the gate.",
    "Beacon channels linked. The ridge gate opens."
  ),
  "ch3-mossline-switchyard": {
    title: "Mossline Junction Panel",
    instructions: "Rotate the rail paths to carry signal current through the switchyard junction.",
    objective: "Link the junction.",
    successMessage: "Junction signal linked. Current is steady."
  },
  "ch3-cargo-cart-turntable": {
    title: "Turntable Rail Signal",
    instructions: "Rotate the rail paths so the turntable signal lines up with the clear track.",
    objective: "Align the cart.",
    successMessage: "Turntable signal linked. The cart can roll aside."
  },
  "ch3-signal-arm-row": {
    title: "Semaphore Signal Panel",
    instructions: "Rotate the rail paths so every signal arm receives the same clear current.",
    objective: "Set the signals.",
    successMessage: "Semaphore signal linked. The row is safe."
  },
  "ch3-conductor-booth": {
    title: "Conductor Route Board",
    instructions: "Rotate the route paths to light the booth board from switch to switch.",
    objective: "Wake the board.",
    successMessage: "Route board linked. The booth is awake."
  },
  "ch3-crane-hook-yard": {
    title: "Crane Hook Signal",
    instructions: "Rotate the rail paths so the crane hook receives a clean lift signal.",
    objective: "Lift the beam.",
    successMessage: "Crane signal linked. The beam is clear."
  },
  "ch3-sparking-relay-shed": {
    title: "Relay Shed Breaker",
    instructions: "Rotate the breaker paths to calm the wet relay before it throws sparks.",
    objective: "Calm the relay.",
    successMessage: "Relay breaker linked. The sparks settle."
  },
  "ch3-rain-slick-rails": {
    title: "Rail Sanding Route",
    instructions: "Rotate the rail paths so sanding valves feed the slick stretch evenly.",
    objective: "Grip the rails.",
    successMessage: "Sanding route linked. The rails have grip."
  },
  "ch3-tunnel-mouth": {
    title: "Tunnel Lamp Chain",
    instructions: "Rotate the rail paths to carry green lamp current into the tunnel mouth.",
    objective: "Light the tunnel.",
    successMessage: "Tunnel lamps linked. The way in is safe."
  },
  "ch3-clock-signal": {
    title: "Clock Signal Rhythm",
    instructions: "Rotate the signal paths so the station clock and rail lamps beat together.",
    objective: "Sync the clock.",
    successMessage: "Clock signal linked. The rhythm is steady."
  },
  "ch3-last-platform": {
    title: "Last Platform Lamp",
    instructions: "Rotate the rail paths to open the final Mossline road lamp.",
    objective: "Open the road.",
    successMessage: "Platform lamp linked. The road down is open."
  }
};

function stormedgeTheme(title, instructions, objective, successMessage) {
  return {
    title,
    instructions,
    objective,
    successMessage,
    colors: {
      panel: "#425a63",
      panelDark: "#1f3038",
      boardInset: "#253f49",
      tile: "#273c48",
      tileLit: "#3b6870",
      conduit: "#b78442",
      conduitLit: "#ffe08a",
      node: "#d2aa61",
      glow: "#ffe08a",
      accent: "#8edfe0"
    }
  };
}

export function createRepairPuzzle(themeId, layoutId = themeId) {
  const tiles = cloneTiles(layouts[layoutId] ?? layouts[themeId] ?? layouts["glow-bridge"]);
  const theme = createTheme(themeId, layoutId);
  const puzzle = {
    themeId,
    layoutId,
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

function createTheme(themeId, layoutId) {
  const theme = themes[themeId] ?? {};
  const layoutTheme = layoutThemes[layoutId] ?? {};
  return {
    ...defaultTheme,
    ...theme,
    ...layoutTheme,
    colors: {
      ...defaultTheme.colors,
      ...(theme.colors ?? {}),
      ...(layoutTheme.colors ?? {})
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
  const start = findStartTile(puzzle);
  const queue = start ? [start] : [];

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

function findStartTile(puzzle) {
  for (let row = 0; row < puzzle.rows; row += 1) {
    for (let col = 0; col < puzzle.cols; col += 1) {
      if (puzzle.tiles[row][col].type === "start") {
        return { row, col };
      }
    }
  }
  return null;
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
