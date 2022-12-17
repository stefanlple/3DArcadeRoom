export default class Camera extends THREE.Group {
  constructor() {
    super();

    this.addParts();
  }
  addParts() {
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
