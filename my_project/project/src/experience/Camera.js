import * as THREE from "three";
import * as TWEEN from "tween";

export default class Camera extends THREE.Group {
  constructor() {
    super();

    this.addParts();
  }
  addParts() {
    this.setControls();
    {
      this.controls = new OrbitControls(this.instance, this.canvas);
      this.controls.enableDamping = true;
      this.controls.enablePan = false;
      this.controls.rotateSpeed = 1.2;
      this.controls.zoomSpeed = 0.8;
      this.controls.target.z = -1;
      this.controls.enableRotate = false;
      this.controls.enableZoom = false;
    }

    this.setCameraAngle = () => {
      this.cameraAngles = {};

      this.cameraAngles.orbit = () => {};
      this.cameraAngles.threeJSArcade = () => {};
      this.cameraAngles.blenderArcade = () => {};
    };

    this.setAnimations = () => {
      this.animations = {};
      this.animations.orbit = () => {};
      this.animations.threeJSArcade = () => {};
      this.animations.blenderArcade = () => {};
    };
  }
}
