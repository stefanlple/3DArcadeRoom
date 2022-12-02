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

    this.enemies = [];
    this.projectiles = [];
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
      color: 0x00ff00,
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
            player.position.z + (playerSize * 35) / 2 + speed <=
            screen.position.z + (screenWidth * 35) / 2
          ) {
            player.translateZ(speed);
          }
          break;
        case "left":
          if (
            player.position.z - (playerSize * 35) / 2 - speed >=
            screen.position.z - (screenWidth * 35) / 2
          ) {
            player.translateZ(-speed);
          }
          break;
        case "up":
          if (
            player.position.y + (playerSize * 35) / 2 + speed <=
            screen.position.y + (screenHeight * 35) / 2
          ) {
            player.translateY(speed);
          }
          break;
        case "down":
          if (
            player.position.y - (playerSize * 35) / 2 - speed >=
            screen.position.y - (screenHeight * 35) / 2
          ) {
            player.translateY(-speed);
          }
          break;
      }
    };

    const bulletRadiusBig = 0.0122;
    const bulletRadiusSmall = 0.009;

    const createBullet = (bulletRadius) => {
      const bulletGeometry = new THREE.CircleGeometry(bulletRadius, 32);
      bulletGeometry.rotateY(Math.PI / 2);
      bulletGeometry.scale(35, 35, 35);
      const bullet = new THREE.Mesh(bulletGeometry, corpusMaterial2);
      return bullet;
    };

    this.shootOne = (screen, playerPositionY, playerPositionZ) => {
      let bullet = createBullet(bulletRadiusBig);
      bullet.radius = bulletRadiusBig;
      bullet.translateY(
        playerPositionY + (playerSize / 2) * 35 + bulletRadiusBig * 35
      );
      bullet.translateZ(playerPositionZ);
      screen.add(bullet);
      this.projectiles.push(bullet);
    };

    this.shootTwo = (screen, playerPositionY, playerPositionZ) => {
      let bullet1 = createBullet(bulletRadiusSmall);
      bullet1.radius = bulletRadiusSmall;
      let bullet2 = createBullet(bulletRadiusSmall);
      bullet2.radius = bulletRadiusSmall;
      bullet1.translateY(
        playerPositionY + (playerSize / 2) * 35 + bulletRadiusSmall * 35
      );
      bullet2.translateY(
        playerPositionY + (playerSize / 2) * 35 + bulletRadiusSmall * 35
      );
      bullet1.translateZ(playerPositionZ + (playerSize / 2) * 35);
      bullet2.translateZ(playerPositionZ - (playerSize / 2) * 35);
      screen.add(bullet1);
      screen.add(bullet2);
      this.projectiles.push(bullet1);
      this.projectiles.push(bullet2);
    };

    this.updateBullet = () => {
      this.projectiles.forEach((projectile, index) => {
        const speed = 0.0122;
        if (
          projectile.position.y + projectile.radius * 35 + speed >=
          screen.position.y + (screenHeight * 35) / 2
        ) {
          this.projectiles.splice(index, 1);
          projectile.removeFromParent();
        }
        projectile.translateY(speed * 11);
      });
    };

    const createEnemy = (enemyWidth) => {
      const enemyGeometry = new THREE.PlaneGeometry(enemyWidth, 0.075);
      enemyGeometry.rotateY(Math.PI / 2);
      enemyGeometry.scale(35, 35, 35);
      const bullet = new THREE.Mesh(enemyGeometry, corpusMaterial3);
      return bullet;
    };

    const spawnEnemy = (range1, range2) => {};
  }
}
