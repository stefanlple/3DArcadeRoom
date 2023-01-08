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
    this.setPedalPositionAnimation;
    this.addPart();
  }

  addPart() {
    RectAreaLightUniformsLib.init();
    const rectLightsWidth = (0.099132 * 35) / 3;
    const rectLightsProperties = [
      //right side
      {
        height: 1.18387 * 35,
        positionX: -0.865344 * 35 - 0.1,
        positionY: 0.57849 * 35,
        positionZ: -0.641495 * 35,
        rotationAngle: -12.38,
      },
      {
        height: 0.3434 * 35,
        positionX: -0.990773 * 35 - 0.1,
        positionY: 1.3286799999999999 * 35,
        positionZ: -0.641495 * 35,
        rotationAngle: 0,
      },
      {
        height: 0.409261 * 35,
        positionX: -0.786144 * 35 - 0.1,
        positionY: 1.50038 * 35 + 0.1,
        positionZ: -0.641495 * 35,
        rotationAngle: 90,
      },
      {
        height: 0.828373 * 35,
        positionX: -0.5441965 * 35 - 0.1,
        positionY: 1.9119549999999998 * 35,
        positionZ: -0.641495 * 35,
        rotationAngle: 5.17,
      },
      {
        height: 0.328721 * 35,
        positionX: -0.652325 * 35,
        positionY: 2.40111 * 35 - 0.1,
        positionZ: -0.641495 * 35,
        rotationAngle: -62.24,
      },
      {
        height: 0.297959 * 35 + 0.1,
        positionX: -0.7886075 * 35 - 0.1,
        positionY: 2.626355 * 35 + 0.1,
        positionZ: -0.641495 * 35,
        rotationAngle: 3.53,
      },
      {
        height: 0.277184 * 35,
        positionX: -0.6611975 * 35 - 0.1,
        positionY: 2.847335 * 35 + 0.1,
        positionZ: -0.641495 * 35,
        rotationAngle: 58.56,
      },
      {
        height: 1.05104 * 35,
        positionX: -0.022425000000000028 * 35 - 0.1,
        positionY: 2.84734 * 35 + 0.1,
        positionZ: -0.641495 * 35,
        rotationAngle: 97.91,
      },
      //left side
      {
        height: 1.18387 * 35,
        positionX: -0.865344 * 35 - 0.1,
        positionY: 0.57849 * 35,
        positionZ: 0.641495 * 35,
        rotationAngle: -12.38,
      },
      {
        height: 0.3434 * 35,
        positionX: -0.990773 * 35 - 0.1,
        positionY: 1.3286799999999999 * 35,
        positionZ: 0.641495 * 35,
        rotationAngle: 0,
      },
      {
        height: 0.409261 * 35,
        positionX: -0.786144 * 35 - 0.1,
        positionY: 1.50038 * 35 + 0.1,
        positionZ: 0.641495 * 35,
        rotationAngle: 90,
      },
      {
        height: 0.828373 * 35,
        positionX: -0.5441965 * 35 - 0.1,
        positionY: 1.9119549999999998 * 35,
        positionZ: 0.641495 * 35,
        rotationAngle: 5.17,
      },
      {
        height: 0.328721 * 35,
        positionX: -0.652325 * 35,
        positionY: 2.40111 * 35 - 0.1,
        positionZ: 0.641495 * 35,
        rotationAngle: -62.24,
      },
      {
        height: 0.297959 * 35 + 0.1,
        positionX: -0.7886075 * 35 - 0.1,
        positionY: 2.626355 * 35 + 0.1,
        positionZ: 0.641495 * 35,
        rotationAngle: 3.53,
      },
      {
        height: 0.277184 * 35,
        positionX: -0.6611975 * 35 - 0.1,
        positionY: 2.847335 * 35 + 0.1,
        positionZ: 0.641495 * 35,
        rotationAngle: 58.56,
      },
      {
        height: 1.05104 * 35,
        positionX: -0.022425000000000028 * 35 - 0.1,
        positionY: 2.84734 * 35 + 0.1,
        positionZ: 0.641495 * 35,
        rotationAngle: 97.91,
      },
    ];

    this.rectLights = [];
    rectLightsProperties.forEach((rectLight) => {
      const rectLight1 = new THREE.RectAreaLight(
        0xffff00,
        0.1,
        rectLightsWidth,
        rectLight.height
      );
      this.add(rectLight1);
      this.rectLights.push(rectLight1);
      rectLight1.translateX(rectLight.positionX);
      rectLight1.translateY(rectLight.positionY);
      rectLight1.translateZ(rectLight.positionZ);
      rectLight1.rotateY(Math.PI / 2);
      rectLight1.rotateX(THREE.MathUtils.degToRad(rectLight.rotationAngle));
      rectLight1.add(new RectAreaLightHelper(rectLight1));
    });

    const intensityRectLightsTween = (object) => {
      return new TWEEN.Tween(object)
        .to({ intensity: 1 }, 9000)
        .easing(TWEEN.Easing.Sinusoidal.In)
        .chain(new TWEEN.Tween(object).to({ intensity: 40 }, 1000))
        .onComplete(() => {
          this.state.powerOn = true;
        });
    };

    this.allRectLightTo100 = async () => {
      for (const item of this.rectLights) {
        await intensityRectLightsTween(item).start();
      }
    };
  }

  setPedalPositionAnimation(object) {
    const pedalLeft = object?.children[8];
    const pedalRight = object?.children[7];
    const cylinderBody = object?.children[6];
    //console.log("dsfsd");
    if (pedalLeft && pedalRight) {
      pedalLeft.position.set(
        -Math.cos(cylinderBody.rotation.y + 2 * Math.PI) * 35 * 0.345549 -
          +1.41066 * 35,
        Math.sin(cylinderBody.rotation.y + 2 * Math.PI) * 35 * 0.345549 +
          0.459419 * 35,
        -0.1548315 * 35
      );
      pedalRight.position.set(
        -Math.cos(cylinderBody.rotation.y + Math.PI) * 35 * 0.345549 -
          +1.41066 * 35,
        Math.sin(cylinderBody.rotation.y + Math.PI) * 35 * 0.345549 +
          0.459419 * 35,
        0.1548315 * 35
      );
    }
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
      console.log(gltf.scene);
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
          child.tweenAnimation = rotateCylinder(child);
        }

        thisTelevision.add(gltf.scene);
        thisTelevision.loadingDone = true;
      });
    });
  }
}
