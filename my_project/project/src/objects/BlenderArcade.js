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
    this.gltfLoader.load("src/models/arcade_2.0.glb", function (gltf) {
      console.log(gltf.scene);
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.parentTelevision = thisTelevision;
        }
        console.log(child);
        /* if (child.name === "antennaGLTF") {
          const envMap = new THREE.TextureLoader().load(
            "../../lib/three.js-r139/examples/textures/2294472375_24a3b8ef46_o.jpg"
          );
          envMap.mapping = THREE.EquirectangularReflectionMapping;
          envMap.encoding = THREE.sRGBEncoding;
          child.material.envMap = envMap;
          child.material.envMapIntensity = 10.0;
        }
        if (child.name === "corpusGLTF" || child.name === "antennaGLTF") {
          child.castShadow = true;
        }
        if (child.name === "screenGLTF") {
          const videoPlaneMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
          });
          thisTelevision.blackTexture = new THREE.TextureLoader().load(
            "src/images/black.png"
          );
          document.televisionFromFile_noise = document.createElement("video");
          document.televisionFromFile_noise.src = "src/videos/noise.mp4";
          document.televisionFromFile_noise.loop = true;
          thisTelevision.noiseTexture = new THREE.VideoTexture(
            document.televisionFromFile_noise
          );
          document.televisionFromFile_movie = document.createElement("video");
          document.televisionFromFile_movie.src = "src/videos/movie.mp4";
          document.televisionFromFile_movie.loop = true;
          thisTelevision.movieTexture = new THREE.VideoTexture(
            document.televisionFromFile_movie
          );
          videoPlaneMaterial.map = thisTelevision.blackTexture;

          const videoPlaneGeometry = new THREE.PlaneGeometry(26, 22);
          thisTelevision.videoPlane = new THREE.Mesh(
            videoPlaneGeometry,
            videoPlaneMaterial
          );
          thisTelevision.videoPlane.position.set(0, 0, 0.12);
          thisTelevision.videoPlane.scale.set(0.06, 0.06, 0.06);
          thisTelevision.videoPlane.name = "videoPlane";
          child.add(thisTelevision.videoPlane);

          child.material.format = THREE.RGBAFormat;
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      });
      thisTelevision.animationMixer = new THREE.AnimationMixer(gltf.scene);
      for (let i = 0; i < gltf.animations.length; i++) {
        let action = thisTelevision.animationMixer.clipAction(
          gltf.animations[i]
        );
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        thisTelevision.animations.set(gltf.animations[i].name, action);
      }
      thisTelevision.add(gltf.scene);
      thisTelevision.loadingDone = true;
      thisTelevision.animationMixer.addEventListener(
        "finished",
        thisTelevision.updateFunctionalState.bind(thisTelevision)
      );*/
      });
    });
  }
}
