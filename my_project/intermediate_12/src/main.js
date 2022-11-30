import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CONTROLS from "controls";
import * as TWEEN from "tween";

// Own modules
import Arcade from "./objects/Arcade.js";

// Event functions
import { updateAspectRatio } from "./eventfunctions/updateAspectRatio.js";

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(200));

  const arcade = new Arcade();
  arcade.position.set(0, 0, 0);
  window.scene.add(arcade);

  /* window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.camera.position.set(-100, 100, 100); */

  window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.camera.position.set(-2.3 * 35, 2.2 * 35, 0);
  window.camera.lookAt(-0.51 * 35, 1.85974 * 35, 0);

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0x202020);
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  const planeGeometry = new THREE.PlaneGeometry(300, 300);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xaaaaaa,
    wireframe: false,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
  plane.receiveShadow = true;
  window.scene.add(plane);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 1;
  window.scene.add(ambientLight);

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
  /*   window.scene.add(spotLight);
  window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera)); */

  const gui = new DATGUI.GUI();
  gui.add(spotLight.position, "x", -200, 200);
  gui.add(spotLight.position, "y", 0, 200);
  gui.add(spotLight.position, "z", -200, 200);

  /*   const orbitControls = new CONTROLS.OrbitControls(
    window.camera,
    window.renderer.domElement
  );
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  //orbitControls.maxPolarAngle = Math.PI / 2.1;

  orbitControls.update(); */

  //Animations onKeyDown
  let button2Pressed = false;
  let button3Pressed = false;

  const cylinderBody = arcade.children[8];
  const onDocumentKeyDown = (event) => {
    let keyCode = event.which;
    const button2 = arcade.children[1];
    if (keyCode == 74 && button2Pressed === false) {
      button2.tweenAnimation1.start(); //Button J
      button2Pressed = true;
    }

    const button3 = arcade.children[2];
    if (keyCode == 75 && button3Pressed === false) {
      button3.tweenAnimation1.start(); //Button K
      button3Pressed = true;
    }

    if (keyCode == 13) {
      cylinderBody.tweenAnimation.start();
    }

    const joystick = arcade.children[3];
    const screen = arcade.children[9];
    const player = screen.children[1];

    const speed = 0.615 * 2;

    if (keyCode == 87) {
      joystick.tweenAnimation("W").start(); // Button W
      player.move("up", speed);
    }
    if (keyCode == 65) {
      joystick.tweenAnimation("A").start(); // Button A
      player.move("left", speed);
    }
    if (keyCode == 83) {
      joystick.tweenAnimation("S").start(); // Button S
      player.move("down", speed);
    }
    if (keyCode == 68) {
      joystick.tweenAnimation("D").start(); // Button D
      player.move("right", speed);
    }
  };

  const onDocumentKeyUp = (event) => {
    let keyCode = event.which;
    const button2 = arcade.children[1];
    if (keyCode == 74) {
      button2.tweenAnimation2.start(); //Button J
      button2Pressed = false;
    }

    const button3 = arcade.children[2];
    if (keyCode == 75) {
      button3.tweenAnimation2.start(); //Button K
      button3Pressed = false;
    }
  };

  document.addEventListener("keydown", onDocumentKeyDown);
  document.addEventListener("keyup", onDocumentKeyUp);

  const clock = new THREE.Clock();

  function mainLoop() {
    const delta = clock.getDelta();

    arcade.animations.forEach((animation) => {
      animation.update(delta);
    });
    arcade.pedalAnimation(arcade);

    TWEEN.update();

    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;
