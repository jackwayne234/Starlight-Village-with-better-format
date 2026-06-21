import { createStarlightVillageScene } from "./chapterOne/starlightVillage.js";

export const sceneIds = {
  starlightVillage: "chapter-one/starlight-village"
};

const sceneFactories = {
  [sceneIds.starlightVillage]: createStarlightVillageScene
};

export function createScene(sceneId) {
  const factory = sceneFactories[sceneId];
  if (!factory) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }

  return factory();
}

export function createInitialScene() {
  return createScene(sceneIds.starlightVillage);
}
