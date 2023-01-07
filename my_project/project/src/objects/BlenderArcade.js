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
    this.animations = [];
    this.state = {
      powerOn: false,
      inGame: false,
    };
    this.heartsHitZero = false;
    this.load(this);
  }

  load(thisTelevision) {
    this.gltfLoader.load("src/models/arcade_2.0.gltf", function (gltf) {
      gltf.scene.children.forEach((e) => console.log(e));
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.parentTelevision = thisTelevision;
        }
        thisTelevision.add(gltf.scene);
        thisTelevision.loadingDone = true;
      });
    });
  }
}
