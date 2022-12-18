import * as THREE from "three";
import { FontLoader } from "../../../../lib/three.js-r145/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../../../lib/three.js-r145/examples/jsm/geometries/TextGeometry.js";
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

    this.gameManager = {
      score: 0,
      hearts: [], //starts of with 3
      currentScoreMesh: [],
    };
    this.enemies = [];
    this.projectiles = [];
    this.coins = [];
    this.animations = [];
    this.addParts();
  }

  addParts() {
    const redMaterial = new THREE.MeshBasicMaterial({
      color: 0xf00000,
      side: THREE.DoubleSide,
    });

    document.video = document.createElement("video");
    document.video.src = "src/videos/DVD.mp4";
    document.video.loop = true;
    document.video.muted = "muted";
    document.video.play();
    const videoMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: new THREE.VideoTexture(document.video),
    });

    const blackScreenMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const playerMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      map: new THREE.TextureLoader().load("src/images/Spaceship.png"),
      side: THREE.DoubleSide,
    });
    const alienMaterial = new THREE.MeshPhongMaterial({
      color: 0x00aa00,
      flatShading: true,
      map: new THREE.TextureLoader().load("src/images/Alien.png"),
      side: THREE.DoubleSide,
    });

    /* canvas */
    //
    const screenWidth = 1.13;
    const screenHeight = 0.864;
    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
    screenGeometry.rotateY(Math.PI / 2);
    screenGeometry.scale(35, 35, 35);
    screenGeometry.translate(0.3, 0, 0);
    const screen = new THREE.Mesh(screenGeometry, blackScreenMaterial);
    //this.add(screen);

    /* player */
    //
    const playerSize = 0.075;
    const playerGeometry = new THREE.PlaneGeometry(playerSize, playerSize);
    playerGeometry.rotateY(Math.PI / 2);
    playerGeometry.scale(35, 35, 35);
    let player = new THREE.Mesh(playerGeometry, playerMaterial);
    screen.add(player);
    player.translateY(-(screenHeight / 2 - playerSize / 2) * 35 + 0.615);

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
      const bullet = new THREE.Mesh(bulletGeometry, redMaterial);
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

    const removeObject3D = (object) => {
      if (object.geometry) object.geometry.dispose();

      if (object.material) {
        if (object.material instanceof Array) {
          // for better memory management and performance
          object.material.forEach((material) => material.dispose());
        } else {
          // for better memory management and performance
          object.material.dispose();
        }
      }

      object.clear();
      object.removeFromParent();
      object = undefined; // the parent might be the scene or another object, but it is sure to be removed this way
      renderer.renderLists.dispose();
    };

    const updateBullet = () => {
      this.projectiles.forEach((projectile, index) => {
        const speed = 0.0122;
        if (
          projectile.position.y + projectile.radius * 35 + speed >=
          screen.position.y + (screenHeight * 35) / 2
        ) {
          this.projectiles.splice(index, 1);
          removeObject3D(projectile);
        }
        projectile.translateY(speed * 21);
      });
    };

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    //Enemies
    const createEnemy = (enemyWidth, enemyHeight) => {
      const enemyGeometry = new THREE.PlaneGeometry(enemyWidth, enemyHeight);
      enemyGeometry.rotateY(Math.PI / 2);
      enemyGeometry.scale(35, 35, 35);
      const enemy = new THREE.Mesh(enemyGeometry, alienMaterial);
      enemy.translateY((screenHeight / 2 - enemyHeight / 2) * 35);
      enemy.height = enemyHeight;
      enemy.width = enemyWidth;

      //spawn at random positions
      enemy.minSpawnpoint = (-screenWidth / 2 + enemyWidth / 2) * 35;
      enemy.maxSpawnpoint = (screenWidth / 2 - enemyWidth / 2) * 35;
      let spawnRange = randomInRange(enemy.minSpawnpoint, enemy.maxSpawnpoint);

      enemy.translateZ(spawnRange);
      return enemy;
    };

    this.spawnEnemy = () => {
      let sizes = [0.075];
      let enemy = createEnemy(sizes[0], sizes[0]);
      screen.add(enemy);
      this.enemies.push(enemy);
    };

    this.spawnEnemiesInterval = 0;
    const updateEnemies = () => {
      this.enemies.forEach((enemy, index) => {
        const speed = 0.0122;
        //hit detection with player
        if (this.gameManager.hearts.length <= 0) {
          //removeObject3D(this);
        }
        this.projectiles.forEach((projectile, indexProjectile) => {
          if (this.hitDetectionWithBullet(enemy, projectile)) {
            if (projectile.parent) {
              this.enemies.splice(index, 1);
              this.projectiles.splice(indexProjectile, 1);
              removeObject3D(enemy);
              removeObject3D(projectile);
              removeObject3D(this.gameManager.currentScoreMesh.pop());
              this.gameManager.score++;
              createScoreText();
            }
          }
        });

        if (this.hitDetectionWithPlayer(enemy)) {
          if (player.parent) {
            this.enemies.splice(index, 1);
            removeObject3D(enemy);
            removeObject3D(player);
            while (this.gameManager.hearts.length) {
              removeObject3D(this.gameManager.hearts.pop());
            }
          }
        }
        if (
          enemy.position.y - (enemy.height / 2) * 35 - speed <=
          screen.position.y - (screenHeight * 35) / 2
        ) {
          this.enemies.splice(index, 1);
          removeObject3D(enemy);
          removeObject3D(this.gameManager.hearts.pop());
        } else {
          enemy.translateY(-enemy.height * 2);
        }
      });
    };

    this.updateGame = () => {
      updateBullet();
      updateEnemies();
    };

    const hitZone = (position) => {
      return {
        z: position.z,
        y: position.y,
      };
    };

    //euclidean distance
    const getDistance = (coordinate1, coordinate2) => {
      return Math.sqrt(
        (coordinate2.z - coordinate1.z) ** 2 +
          (coordinate2.y - coordinate1.y) ** 2
      );
    };

    this.hitDetectionWithPlayer = (enemy) => {
      let playerHitZone = hitZone(player.position);
      let enemyHitZone = hitZone(enemy.position);

      const hitWithPlayerDistance = playerSize * 35;
      if (getDistance(playerHitZone, enemyHitZone) < hitWithPlayerDistance) {
        return true;
      }
    };

    this.hitDetectionWithBullet = (enemy, projectile) => {
      let enemyHitZone = hitZone(enemy.position);
      let projectileHitZone = hitZone(projectile.position);

      const collideDistance = playerSize * 35 - projectile.radius * 35;
      if (getDistance(projectileHitZone, enemyHitZone) < collideDistance) {
        return true;
      }
    };

    const particlesCount = 250;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPosition = new Float32Array(particlesCount * 3);
    const particlesSpawnPosition = {
      widthMin: (-screenWidth / 2) * 35,
      widthMax: (screenWidth / 2) * 35,
      heightMin: (-screenHeight / 2) * 35,
      heightMax: (screenHeight / 2) * 35,
    };

    for (
      let x = 0, y = 1, z = 2;
      x < particlesCount * 3;
      x += 3, y += 3, z += 3
    ) {
      particlesPosition[x] = 0.15;

      particlesPosition[y] = randomInRange(
        particlesSpawnPosition.heightMin,
        particlesSpawnPosition.heightMax
      );
      particlesPosition[z] = randomInRange(
        particlesSpawnPosition.widthMin,
        particlesSpawnPosition.widthMax
      );
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(particlesPosition), 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    screen.add(particles);

    const x = 0,
      y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const translateHeartsArray = [-1.5, 1.5, 4.5];
    for (let i = 0; i < 3; i++) {
      const heartGeometry = new THREE.ShapeGeometry(heartShape);
      heartGeometry.rotateY(Math.PI / 2);
      heartGeometry.rotateZ(Math.PI);
      heartGeometry.scale(0.1, 0.1, 0.1);
      const heart = new THREE.Mesh(heartGeometry, redMaterial);
      screen.add(heart);
      this.gameManager.hearts.push(heart);
      heart.translateY((screenHeight / 2) * 35 - 1.5);
      heart.translateZ((-screenHeight / 2) * 35 + translateHeartsArray[i]);
      heart.translateX(-0.1);
    }

    const createScoreText = () => {
      const scoreFontLoader = new FontLoader();

      scoreFontLoader.load(
        "../../../../lib/three.js-r145/examples/fonts/helvetiker_bold.typeface.json",
        (fonts) => {
          const scoreTextGeometry = new TextGeometry(
            `${this.gameManager.score}`,
            {
              height: 0.2,
              size: 2.5,
              font: fonts,
            }
          );
          const scoreTextMaterial = new THREE.MeshBasicMaterial({
            color: 0xffc000,
          });
          const textMesh = new THREE.Mesh(scoreTextGeometry, scoreTextMaterial);
          screen.add(textMesh);
          this.gameManager.currentScoreMesh.push(textMesh);
          textMesh.rotateY(-Math.PI / 2);
          textMesh.translateY((screenHeight / 2) * 35 - 4);
          textMesh.translateX(-1);
        }
      );
    };
    createScoreText();

    //Video Plane
    const videoPlaneGeometry = new THREE.PlaneGeometry(
      screenWidth,
      screenHeight
    );
    videoPlaneGeometry.rotateY(-Math.PI / 2);
    videoPlaneGeometry.scale(35, 35, 35);
    videoPlaneGeometry.translate(0.3, 0, 0);
    const videoPlane = new THREE.Mesh(videoPlaneGeometry, videoMaterial);
    this.add(videoPlane);

    const spawnCoins = () => {
      for (let i = 0; i < this.gameManager.score; i++) {
        const coinGeometry = new THREE.CylinderGeometry(
          playerSize / 2,
          playerSize / 2,
          0.0175,
          32
        );
        coinGeometry.rotateY(Math.PI / 2);
        coinGeometry.scale(35, 35, 35);
        const coinMaterial = new THREE.MeshStandardMaterial({
          side: THREE.DoubleSide,
          metalness: 0.2,
          roughness: 0.1,
          color: 0xffc000,
        });
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.translateX(-13.5);
        coin.translateY(-32);
        coin.rotateZ(Math.PI / 2);
        this.coins.push(coin);
        screen.add(coin);
      }
    };
  }
}
