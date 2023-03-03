import * as THREE from "three";

window.raycaster = new THREE.Raycaster();

export function executeRaycast() {
  window.raycaster.setFromCamera(window.mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {
    let firstHit = intersects[0].object;
    const arcade = findParentByName(firstHit, "arcade");
    const blenderArcade = findParentByName(firstHit, "blenderArcade");
    const scene = findParentByName(firstHit, "scene");
    let camera;
    scene.traverse((child) => {
      if (child.name === "camera") {
        camera = child;
      }
    });
    //arcade
    if (arcade && arcade.state.powerOn === false) {
      const cylinder = arcade.children[8];
      const corpus = arcade.children[0];
      cylinder.tweenAnimation.start();
      corpus.allRectLightTo100();
    }

    if (arcade && arcade.state.powerOn && !arcade.state.inGame) {
      camera.animations.threeJSArcade(1000, () => {
        arcade.children[9].changeScreenState(arcade.state);
      });
    }

    //blenderArcade
    if (blenderArcade && blenderArcade.state.powerOn === false) {
      const cylinder = blenderArcade.children[0]?.children[6];
      cylinder.tweenAnimation.start();
      blenderArcade.allRectLightTo100();
    }

    if (
      blenderArcade &&
      blenderArcade.state.powerOn &&
      !blenderArcade.state.inGame
    ) {
      camera.animations.blenderArcade(1000, () => {
        blenderArcade.children[0]?.children[10].changeScreenState(
          blenderArcade.state
        );
      });
    }
  }
  function findParentByName(object, identifier) {
    let current = object;
    for (let i = 0; i < 10; i++) {
      if (current) {
        if (current.name === identifier) {
          return current;
        }
        current = current.parent;
      }
    }

    return false;
  }
}
