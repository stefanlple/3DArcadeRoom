import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CONTROLS from "controls";
import { Reflector } from "../../../../lib/three.js-r145/examples/jsm/objects/Reflector.js";
import { FontLoader } from "../../../../lib/three.js-r145/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../../../lib/three.js-r145/examples/jsm/geometries/TextGeometry.js";

export default class Enviroment extends THREE.Group {
  constructor() {
    super();

    this.ballList = [];
    this.addParts();
  }

  addParts() {
    //room
    const planeSize = 200;
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
    ambientLight.intensity = 1.2;
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
    const planeMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x080808,
    });
    const floor1 = new THREE.Mesh(planeGeometry1, planeMaterial1);
    floor1.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor1.position.set(0, -2, 0);
    floor1.receiveShadow = true;
    this.add(floor1);

    const nameTextLoader = new FontLoader();

    nameTextLoader.load(
      "../../../../lib/three.js-r145/examples/fonts/helvetiker_bold.typeface.json",
      (fonts) => {
        const nameTextGeometry = new TextGeometry("STEFAN LE", {
          height: 2,
          size: 18,
          font: fonts,
        });
        const nameTextMaterial = new THREE.MeshPhongMaterial({
          color: 0xffc000,
          emissive: 0xffc000,
        });
        const textMesh = new THREE.Mesh(nameTextGeometry, nameTextMaterial);
        this.add(textMesh);
        textMesh.translateY((planeSize / 5) * 1.6);
        textMesh.translateZ(-planeSize / 2 + 1);
        textMesh.translateX(-70);
      }
    );

    const leftPlaneBallLight = [1];
    leftPlaneBallLight.forEach((e) => {
      const ballGeometry = new THREE.SphereGeometry(1.5);
      const ballMaterial = new THREE.MeshPhongMaterial({
        color: 0xffc000,
        emissive: 0xffc000,
      });
      const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
      this.add(ballMesh);
    });

    const LEDLightGeometry = new THREE.PlaneGeometry(10, planeSize - 0.1);
    LEDLightGeometry.rotateZ(Math.PI / 2);
    const LEDLightMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xfffffff,
    });
    const LEDMesh = new THREE.Mesh(LEDLightGeometry, LEDLightMaterial);
    LEDMesh.translateY(115);
    LEDMesh.translateZ(-planeSize / 2 + 0.2);
    this.add(LEDMesh);

    const LEDMeshCopy = LEDMesh.clone();
    LEDMeshCopy.translateZ(planeSize / 2 + 0.2);
    LEDMeshCopy.translateX(planeSize / 2 - 0.2);
    LEDMeshCopy.rotateY(-Math.PI / 2);
    this.add(LEDMeshCopy);
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
