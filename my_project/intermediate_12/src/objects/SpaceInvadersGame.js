import * as THREE from "three";
import {
  Animation,
  AnimationType,
  AnimationAxis,
} from "../animation/Animation.js";
import CSG from "../../../../lib/three-CSGMesh/three-csg.js";
import * as TWEEN from "tween";
import { MathUtils } from "three";

export default class SpaceInvadersGame extends THREE.Group {
  constructor() {
    super();

    this.animations = [];
    this.addParts();
  }

  addParts() {
    const corpusMaterial = new THREE.MeshPhongMaterial({
      color: 0xf00000,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const corpusMaterial2 = new THREE.MeshPhongMaterial({
      color: 0xff50f0,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const corpusMaterial3 = new THREE.MeshPhongMaterial({
      color: 0x00000,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    /* canvas */
    //
    const screenWidth = 1.13;
    const screenHeight = 0.864;
    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
    screenGeometry.rotateY(Math.PI / 2);

    screenGeometry.scale(35, 35, 35);
    screenGeometry.translate(0.005, 0, 0);
    const screen = new THREE.Mesh(screenGeometry, corpusMaterial3);
    this.add(screen);

    /* player */
    //
    const playerSize = 0.075;
    const playerGeometry = new THREE.PlaneGeometry(playerSize, playerSize);
    playerGeometry.rotateY(Math.PI / 2);
    playerGeometry.scale(35, 35, 35);
    const player = new THREE.Mesh(playerGeometry, corpusMaterial2);
    this.add(player);
    player.translateY(-(screenHeight / 2 - playerSize / 2) * 35);

    player.move = (direction, speed) => {
      switch (direction) {
        case "right":
          if (
            /* player.position.z + (playerSize * 35) / 2 <=
            screen.position.z + (screenWidth * 35) / 2 */
            true
          ) {
            player.translateZ(speed);
            break;
          }
        case "left":
          if (
            /* player.position.z + (playerSize * 35) / 2 >=
            screen.position.z + (screenWidth * 35) / 2 */
            true
          ) {
            player.translateZ(-speed);
            break;
          }
        case "up":
          if (
            /* player.position.z + (playerSize * 35) / 2 <=
            screen.position.z + (screenWidth * 35) / 2 */
            true
          ) {
            player.translateY(speed);
            break;
          }
        case "down":
          if (
            /* player.position.z + (playerSize * 35) / 2 <=
            screen.position.z + (screenWidth * 35) / 2 */
            true
          ) {
            player.translateY(-speed);
            break;
          }
      }
    };
  }
}
