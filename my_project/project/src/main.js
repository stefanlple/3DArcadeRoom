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
import Camera from "./experience/Camera.js";

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(200));
  window.scene.name = "scene";

  const arcade = new Arcade();
  window.scene.add(arcade);

  const room = new Enviroment();
  window.scene.add(room);

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor();
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  /*   window.camera = new THREE.PerspectiveCamera(
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
  window.camera.lookAt(
    new THREE.Vector3(
      arcade.children[9].position.x,
      arcade.children[9].position.y,
      arcade.children[9].position.z
    )
  );
 */

  const camera = new Camera();
  room.add(camera);
  camera.instanciate(window);

  //window states
  /* window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
  );
  window.camera.position.set(-250, 200, 250);

  const orbitControls = new CONTROLS.OrbitControls(
    window.camera,
    window.renderer.domElement
  );
  orbitControls.target = new THREE.Vector3(40, 0, -40);
  orbitControls.enableDamping = true;
  orbitControls.rotateSpeed = 1.2;
  orbitControls.zoomSpeed = 0.8;
  orbitControls.maxPolarAngle = Math.PI / 2.1;

  orbitControls.update();
  console.log(camera.quaternion); */

  //Animations onKeyDown
  const joystick = arcade.children[3];
  const screen = arcade.children[9];
  const button2 = arcade.children[1];
  const button3 = arcade.children[2];

  let cameraObject;
  //find camera
  screen.traverseAncestors((parent) => {
    //find scene then find camera
    if (parent.name === "scene") {
      parent.traverse((child) => {
        if (child.name === "camera") {
          cameraObject = child;
        }
      });
    }
  });

  let spaceInvadersGame;

  let button2Pressed = false;
  let button3Pressed = false;

  const onDocumentKeyDown = ({ which }) => {
    let keyCode = which;
    const speed = 0.615 * 2;
    const player = spaceInvadersGame.children[0].children[0];
    switch (keyCode) {
      case 74: //Button J
        if (arcade.state.inGame) {
          if (button2Pressed === false) {
            button2.tweenAnimation1.start(); //Button J
            button2Pressed = true;
            spaceInvadersGame.shootOne(
              spaceInvadersGame,
              player.position.y,
              player.position.z
            );
          }
        }
        break;
      case 75: //Button K
        if (arcade.state.inGame) {
          if (button3Pressed === false) {
            button3.tweenAnimation1.start(); //Button K
            button3Pressed = true;
            spaceInvadersGame.shootTwo(
              spaceInvadersGame,
              player.position.y,
              player.position.z
            );
          }
        }
        break;
      case 87: //Button W
        if (arcade.state.inGame) {
          joystick.tweenAnimation("W").start(); // Button W
          player.move("up", speed);
        }
        break;
      case 65: //Button A
        if (arcade.state.inGame) {
          joystick.tweenAnimation("A").start(); // Button A
          player.move("left", speed);
        }
        break;
      case 83: //Button S
        if (arcade.state.inGame) {
          joystick.tweenAnimation("S").start(); // Button S
          player.move("down", speed);
        }
        break;
      case 68: //Button D
        if (arcade.state.inGame) {
          joystick.tweenAnimation("D").start(); // Button D
          player.move("right", speed);
        }
        break;
    }
  };

  const onDocumentKeyUp = ({ which }) => {
    let keyCode = which;
    switch (keyCode) {
      case 74: //Button J
        if (arcade.state.inGame) {
          button2.tweenAnimation2.start(); //Button J
          button2Pressed = false;
        }
        break;

      case 75: //Button K
        if (arcade.state.inGame) {
          button3.tweenAnimation2.start(); //Button K
          button3Pressed = false;
        }
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
    if (arcade.state.inGame) {
      screen.traverse((child) => {
        if (child.name == "spaceInvadersScreen") spaceInvadersGame = child;
      });
      if (spaceInvadersGame) spaceInvadersGame.spawnEnemiesInterval++;
      if (spaceInvadersGame.spawnEnemiesInterval === 150) {
        spaceInvadersGame.spawnEnemy(1, 1);
        spaceInvadersGame.spawnEnemiesInterval = 0;
      }
      spaceInvadersGame.updateGame();

      if (
        !spaceInvadersGame.gameManager.hearts.length &&
        !spaceInvadersGame.heartsHitZero
      ) {
        cameraObject.animations.orbit(
          2000,
          arcade.children[9].changeScreenState(arcade.state)
        );
        spaceInvadersGame.heartsHitsZero = true;
      }
    }
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
