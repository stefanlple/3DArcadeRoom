import * as THREE from "three";
import * as TWEEN from "tween";
import Stats from "../../../../lib/three.js-r145/examples/jsm/libs/stats.module.js";
import { EffectComposer } from "../../../../lib/three.js-r145/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../../../../lib/three.js-r145/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../../../../lib/three.js-r145/examples/jsm/postprocessing/UnrealBloomPass.js";

// Own modules
import Arcade from "./objects/Arcade.js";
import Enviroment from "./enviroment/enviroment.js";
import BlenderArcade from "./objects/BlenderArcade.js";
import Physics from "./physics/Physics.js";

// Event functions
import { updateAspectRatio } from "./eventfunctions/updateAspectRatio.js";
import { calculateMousePosition } from "./eventfunctions/calculateMousePosition.js";
import { executeRaycast } from "./eventfunctions/executeRaycast.js";
import {
  keyDownAction,
  keyUpAction,
} from "./eventfunctions/executeKeyAction.js";

import Camera from "./experience/Camera.js";

function main() {
  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(200));
  window.scene.name = "scene";

  window.renderer = new THREE.WebGLRenderer({ antialias: true });
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor();
  window.renderer.shadowMap.enabled = true;

  document.getElementById("3d_content").appendChild(window.renderer.domElement);

  window.physics = new Physics(false);
  window.physics.setup(0, -200, 0, 1 / 240, true);

  const room = new Enviroment();
  window.scene.add(room);

  const camera = new Camera();
  room.add(camera);
  camera.instanciate(window);

  /* const renderScene = new RenderPass(window.scene, window.camera);
  const composer = new EffectComposer(window.renderer);
  composer.addPass(renderScene);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1,
    0.1,
    1
  );
  composer.addPass(bloomPass); 

  renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 1.5; */

  const arcade = new Arcade();
  arcade.position.set(100 - 17.5338, 0, 0);
  arcade.addPhysics();
  window.scene.add(arcade);

  const blenderArcade = new BlenderArcade();
  blenderArcade.position.set(100 - 17.5338, 0, 60);
  window.scene.add(blenderArcade);

  //Animations onKeyDown
  const joystick = arcade.children[3];
  const screen = arcade.children[9];
  const button2 = arcade.children[1];
  const button3 = arcade.children[2];
  let button2Pressed = false;
  let button3Pressed = false;

  let blenderJoystick;
  let blenderScreen;
  let blenderButton2;
  let blenderButton3;
  let blenderButton2Pressed = false;
  let blenderButton3Pressed = false;

  let cylinder;

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
  let blenderSpaceInvadersGame;

  const onDocumentKeyDown = ({ which }) => {
    let keyCode = which;
    const speed = 0.615 * 2;
    const player = spaceInvadersGame?.children[0]?.children[0];
    const blenderArcadePlayer =
      blenderSpaceInvadersGame?.children[0]?.children[0];
    switch (keyCode) {
      case 74: //Button J
        if (blenderArcade.state.inGame) {
          if (!blenderButton2Pressed) {
            blenderButton2.tweenAnimation1.start();
            blenderButton2Pressed = true;
            blenderSpaceInvadersGame.shootOne(
              blenderSpaceInvadersGame,
              blenderArcadePlayer.position.y,
              blenderArcadePlayer.position.z
            );
          }
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
        if (blenderArcade.state.inGame) {
          if (!blenderButton3Pressed) {
            blenderButton3.tweenAnimation1.start();
            blenderButton3Pressed = true;
            blenderSpaceInvadersGame.shootTwo(
              blenderSpaceInvadersGame,
              blenderArcadePlayer.position.y,
              blenderArcadePlayer.position.z
            );
          }
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
        if (blenderArcade.state.inGame) {
          blenderJoystick.tweenAnimation(blenderJoystick, "W").start();
          blenderArcadePlayer.move("up", speed);
        }
        if (arcade.state.inGame) {
          joystick.tweenAnimation("W").start(); // Button W
          player.move("up", speed);
        }
        break;
      case 65: //Button A
        if (blenderArcade.state.inGame) {
          blenderJoystick.tweenAnimation(blenderJoystick, "A").start();
          blenderArcadePlayer.move("left", speed);
        }
        if (arcade.state.inGame) {
          joystick.tweenAnimation("A").start(); // Button A
          player.move("left", speed);
        }
        break;
      case 83: //Button S
        if (blenderArcade.state.inGame) {
          blenderJoystick.tweenAnimation(blenderJoystick, "S").start();
          blenderArcadePlayer.move("down", speed);
        }
        if (arcade.state.inGame) {
          joystick.tweenAnimation("S").start(); // Button S
          player.move("down", speed);
        }
        break;
      case 68: //Button D
        if (blenderArcade.state.inGame) {
          blenderJoystick.tweenAnimation(blenderJoystick, "D").start();
          blenderArcadePlayer.move("right", speed);
        }
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
        if (blenderArcade.state.inGame) {
          blenderButton2.tweenAnimation2.start();
          blenderButton2Pressed = false;
        }
        if (arcade.state.inGame) {
          button2.tweenAnimation2.start(); //Button J
          button2Pressed = false;
        }
        break;

      case 75: //Button K
        if (blenderArcade.state.inGame) {
          blenderButton3.tweenAnimation2.start();
          blenderButton3Pressed = false;
        }
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
    window.physics.update(delta);
    blenderArcade.setPedalPositionAnimation(blenderArcade.children[0]);
    arcade.pedalAnimation(arcade);

    if (blenderArcade.loadingDone) {
      blenderArcade.children.unshift(blenderArcade.children.pop());
      blenderJoystick = blenderArcade.children[0]?.children[0];
      blenderButton2 = blenderArcade.children[0]?.children[1];
      blenderButton3 = blenderArcade.children[0]?.children[2];
      cylinder = blenderArcade.children[0]?.children[6];
      blenderScreen = blenderArcade.children[0]?.children[10];
      blenderArcade.addPhysics();
      arcade.addSound();
      blenderArcade.addSound();
      blenderArcade.loadingDone = false;
    }
    //arcade game
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
    //blender arcade game
    if (blenderArcade.state.inGame) {
      blenderScreen.traverse((child) => {
        if (child.name == "spaceInvadersScreen")
          blenderSpaceInvadersGame = child;
      });
      if (blenderSpaceInvadersGame)
        blenderSpaceInvadersGame.spawnEnemiesInterval++;
      if (blenderSpaceInvadersGame.spawnEnemiesInterval === 150) {
        blenderSpaceInvadersGame.spawnEnemy(1, 1);
        blenderSpaceInvadersGame.spawnEnemiesInterval = 0;
      }
      blenderSpaceInvadersGame.updateGame();

      if (
        !blenderSpaceInvadersGame.gameManager.hearts.length &&
        !blenderSpaceInvadersGame.heartsHitZero
      ) {
        cameraObject.animations.orbit(
          2000,
          blenderScreen.changeScreenState(blenderArcade.state)
        );
        blenderSpaceInvadersGame.heartsHitsZero = true;
      }
    }

    TWEEN.update();

    /* bloom filter */
    //composer.render();

    /* without filter */
    window.renderer.render(window.scene, window.camera);

    requestAnimationFrame(mainLoop);
    stats.end();
  }

  mainLoop();
}

/* document.getElementById("startButton").addEventListener("click", function (event) {
  let highPerformance = document.getElementById("checkBox").checked;
  console.log("HighPerformance: " + highPerformance);
  main(highPerformance);
  document.getElementById("overlay").remove();
  window.onresize = updateAspectRatio;
  window.onmousemove = calculateMousePosition;
  window.onclick = executeRaycast;
  window.onkeydown = keyDownAction;
  window.onkeyup = keyUpAction;
});
 */
window.onload = main;
window.onresize = updateAspectRatio;
window.onmousemove = calculateMousePosition;
window.onclick = executeRaycast;
window.onkeydown = keyDownAction;
window.onkeyup = keyUpAction;
