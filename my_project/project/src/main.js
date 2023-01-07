import * as THREE from "three";
import * as CONTROLS from "controls";
import * as TWEEN from "tween";
import Stats from "../../../../lib/three.js-r145/examples/jsm/libs/stats.module.js";

// Own modules
import Arcade from "./objects/Arcade.js";
import Enviroment from "./enviroment/enviroment.js";
import BlenderArcade from "./objects/BlenderArcade.js";

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
  arcade.position.set(100, 0, 0);
  window.scene.add(arcade);

  const blenderArcade = new BlenderArcade();
  window.scene.add(blenderArcade);

  const room = new Enviroment();
  window.scene.add(room);

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor();
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  const camera = new Camera();
  room.add(camera);
  camera.instanciate(window);

  //Animations onKeyDown
  const joystick = arcade.children[3];
  const screen = arcade.children[9];
  const button2 = arcade.children[1];
  const button3 = arcade.children[2];
  let button2Pressed = false;
  let button3Pressed = false;

  let blenderJoystick;
  let blenderScreen = arcade.children[9];
  let blenderButton2;
  let blenderButton3;
  let blenderButton2Pressed = false;
  let blenderButton3Pressed = false;
  setTimeout(() => {
    blenderJoystick = blenderArcade.children[0]?.children[0];
    blenderButton2 = blenderArcade.children[0]?.children[1];
    blenderButton3 = blenderArcade.children[0]?.children[2];
    console.log(blenderArcade.children[0]);
  }, 1000);

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

  const onDocumentKeyDown = ({ which }) => {
    let keyCode = which;
    const speed = 0.615 * 2;
    const player = spaceInvadersGame?.children[0]?.children[0];
    switch (keyCode) {
      case 74: //Button J
        if (!blenderButton2Pressed) {
          blenderButton2.tweenAnimation1.start();
          blenderButton2Pressed = true;
        }
        if (arcade.state.inGame) {
          if (!button2Pressed) {
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
        if (!blenderButton3Pressed) {
          blenderButton3.tweenAnimation1.start();
          blenderButton3Pressed = true;
        }
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
        blenderJoystick.tweenAnimation(blenderJoystick, "W").start();
        if (arcade.state.inGame) {
          joystick.tweenAnimation("W").start(); // Button W
          player.move("up", speed);
        }
        break;
      case 65: //Button A
        blenderJoystick.tweenAnimation(blenderJoystick, "A").start();
        if (arcade.state.inGame) {
          joystick.tweenAnimation("A").start(); // Button A
          player.move("left", speed);
        }
        break;
      case 83: //Button S
        blenderJoystick.tweenAnimation(blenderJoystick, "S").start();
        if (arcade.state.inGame) {
          joystick.tweenAnimation("S").start(); // Button S
          player.move("down", speed);
        }
        break;
      case 68: //Button D
        blenderJoystick.tweenAnimation(blenderJoystick, "D").start();
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
        blenderButton2.tweenAnimation2.start();
        blenderButton2Pressed = false;
        if (arcade.state.inGame) {
          button2.tweenAnimation2.start(); //Button J
          button2Pressed = false;
        }
        break;

      case 75: //Button K
        blenderButton3.tweenAnimation2.start();
        blenderButton3Pressed = false;
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
    /* console.log(blenderArcade.children[0]); */
    /* console.log(blenderJoystick); */
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
