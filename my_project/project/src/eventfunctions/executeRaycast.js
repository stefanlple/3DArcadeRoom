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

    //if (firstHit.name === "arcade") console.log(firstHit);
    /* let firstHit = intersects[0].object;

    if (firstHit.name === "powerKnob" || firstHit.name === "volumeKnob") {
      if (firstHit.children.length > 0) {
        firstHit.linearAnimation.toggleEndPosition();
      } else {
        firstHit.parent.linearAnimation.toggleEndPosition();
      }
    } else if (firstHit.name === "antenna") {
      firstHit.up = !firstHit.up;
      if (firstHit.up) {
        firstHit.tweenAnimationDown.stop();
        firstHit.tweenAnimationUp.start();
      } else {
        firstHit.tweenAnimationUp.stop();
        firstHit.tweenAnimationDown.start();
      }
    } else if (firstHit.name === "powerKnobGLTF") {
      firstHit.parentTelevision.state.powerOn =
        !firstHit.parentTelevision.state.powerOn;
      if (firstHit.parentTelevision.state.powerOn) {
        firstHit.parentTelevision.animations.get("powerKnob_off").stop();
        firstHit.parentTelevision.animations.get("powerKnob_on").play();
      } else {
        firstHit.parentTelevision.animations.get("powerKnob_on").stop();
        firstHit.parentTelevision.animations.get("powerKnob_off").play();
      }
    } else if (firstHit.name === "volumeKnobGLTF") {
      firstHit.parentTelevision.state.volumeHigh =
        !firstHit.parentTelevision.state.volumeHigh;
      if (firstHit.parentTelevision.state.volumeHigh) {
        firstHit.parentTelevision.animations.get("volumeKnob_low").stop();
        firstHit.parentTelevision.animations.get("volumeKnob_high").play();
      } else {
        firstHit.parentTelevision.animations.get("volumeKnob_high").stop();
        firstHit.parentTelevision.animations.get("volumeKnob_low").play();
      }
    } else if (firstHit.name === "antennaGLTF") {
      firstHit.parentTelevision.state.antennaUp =
        !firstHit.parentTelevision.state.antennaUp;
      if (firstHit.parentTelevision.state.antennaUp) {
        firstHit.parentTelevision.animations.get("antenna_down").stop();
        firstHit.parentTelevision.animations.get("antenna_up").play();
      } else {
        firstHit.parentTelevision.animations.get("antenna_up").stop();
        firstHit.parentTelevision.animations.get("antenna_down").play();
      }
    } */
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
