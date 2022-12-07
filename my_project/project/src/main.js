import * as THREE from "three";
import * as DATGUI from "datgui";
import * as CONTROLS from "controls";
import * as TWEEN from "tween";

// Own modules
import Arcade from "./objects/Arcade.js";
import Enviroment from "./enviroment/enviroment.js";

// Event functions
import { updateAspectRatio } from "./eventfunctions/updateAspectRatio.js";

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(200));

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
  window.camera.position.set(-100, 100, 100);

  /* window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.camera.position.set(-2.3 * 35, 2.2 * 35, 0);
  window.camera.lookAt(-0.51 * 35, 1.85974 * 35, 0); */

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0x202020);
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  const orbitControls = new CONTROLS.OrbitControls(
    window.camera,
    window.renderer.domElement
  );
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  //orbitControls.maxPolarAngle = Math.PI / 2.1;

  orbitControls.update();

  //Animations onKeyDown
  const cylinderBody = arcade.children[8];
  const joystick = arcade.children[3];
  const screen = arcade.children[9];
  const player = screen.children[1];
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
      case 13: //Button Enter
        cylinderBody.tweenAnimation.start();
        break;
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

  function mainLoop() {
    const delta = clock.getDelta();

    arcade.animations.forEach((animation) => {
      animation.update(delta);
    });
    arcade.pedalAnimation(arcade);

    //game
    screen.updateBullet();

    screen.spawnEnemiesInterval++;
    if (screen.spawnEnemiesInterval === 50) {
      screen.spawnEnemy(1, 1);
      screen.spawnEnemiesInterval = 0;
    }
    screen.updateEnemies();
    TWEEN.update();
    window.renderer.render(window.scene, window.camera);
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;
