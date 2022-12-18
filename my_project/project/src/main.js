import * as THREE from "three";
import * as CONTROLS from "controls";
import * as TWEEN from "tween";
import Stats from "../../../../lib/three.js-r145/examples/jsm/libs/stats.module.js";

// Own modules
import Arcade from "./objects/Arcade.js";
import Enviroment from "./enviroment/enviroment.js";

// Event functions
import { updateAspectRatio } from "./eventfunctions/updateAspectRatio.js";
import { calculateMousePosition } from "./eventfunctions/calculateMousePosition.js";
import { executeRaycast } from "./eventfunctions/executeRaycast.js";

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(200));
  window.scene.nane = "scene";

  const arcade = new Arcade();
  arcade.position.set(0, 0, 0);
  window.scene.add(arcade);

  const room = new Enviroment();
  room.position.set(0, 0, 0);
  window.scene.add(room);

  window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.camera.position.set(
    arcade.children[9].position.x - 62.475,
    arcade.children[9].position.y + 11.9091,
    0
  );
  window.camera.lookAt(-0.51 * 35, 1.85974 * 35, 0);

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor();
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  /* window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
  );
  window.camera.position.set(-100, 100, 100);

  const orbitControls = new CONTROLS.OrbitControls(
    window.camera,
    window.renderer.domElement
  );
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  //orbitControls.maxPolarAngle = Math.PI / 2.1;

  orbitControls.update(); */

  //Animations onKeyDown
  const joystick = arcade.children[3];
  const screen = arcade.children[9];
  const player = screen.children[0]?.children[0];
  const button2 = arcade.children[1];
  const button3 = arcade.children[2];

  let button2Pressed = false;
  let button3Pressed = false;

  const onDocumentKeyDown = ({ which }) => {
    let keyCode = which;
    const speed = 0.615 * 2;
    switch (keyCode) {
      case 74: //Button J
        if (button2Pressed === false) {
          button2.tweenAnimation1.start(); //Button J
          button2Pressed = true;
          screen.shootOne(screen, player.position.y, player.position.z);
        }
        break;
      case 75: //Button K
        if (button3Pressed === false) {
          button3.tweenAnimation1.start(); //Button K
          button3Pressed = true;
          screen.shootTwo(screen, player.position.y, player.position.z);
        }
        break;
      /* case 13: //Button Enter
        cylinderBody.tweenAnimation.start();
        arcade.children[0].allRectLightTo100();
        break; */
      case 87: //Button W
        joystick.tweenAnimation("W").start(); // Button W
        player.move("up", speed);
        break;
      case 65: //Button A
        joystick.tweenAnimation("A").start(); // Button A
        player.move("left", speed);
        break;
      case 83: //Button S
        joystick.tweenAnimation("S").start(); // Button S
        player.move("down", speed);
        break;
      case 68: //Button D
        joystick.tweenAnimation("D").start(); // Button D
        player.move("right", speed);
        break;
    }
  };

  const onDocumentKeyUp = ({ which }) => {
    let keyCode = which;
    switch (keyCode) {
      case 74: //Button J
        button2.tweenAnimation2.start(); //Button J
        button2Pressed = false;
        break;
      case 75: //Button K
        button3.tweenAnimation2.start(); //Button K
        button3Pressed = false;
        break;
    }
  };

  window.addEventListener("keydown", onDocumentKeyDown);
  window.addEventListener("keyup", onDocumentKeyUp);

  const clock = new THREE.Clock();
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  function mainLoop() {
    stats.begin();
    const delta = clock.getDelta();

    arcade.pedalAnimation(arcade);

    //game
    screen.spawnEnemiesInterval++;
    if (screen.spawnEnemiesInterval === 150) {
      screen.spawnEnemy(1, 1);
      screen.spawnEnemiesInterval = 0;
    }
    //screen.updateGame();

    TWEEN.update();
    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
    stats.end();
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;
window.onmousemove = calculateMousePosition;
window.onclick = executeRaycast;
