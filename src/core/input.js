export function createInput() {
  const keys = new Set();
  const pressed = new Set();
  const gameCodes = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space", "Enter", "KeyA", "KeyD", "KeyE", "KeyR"]);

  window.addEventListener("keydown", (event) => {
    if (gameCodes.has(event.code)) {
      event.preventDefault();
    }

    keys.add(event.code);
    pressed.add(event.code);
  });

  window.addEventListener("keyup", (event) => {
    if (gameCodes.has(event.code)) {
      event.preventDefault();
    }

    keys.delete(event.code);
  });

  return {
    isDown(code) {
      return keys.has(code);
    },
    consume(code) {
      const hadPress = pressed.has(code);
      pressed.delete(code);
      return hadPress;
    },
    afterFrame() {
      pressed.clear();
    }
  };
}
