import * as THREE from "three";
import * as TWEEN from "tween";
import * as CONTROLS from "controls";

export default class Camera extends THREE.Group {
  constructor() {
    super();

    this.addParts();
  }

  addParts() {
    this.instanciate = (window) => {
      window.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1500
      );
      window.camera.position.set(-220, 160, 220);
      this.orbitControls = new CONTROLS.OrbitControls(
        window.camera,
        window.renderer.domElement
      );
      this.orbitControls.target = new THREE.Vector3(40, 0, -40);
      this.orbitControls.enableDamping = true;
      this.orbitControls.rotateSpeed = 1.2;
      this.orbitControls.zoomSpeed = 0.8;
      this.orbitControls.maxPolarAngle = Math.PI / 2.1;
      this.name = "camera";
      this.enableOrbit();
      this.setAnimations();

      const listener = new THREE.AudioListener();
      window.camera.add(listener);

      // create a global audio source
      const sound = new THREE.Audio(listener);

      const audioLoader = new THREE.AudioLoader();
      audioLoader.load("./src/sounds/arcade_background.mp3", function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
      });
    };

    this.setAnimations = () => {
      this.animations = {};

      this.animations.orbit = (duration) => {
        new TWEEN.Tween(window.camera)
          .to(
            {
              position: new THREE.Vector3(-250, 200, 250),
              quaternion: new THREE.Quaternion(
                -0.20780122565338044,
                -0.372877809926707,
                -0.0860740859433821,
                0.9002066658330334
              ),
            },
            duration
          )
          .start();
        this.enableOrbit();
      };

      this.animations.threeJSArcade = (duration, finished) => {
        let scene;
        let arcadeScreen;
        let arcade;
        this.traverseAncestors((parent) => {
          if (parent.name === "scene") {
            scene = parent;
          }
        });
        scene.traverse((child) => {
          if (child.name === "arcade") {
            arcadeScreen = child.children[9];
            arcade = child;
          }
        });
        new TWEEN.Tween(window.camera)
          .to(
            {
              position: new THREE.Vector3(
                arcade.position.x - 80.5,
                arcade.position.y + 77,
                arcade.position.z
              ),
              quaternion: new THREE.Quaternion(
                -0.06649763679664024,
                -0.7039730565159878,
                -0.06649763679664024,
                0.7039730565159877
              ),
            },
            duration
          )
          .onComplete(finished)
          .start();
        this.disableOrbit();
      };

      this.animations.blenderArcade = (duration, finished) => {
        let scene;
        let blenderArcadeScreen;
        let blenderArcade;
        this.traverseAncestors((parent) => {
          if (parent.name === "scene") {
            scene = parent;
          }
        });
        scene.traverse((child) => {
          if (child.name === "blenderArcade") {
            blenderArcadeScreen = child.children[17];
            blenderArcade = child;
          }
        });
        new TWEEN.Tween(window.camera)
          .to(
            {
              position: new THREE.Vector3(
                blenderArcade.position.x - 80.5,
                blenderArcade.position.y + 77,
                blenderArcade.position.z
              ),
              quaternion: new THREE.Quaternion(
                -0.06649763679664024,
                -0.7039730565159878,
                -0.06649763679664024,
                0.7039730565159877
              ),
            },
            duration
          )
          .onComplete(finished)
          .start();
        this.disableOrbit();
      };
    };

    this.update = () => {
      this.orbitControls.update();
    };

    this.disableOrbit = () => {
      this.orbitControls.enabled = false;
      this.update();
    };

    this.enableOrbit = () => {
      this.orbitControls.enabled = true;
      this.update();
    };
  }
}
