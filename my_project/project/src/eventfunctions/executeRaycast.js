import * as THREE from "three";

window.raycaster = new THREE.Raycaster();

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

export function executeRaycast() {
  window.raycaster.setFromCamera(window.mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  //console.log(intersects.length);
  if (intersects.length > 0) {
    let firstHit = intersects[0].object;
    if (findParentByName(firstHit, "arcade")) {
      findParentByName(firstHit, "arcade").children[8].tweenAnimation.start();
      findParentByName(firstHit, "arcade").children[0].allRectLightTo100();
    }
    //console.log(firstHit);
    //if (firstHit.name === "arcade") console.log(firstHit);
    //console.log(firstHit);
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
}
