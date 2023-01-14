import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CANNON from "../../../../lib/cannon-es-0.20.0/dist/cannon-es.js";
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
      roughness: 0.8,
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
      (2.8 / 4) * planeSize
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
    wall0.position.y = ((2.8 / 4) * planeSize) / 2;
    wall0.rotateY(Math.PI);
    this.add(wall0);

    const wall1 = wall0.clone();
    wall1.receiveShadow = true;
    wall1.castShadow = true;
    wall1.position.x = planeSize / 2;
    wall1.position.z = 0;
    this.add(wall1);

    const addPhysicsToWall = (wall, rotate = false) => {
      const boundingBox = new THREE.Box3().setFromObject(wall);
      const boudingBoxSize = new THREE.Vector3();
      boundingBox.getSize(boudingBoxSize);
      window.physics.addBox(
        wall,
        100000,
        boudingBoxSize.x,
        boudingBoxSize.y,
        boudingBoxSize.z,
        0,
        0,
        0
      );
      window.physics.getBody(wall).fixedRotation = true;
      window.physics.getBody(wall).updateMassProperties();
      window.physics.getBody(wall).velocity.set(0, 0, 0);
      if (rotate) {
        const axis = new CANNON.Vec3(0, 1, 0);
        const angle = Math.PI / 2;
        window.physics.getBody(wall).quaternion.setFromAxisAngle(axis, angle);
      }
    };

    addPhysicsToWall(wall0);
    addPhysicsToWall(wall1, true);

    //mirror
    const groundMirror = new Reflector(planeGeometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x777777,
    });
    groundMirror.position.y = -0.2;
    groundMirror.rotateX(-Math.PI / 2);
    this.add(groundMirror);

    //light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1.2;
    this.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffb7c5);
    spotLight.position.set(-300, 100, 300);
    spotLight.intensity = 2.2;
    spotLight.target = floor;
    spotLight.angle = THREE.MathUtils.degToRad(30);
    spotLight.penumbra = 1.0;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 1500;
    this.add(spotLight);
    //window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

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

    nameTextLoader.load("../project/src/fonts/arcade_regular.json", (fonts) => {
      const nameTextGeometry = new TextGeometry("-STEFAN LE-", {
        height: 4,
        size: 20,
        font: fonts,
      });
      const nameTextMaterial = new THREE.MeshPhongMaterial({
        color: 0xff5733,
        emissive: 0xff5733,
      });
      const textMesh = new THREE.Mesh(nameTextGeometry, nameTextMaterial);
      this.add(textMesh);
      textMesh.translateY((planeSize / 5) * 1.6);
      textMesh.translateZ(-planeSize / 2 + 1);
      textMesh.translateX(-82);
    });

    nameTextLoader.load(
      "../project/src/fonts/pressstart_2P_regular.json",
      (fonts) => {
        const nameTextGeometry = new TextGeometry("'(=^.^=)'", {
          height: 4,
          size: 8,
          font: fonts,
        });
        const nameTextMaterial = new THREE.MeshPhongMaterial({
          color: 0xff5733,
          emissive: 0xff5733,
        });
        const textMesh = new THREE.Mesh(nameTextGeometry, nameTextMaterial);
        this.add(textMesh);
        textMesh.translateY((planeSize / 5) * 1.2);
        textMesh.translateZ(-planeSize / 2 + 1);
        textMesh.translateX(-57);
      }
    );

    const translateLightY = 126;
    const LEDLightGeometry = new THREE.PlaneGeometry(5, planeSize);
    LEDLightGeometry.rotateZ(Math.PI / 2);
    const LEDLightMaterial = new THREE.MeshPhongMaterial({
      color: 0xbf40bf,
      emissive: 0xbf40bf,
    });
    const LEDMesh = new THREE.Mesh(LEDLightGeometry, LEDLightMaterial);
    LEDMesh.translateY(translateLightY);
    LEDMesh.translateZ(-planeSize / 2 + 0.2);
    this.add(LEDMesh);

    const LEDMeshCopy = LEDMesh.clone();
    LEDMeshCopy.translateZ(planeSize / 2 + 0.2);
    LEDMeshCopy.translateX(planeSize / 2 - 0.2);
    LEDMeshCopy.rotateY(-Math.PI / 2);
    this.add(LEDMeshCopy);

    const LEDLightGeometryCyan = new THREE.PlaneGeometry(5, planeSize);
    LEDLightGeometryCyan.rotateZ(Math.PI / 2);
    const LEDLightCyanMaterial = new THREE.MeshPhongMaterial({
      color: 0x3f888f,
      emissive: 0x3f888f,
    });
    const LEDCyanMesh = new THREE.Mesh(
      LEDLightGeometryCyan,
      LEDLightCyanMaterial
    );
    LEDCyanMesh.translateY(translateLightY - 8);
    LEDCyanMesh.translateZ(-planeSize / 2 + 0.2);
    this.add(LEDCyanMesh);

    const LEDCyanMeshCopy = LEDCyanMesh.clone();
    LEDCyanMeshCopy.translateZ(planeSize / 2 + 0.2);
    LEDCyanMeshCopy.translateX(planeSize / 2 - 0.2);
    LEDCyanMeshCopy.rotateY(-Math.PI / 2);
    this.add(LEDCyanMeshCopy);

    const pictureGeometry = new THREE.PlaneGeometry(48, 65);
    const pictureMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0xffffff,
      map: new THREE.TextureLoader().load("src/images/Poster.png"),
    });
    const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);

    picture.translateY(70);
    picture.translateX(planeSize / 2 - 0.3);
    picture.translateZ(-60);
    picture.rotation.set(0, (3 / 2) * Math.PI, 0);
    this.add(picture);

    /* const gui = new DATGUI.GUI();
    gui.add(spotLight.position, "x", -400, 400);
    gui.add(spotLight.position, "y", -200, 400);
    gui.add(spotLight.position, "z", -400, 400); */
  }
}
