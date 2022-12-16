import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CONTROLS from "controls";
import { Reflector } from "../../../../lib/three.js-r145/examples/jsm/objects/Reflector.js";

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
      metalness: 0.25,
      roughness: 0.1,
      color: 0x151515,
      opacity: 0.75,
      transparent: true,
    });
    const floor = new THREE.Mesh(planeGeometry, planeMaterial);
    floor.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor.receiveShadow = true;
    this.add(floor);

    const wallGeometry = new THREE.PlaneGeometry(
      planeSize,
      (2 / 3) * planeSize
    );
    const planeMaterialGrey = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0x090909,
      emissive: 0x090909,
    });
    const wall0 = new THREE.Mesh(wallGeometry, planeMaterialGrey);
    wall0.receiveShadow = true;
    wall0.position.z = -planeSize / 2;
    wall0.position.y = (1 / 3) * planeSize;
    this.add(wall0);

    //mirror
    const groundMirror = new Reflector(planeGeometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x777777,
    });
    groundMirror.position.y = -0.2;
    groundMirror.rotateX(-Math.PI / 2);
    scene.add(groundMirror);

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
    spotLight.position.set(-300, 100, 300);
    spotLight.intensity = 0.8;
    spotLight.target = floor;
    spotLight.angle = THREE.MathUtils.degToRad(30);
    spotLight.penumbra = 1.0;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 630;
    this.add(spotLight);
    window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

    const gui = new DATGUI.GUI();
    gui.add(spotLight.position, "x", -400, 400);
    gui.add(spotLight.position, "y", -200, 400);
    gui.add(spotLight.position, "z", -400, 400);
  }
}
