import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CONTROLS from "controls";

export default class Enviroment extends THREE.Group {
  constructor() {
    super();

    this.animations = [];
    this.addParts();
  }

  addParts() {
    //room
    const planeGeometry = new THREE.PlaneGeometry(300, 300);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xaaaaaa,
      wireframe: false,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    plane.receiveShadow = true;
    this.add(plane);

    //light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    this.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 200, 100);
    spotLight.intensity = 0.8;
    spotLight.target = plane;
    spotLight.angle = THREE.MathUtils.degToRad(30);
    spotLight.penumbra = 1.0;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 500;
    /*   this.add(spotLight);
window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera)); */

    const gui = new DATGUI.GUI();
    gui.add(spotLight.position, "x", -200, 200);
    gui.add(spotLight.position, "y", 0, 200);
    gui.add(spotLight.position, "z", -200, 200);
  }
}
