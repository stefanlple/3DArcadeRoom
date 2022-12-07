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
    const planeSize = 270;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMaterial = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
    });
    planeMaterial.metalness = 0.7;
    planeMaterial.roughness = 0.2;
    planeMaterial.color = new THREE.Color(0x292929);
    const floor = new THREE.Mesh(planeGeometry, planeMaterial);
    floor.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor.receiveShadow = true;
    this.add(floor);

    const wallGeometry = new THREE.PlaneGeometry(
      planeSize,
      (2 / 3) * planeSize
    );
    const planeMaterialGrey = planeMaterial.clone();
    planeMaterialGrey.color = new THREE.Color(0x808080);
    const wall0 = new THREE.Mesh(wallGeometry, planeMaterialGrey);
    wall0.receiveShadow = true;
    wall0.position.z = -planeSize / 2;
    wall0.position.y = (1 / 3) * planeSize;
    this.add(wall0);

    const wall1 = new THREE.Mesh(wallGeometry, planeMaterialGrey);
    wall1.receiveShadow = true;
    wall1.rotateY((1 / 2) * Math.PI);
    wall1.position.x = planeSize / 2;
    wall1.position.y = (1 / 3) * planeSize;
    this.add(wall1);

    //light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    this.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 200, 100);
    spotLight.intensity = 0.8;
    spotLight.target = floor;
    spotLight.angle = THREE.MathUtils.degToRad(30);
    spotLight.penumbra = 1.0;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 500;
    this.add(spotLight);
    window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

    const gui = new DATGUI.GUI();
    gui.add(spotLight.position, "x", -200, 200);
    gui.add(spotLight.position, "y", 0, 200);
    gui.add(spotLight.position, "z", -200, 200);
  }
}
