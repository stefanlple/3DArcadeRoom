import * as THREE from "three";
import * as TWEEN from "tween";
import * as CONTROLS from "controls";

export default class Camera extends THREE.Group {
  constructor() {
    super();

    this.addParts();
  }

  addParts() {
    this.instanciate = (window) => {
      window.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1500
      );
      window.camera.position.set(-250, 200, 250);
      this.orbitControls = new CONTROLS.OrbitControls(
        window.camera,
        window.renderer.domElement
      );
      this.orbitControls.target = new THREE.Vector3(40, 0, -40);
      this.orbitControls.enableDamping = true;
      this.orbitControls.rotateSpeed = 1.2;
      this.orbitControls.zoomSpeed = 0.8;
      this.orbitControls.maxPolarAngle = Math.PI / 2.1;
      this.name = "camera";
      this.enableOrbit();
    };

    this.setAnimations = () => {
      this.animations = {};
      this.animations.orbit = (duration) => {
        new TWEEN.Tween(window.camera)
          .to(
            {
              position: new THREE.Vector3(-250, 200, 250),
            },
            duration
          )
          .start();
        this.enableOrbit();
      };
      this.animations.threeJSArcade = (duration) => {
        new TWEEN.Tween(window.camera)
          .to(
            {
              position: new THREE.Vector3(-250, 200, 250),
              rotation: new THREE.Euler(
                -1.570796326794898,
                -1.570796326794898,
                -1.570796326794898,
                "XYZ"
              ),
            },
            duration
          )
          .start();
        this.disableOrbit();
      };
      this.animations.blenderArcade = () => {};
    };

    this.update = () => {
      this.orbitControls.update();
    };

    this.disableOrbit = () => {
      this.orbitControls.enabled = false;
      this.update();
    };

    this.enableOrbit = () => {
      this.orbitControls.enabled = true;
      this.update();
    };
  }
}
