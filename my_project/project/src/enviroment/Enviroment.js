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
    const planeSize = 250;
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
    floor.castShadow = true;
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
    wall0.castShadow = true;
    wall0.position.z = -planeSize / 2;
    wall0.position.y = (1 / 3) * planeSize;
    this.add(wall0);

    const wall1 = wall0.clone();
    wall1.receiveShadow = true;
    wall1.castShadow = true;
    wall1.rotateY((1 / 2) * Math.PI);
    wall1.position.x = planeSize / 2;
    wall1.position.y = (1 / 3) * planeSize;
    wall1.position.z = 0;
    this.add(wall1);

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

    //light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    this.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffb7c5);
    spotLight.position.set(-300, 100, 300);
    spotLight.intensity = 2;
    spotLight.target = floor;
    spotLight.angle = THREE.MathUtils.degToRad(30);
    spotLight.penumbra = 1.0;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 1500;
    this.add(spotLight);
    window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

    const planeSize1 = 1200;
    const planeGeometry1 = new THREE.PlaneGeometry(planeSize1, planeSize1);
    const planeMaterial1 = new THREE.MeshStandardMaterial({
      color: 0x020202,
      roughness: 0.9,
      metalness: 0,
    });
    const floor1 = new THREE.Mesh(planeGeometry1, planeMaterial1);
    floor1.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor1.position.set(0, -2, 0);
    floor1.receiveShadow = true;
    this.add(floor1);

    /* const backLight = new THREE.SpotLight(0xa66fb5);
    backLight.position.set(300, 150, -300);
    backLight.intensity = 20;
    backLight.target = floor;
    backLight.angle = THREE.MathUtils.degToRad(30);
    backLight.penumbra = 0.5;
    backLight.castShadow = true;
    backLight.shadow.mapSize.set(2048, 2048);
    backLight.shadow.camera.aspect = 1;
    backLight.shadow.camera.near = 250;
    backLight.shadow.camera.far = 800;
    this.add(backLight);
    window.scene.add(new THREE.CameraHelper(backLight.shadow.camera));
*/
    const gui = new DATGUI.GUI();
    gui.add(spotLight.position, "x", -400, 400);
    gui.add(spotLight.position, "y", -200, 400);
    gui.add(spotLight.position, "z", -400, 400);
  }
}
