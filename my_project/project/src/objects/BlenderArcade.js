import * as THREE from "three";
import * as TWEEN from "tween";
import Screen from "./Screen.js";
import { RectAreaLightUniformsLib } from "../../../../lib/three.js-r145/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "../../../../lib/three.js-r145/examples/jsm/helpers/RectAreaLightHelper.js";
import { GLTFLoader } from "../../../../lib/three.js-r145/examples/jsm/loaders/GLTFLoader.js";

export default class BlenderArcade extends THREE.Group {
  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.name = "arcade";
    this.rectLights = [];
    this.state = {
      powerOn: false,
      inGame: false,
    };
    this.heartsHitZero = false;
    this.load(this);
  }

  load(thisTelevision) {
    this.gltfLoader.load("src/models/arcade_2.0.gltf", function (gltf) {
      //button2 & button3 Animation;
      const pressedButtonTween = (object) => {
        return new TWEEN.Tween(object.position).to(
          new THREE.Vector3(
            object.position.x,
            object.position.y - 0.01413 * 35,
            object.position.z
          ),
          150
        );
      };
      //button2 & button3 Animation;
      const releasedButtonTween = (object) => {
        return new TWEEN.Tween(object.position).to(
          new THREE.Vector3(
            object.position.x,
            object.position.y,
            object.position.z
          ),
          150
        );
      };

      const toggleJoystickTween = (object, direction) => {
        let directionVector = new THREE.Vector3(
          (object.rotation.x = 0),
          (object.rotation.y = 0),
          (object.rotation.z = 0)
        );
        switch (direction) {
          case "W":
            directionVector.z -= THREE.MathUtils.degToRad(15);
            break;
          case "S":
            directionVector.z += THREE.MathUtils.degToRad(15);
            break;
          case "A":
            directionVector.x -= THREE.MathUtils.degToRad(15);
            break;
          case "D":
            directionVector.x += THREE.MathUtils.degToRad(15);
            break;
          default:
            directionVector;
        }
        return new TWEEN.Tween(object.rotation)
          .to(directionVector, 150)
          .chain(
            new TWEEN.Tween(object.rotation).to(
              new THREE.Vector3(
                object.rotation.x,
                object.rotation.y,
                object.rotation.z
              ),
              150
            )
          );
      };

      const rotateCylinder = (object) => {
        return new TWEEN.Tween(object.rotation)
          .to(
            new THREE.Vector3(
              object.rotation.x,
              object.rotation.y + 18 * Math.PI,
              object.rotation.z
            ),
            10000
          )
          .easing(TWEEN.Easing.Cubic.InOut);
      };

      //gltf.scene.children.forEach((e) => console.log(""));
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.parentTelevision = thisTelevision;
        }

        if (child.name === "button2") {
          child.tweenAnimation1 = pressedButtonTween(child);
          child.tweenAnimation2 = releasedButtonTween(child);
        }

        if (child.name === "button3") {
          child.tweenAnimation1 = pressedButtonTween(child);
          child.tweenAnimation2 = releasedButtonTween(child);
        }

        if (child.name === "joystick") {
          child.tweenAnimation = toggleJoystickTween;
        }

        if (child.name === "Cylinder") {
          console.log(child);
          child.tweenAnimation = rotateCylinder(child);
          console.log(child);
          console.log("done");
        }

        thisTelevision.add(gltf.scene);
        thisTelevision.loadingDone = true;
      });
    });
  }
}
