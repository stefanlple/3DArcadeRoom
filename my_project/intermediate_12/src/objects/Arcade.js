import * as THREE from "three";
import {
  Animation,
  AnimationType,
  AnimationAxis,
} from "../animation/Animation.js";
import CSG from "../../../../lib/three-CSGMesh/three-csg.js";
import * as TWEEN from "tween";
import { MathUtils } from "three";

export default class Arcade extends THREE.Group {
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

    /*corpus*/
    /*------*/

    // Outer Corpus
    // Start upper left and clockwise
    // ------
    const positions = [
      //right side of rightWing plane
      -0.542951,
      2.91963,
      0.691061, //0
      -0.779445,
      2.77506,
      0.691061, //1
      -0.797771,
      2.47766,
      0.691061, //2
      -0.506879,
      2.32456,
      0.691061, //3
      -0.581514,
      1.49935,
      0.691061, //4
      -0.990774,
      1.50038,
      0.691061, //5
      -0.990774,
      1.15698,
      0.691061, //6
      -0.739914,
      0,
      0.691061, // 7
      0.499795,
      0,
      0.691061, //8
      0.498101,
      2.77506,
      0.691061, //9

      //left side of rightWing plane
      -0.542951,
      2.91963,
      0.591929, //10
      -0.779445,
      2.77506,
      0.591929, //11
      -0.797771,
      2.47766,
      0.591929, //12
      -0.506879,
      2.32456,
      0.591929, //13
      -0.581514,
      1.49935,
      0.591929, //14
      -0.990774,
      1.50038,
      0.591929, //15
      -0.990774,
      1.15698,
      0.591929, //16
      -0.739914,
      0,
      0.591929, //17
      0.499795,
      0,
      0.591929, //18
      0.498101,
      2.77506,
      0.591929, // 19

      //right side of leftWing
      -0.542951,
      2.91963,
      -0.591929, //20
      -0.779445,
      2.77506,
      -0.591929, //21
      -0.797771,
      2.47766,
      -0.591929, //22
      -0.506879,
      2.32456,
      -0.591929, //23
      -0.581514,
      1.49935,
      -0.591929, //24
      -0.990774,
      1.50038,
      -0.591929, //25
      -0.990774,
      1.15698,
      -0.591929, //26
      -0.739914,
      0,
      -0.591929, //27
      0.499795,
      0,
      -0.591929, //28
      0.498101,
      2.77506,
      -0.591929, //29
      //left side of rightWing
      -0.542951,
      2.91963,
      -0.691061, //30
      -0.779445,
      2.77506,
      -0.691061, //31
      -0.797771,
      2.47766,
      -0.691061, //32
      -0.506879,
      2.32456,
      -0.691061, //33
      -0.581514,
      1.49935,
      -0.691061, //34
      -0.990774,
      1.50038,
      -0.691061, //35
      -0.990774,
      1.15698,
      -0.691061, //36
      -0.739914,
      0,
      -0.691061, //37
      0.499795,
      0,
      -0.691061, //38
      0.498101,
      2.77506,
      -0.691061, //39
      //right side of corpus
      -0.552276,
      2.81251,
      0.591929, //40
      -0.733992,
      2.70058,
      0.591929, //41
      -0.744387,
      2.55882,
      0.591929, //42
      -0.439962,
      2.39965,
      0.591929, //43
      -0.529323,
      1.39492,
      0.591929, //44
      -0.930213,
      1.39475,
      0.591929, //45
      -0.930213,
      1.17913,
      0.591929, //46
      -0.700348,
      0.10857,
      0.591929, //47
      0.439235,
      0.105621,
      0.591929, //48
      0.431033,
      2.67783,
      0.591929, //49
      //left side of corpus
      -0.552276,
      2.81251,
      -0.591929, //50
      -0.733992,
      2.70058,
      -0.591929, //51
      -0.744387,
      2.55882,
      -0.591929, //52
      -0.439962,
      2.39965,
      -0.591929, //53
      -0.529323,
      1.39492,
      -0.591929, //54
      -0.930213,
      1.39475,
      -0.591929, //55
      -0.930213,
      1.17913,
      -0.591929, //56
      -0.700348,
      0.10857,
      -0.591929, //57
      0.439235,
      0.105621,
      -0.591929, //58
      0.431033,
      2.67783,
      -0.591929, //59
    ].map((e) => 35 * e);

    const indices = [
      //every 3 indices is a triangle

      /* --right outerWing-- */
      //right outerWing right side
      0, 1, 3, 1, 2, 3, 0, 3, 9, 3, 4, 9, 4, 8, 9, 4, 7, 8, 4, 6, 7, 4, 5, 6,
      //right outerWing side left side
      10, 11, 13, 11, 12, 13, 10, 13, 19, 13, 14, 19, 14, 18, 19, 14, 17, 18,
      14, 16, 17, 14, 15, 16,
      //merge two planes --- pattern increment by 1
      0, 9, 19, 0, 10, 19, 0, 1, 10, 1, 10, 11, 1, 11, 2, 2, 12, 11, 2, 3, 13,
      2, 13, 12, 3, 4, 14, 3, 14, 13, 4, 5, 15, 4, 14, 15, 5, 6, 16, 5, 15, 16,
      6, 7, 17, 6, 16, 17, 7, 8, 18, 7, 17, 18, 8, 9, 19, 8, 18, 19,

      /* --left outerwing-- */
      //left outerWing right side
      20, 21, 23, 21, 22, 23, 20, 23, 29, 23, 24, 29, 24, 28, 29, 24, 27, 28,
      24, 26, 27, 24, 25, 26,
      //left outerWing left side
      30, 31, 33, 31, 32, 33, 30, 33, 39, 33, 34, 39, 34, 38, 39, 34, 37, 38,
      34, 36, 37, 34, 35, 36,
      //merge two planes --- pattern increment by 1
      20, 29, 39, 20, 30, 39, 20, 21, 30, 21, 30, 31, 21, 31, 22, 22, 32, 31,
      22, 23, 33, 22, 33, 32, 23, 24, 34, 23, 34, 33, 24, 25, 35, 24, 34, 35,
      25, 26, 36, 25, 35, 36, 26, 27, 37, 26, 36, 37, 27, 28, 38, 27, 37, 38,
      28, 29, 39, 28, 38, 39,

      /* --corpus-- */
      //merge two planes --- pattern increment by 1
      40, 49, 59, 40, 50, 59, 40, 41, 50, 41, 50, 51, 1, 51, 42, 42, 52, 51, 42,
      43, 53, 42, 53, 52, 43, 44, 54, 43, 54, 53, 44, 45, 55, 44, 54, 55, 45,
      46, 56, 45, 55, 56, 46, 47, 57, 46, 56, 57, 47, 48, 58, 47, 57, 58, 48,
      49, 59, 48, 58, 59,
    ];

    function toDouble(modArray) {
      for (var i = 2; i < modArray.length; i += 3) {
        modArray[i] -= 0.073296;
        //modArray[i] += 5000;
      }
      return modArray;
    }
    //corpus
    const corpusGeometry = new THREE.BufferGeometry();
    corpusGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    corpusGeometry.setIndex(indices);
    corpusGeometry.computeVertexNormals();
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.castShadow = true;
    this.add(corpus);

    //buttonHolder
    const buttonHolderGeometry = new THREE.CylinderGeometry(
      0.0571145,
      0.0571145,
      0.0288,
      8
    );
    buttonHolderGeometry.scale(35, 35, 35);

    const buttonHolder1 = new THREE.Mesh(buttonHolderGeometry, corpusMaterial);
    buttonHolder1.position.set(-0.758528 * 35, 1.3904 * 35, +0.321495 * 35);
    corpus.add(buttonHolder1);

    const buttonHolder2 = buttonHolder1.clone();
    buttonHolder2.position.set(-0.758528 * 35, 1.3904 * 35, -0.181031 * 35);
    corpus.add(buttonHolder2);

    const buttonHolder3 = buttonHolder1.clone();
    buttonHolder3.position.set(-0.758528 * 35, 1.3904 * 35, -0.353658 * 35);
    corpus.add(buttonHolder3);

    //button 2 -> first in the 2nd buttonholder slot
    const buttonGeometry = new THREE.CylinderGeometry(
      0.0393855,
      0.0393855,
      0.019893,
      8
    );
    buttonGeometry.scale(35, 35, 35);
    const button2 = new THREE.Mesh(buttonGeometry, corpusMaterial2);
    button2.position.set(-0.758528 * 35, 1.41056 * 35, -0.181031 * 35);
    this.add(button2);

    //button2 & button3 Animation;
    const toggleButtonTween = (object) => {
      return new TWEEN.Tween(object.position)
        .to(
          new THREE.Vector3(
            object.position.x,
            object.position.y - 0.01413 * 35,
            object.position.z
          ),
          150
        )
        .chain(
          new TWEEN.Tween(object.position).to(
            new THREE.Vector3(
              object.position.x,
              object.position.y,
              object.position.z
            ),
            150
          )
        );
    };
    button2.tweenAnimation = toggleButtonTween(button2);

    //button3
    const button3 = button2.clone();
    button3.position.set(-0.758528 * 35, 1.41056 * 35, -0.353658 * 35);
    this.add(button3);

    //button3 Animation;
    button3.tweenAnimation = toggleButtonTween(button3);

    /*joyStick*/
    /*--------*/

    //stick
    const stickGeometry = new THREE.CylinderGeometry(
      0.018595,
      0.018595,
      0.147959,
      10
    );
    stickGeometry.scale(35, 35, 35);
    stickGeometry.translate(0, 0.042026 * 35, 0);
    const stick = new THREE.Mesh(stickGeometry, corpusMaterial2);

    //ball
    const ballGeometry = new THREE.SphereGeometry(0.0415);
    ballGeometry.scale(35, 35, 35);
    //ballGeometry.translate(-0.758528 * 35, 1.515 * 35, 0.321495 * 35);
    ballGeometry.translate(0, (1.515 - 1.44271) * 35 + 0.042026 * 35, 0);
    const ball = new THREE.Mesh(ballGeometry, corpusMaterial);

    //joystick
    const stickCSG = CSG.fromMesh(stick);
    const ballCSG = CSG.fromMesh(ball);
    const joystick = CSG.toMesh(
      stickCSG.union(ballCSG),
      stick.matrix,
      stick.material
    );
    joystick.position.set(-0.759288 * 35, 1.39423 * 35, 0.321495 * 35);
    joystick.castShadow = true;
    this.add(joystick);

    //joystickAnimation
    const toggleJoystickTween = (direction) => {
      let directionVector = new THREE.Vector3(
        (joystick.rotation.x = 0),
        (joystick.rotation.y = 0),
        (joystick.rotation.z = 0)
      );
      switch (direction) {
        case "W":
          directionVector.z -= THREE.MathUtils.degToRad(15);
          break;
        case "S":
          directionVector.z += THREE.MathUtils.degToRad(15);
          break;
        case "A":
          directionVector.x -= THREE.MathUtils.degToRad(15);
          break;
        case "D":
          directionVector.x += THREE.MathUtils.degToRad(15);
          break;
        default:
          directionVector;
      }
      return new TWEEN.Tween(joystick.rotation)
        .to(directionVector, 150)
        .chain(
          new TWEEN.Tween(joystick.rotation).to(
            new THREE.Vector3(
              joystick.rotation.x,
              joystick.rotation.y,
              joystick.rotation.z
            ),
            150
          )
        );
    };

    joystick.tweenAnimation = toggleJoystickTween;

    /*coin mashine*/
    /*------------*/
    const coinMashineGeometry = new THREE.BoxGeometry(
      0.142827,
      0.374662,
      0.43747
    );
    coinMashineGeometry.scale(35, 35, 35);
    coinMashineGeometry.translate(-0.856942 * 35, 0.968442 * 35, 0.000747 * 35);
    const coinMashineBody = new THREE.Mesh(
      coinMashineGeometry,
      corpusMaterial2
    );

    //coin mashine cavity
    const coinMashineCavityGeometry = new THREE.BoxGeometry(
      0.182579,
      0.17851,
      0.27444
    );
    coinMashineCavityGeometry.scale(35, 35, 35);
    coinMashineCavityGeometry.translate(
      -0.845961 * 35,
      0.910578 * 35,
      0.001557 * 35
    );
    const coinMashineCavity = new THREE.Mesh(
      coinMashineCavityGeometry,
      corpusMaterial
    );

    //coin slot
    const coinSlotGeometry = new THREE.BoxGeometry(0.25, 0.042678, 0.017);
    coinSlotGeometry.scale(35, 35, 35);
    coinSlotGeometry.translate(-0.87 * 35, 1.06167 * 35, 0.03771 * 35);
    const coinSlot = new THREE.Mesh(coinSlotGeometry, corpusMaterial);

    //coin mashine CSG
    const coinMashineBodyCSG = CSG.fromMesh(coinMashineBody);
    const coinMashineCavityCSG = CSG.fromMesh(coinMashineCavity);
    const coinSlotCSG = CSG.fromMesh(coinSlot);
    const coinMashine = CSG.toMesh(
      coinMashineBodyCSG.subtract(coinSlotCSG).subtract(coinMashineCavityCSG),
      coinMashineBody.matrix,
      coinMashineBody.material
    );
    coinMashineBody.castShadow = true;
    this.add(coinMashine);

    //coin mashine button
    const coinMashineButtonGeometry = new THREE.BoxGeometry(
      0.037767,
      0.035593,
      0.0305
    );
    coinMashineButtonGeometry.scale(35, 35, 35);
    const coinMashineButton = new THREE.Mesh(
      coinMashineButtonGeometry,
      corpusMaterial2
    );
    coinMashineButton.position.set(-0.925485 * 35, 1.0619 * 35, -0.011276 * 35);
    coinMashine.add(coinMashineButton);

    //coin mashine buttonholder
    const coinMashineButtonHolderGeometry = new THREE.BoxGeometry(
      0.037769,
      0.052703,
      0.04475
    );
    coinMashineButtonHolderGeometry.scale(35, 35, 35);
    const coinMashineButtonHolder = new THREE.Mesh(
      coinMashineButtonHolderGeometry,
      corpusMaterial
    );
    coinMashineButtonHolder.position.set(
      -0.916687 * 35,
      1.0619 * 35,
      -0.011106 * 35
    );
    coinMashine.add(coinMashineButtonHolder);

    /* pedal mashine */
    /*---------------*/
    const pedalMashineCorpusPosition = [
      -1.39038,
      0.641729,
      0.036648, //0
      -1.39038,
      0.276415,
      0.036648, //1
      -0.694447,
      0.329801,
      0.036648, //2
      -0.694447,
      0.588343,
      0.036648, //3
      -1.39038,
      0.641729,
      -0.036648, //4
      -1.39038,
      0.276415,
      -0.036648, //5
      -0.694447,
      0.329801,
      -0.036648, //6
      -0.694447,
      0.588343,
      -0.036648, //7
    ].map((e) => 35 * e);

    const pedalMashineCorpusIndices = [
      //right side
      0, 1, 2, 0, 2, 3,
      //left side
      4, 5, 6, 4, 6, 7,
      //connect both sides
      0, 3, 7, 0, 4, 7, 0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3,
    ];

    //pedalMashineCorpus
    const pedalMashineCorpusGeometry = new THREE.BufferGeometry();
    pedalMashineCorpusGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pedalMashineCorpusPosition), 3)
    );
    pedalMashineCorpusGeometry.setIndex(pedalMashineCorpusIndices);
    pedalMashineCorpusGeometry.computeVertexNormals();
    const pedalMashineCorpus = new THREE.Mesh(
      pedalMashineCorpusGeometry,
      corpusMaterial
    );
    pedalMashineCorpus.castShadow = true;
    this.add(pedalMashineCorpus);

    //cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(
      (0.367916 / 2) * 35,
      (0.367916 / 2) * 35,
      0.073079 * 35,
      32
    );
    cylinderGeometry.rotateX(Math.PI / 2);
    const cylinder = new THREE.Mesh(cylinderGeometry, corpusMaterial2);

    //pedalRight
    const pedalRightGeometry = new THREE.BoxGeometry(
      0.137131 * 35,
      0.044733 * 35,
      0.172584 * 35
    );
    const pedalRight = new THREE.Mesh(pedalRightGeometry, corpusMaterial);
    pedalRight.position.set(-1.41066 * 35, 0.804968 * 35, 0.154831 * 35);
    this.add(pedalRight);

    //pedalLeft
    const pedalLeft = pedalRight.clone();
    pedalLeft.position.set(-1.41066 * 35, 0.11387 * 35, -0.154831 * 35);
    this.add(pedalLeft);

    //pedal spinning
    const pedalSpinningAnimation = (object, degrees) => {
      let tween = new TWEEN.Tween(object.position).to(
        new THREE.Vector3(
          Math.cos(THREE.MathUtils.degToRad(degrees)) * 35,
          Math.sin(THREE.MathUtils.degToRad(degrees)) * 35,
          object.position.z
        ),
        100
      );
      return tween; //.easing(TWEEN.Easing.Cubic.InOut);
    };
    pedalRight.tweenAnimation = pedalSpinningAnimation(pedalRight);
    //pedalLeft.tweenAnimation = pedalSpinningAnimation(pedalLeft);

    /* const pedalAnimationX = new Animation(
      pedalRight,
      AnimationType.TRANSLATION,
      AnimationAxis.X
    );
    pedalAnimationX.setAmount(Math.cos(THREE.MathUtils.degToRad(10)));
    pedalAnimationX.setSpeed(THREE.MathUtils.degToRad(360));
    pedalRight.rightAnimation = pedalAnimationX;
    this.animations.push(pedalAnimationX);

    const pedalAnimationY = new Animation(
      pedalLeft,
      AnimationType.TRANSLATION,
      AnimationAxis.Y
    );
    pedalAnimationY.setAmount(Math.sin(THREE.MathUtils.degToRad(10)));
    pedalAnimationY.setSpeed(THREE.MathUtils.degToRad(360));
    pedalRight.rightAnimation = pedalAnimationY;
    this.animations.push(pedalAnimationY); */

    //pedalStickRight
    const pedalStickRightGeometry = new THREE.BoxGeometry(
      0.07 * 35,
      0.367916 * 35,
      0.032 * 35
    );
    pedalStickRightGeometry.translate(
      0,
      0.367916 * 35 - 0.18399 * 35,
      0.0365395 * 35 + 0.016 * 35
    );
    const pedalStickRight = new THREE.Mesh(
      pedalStickRightGeometry,
      corpusMaterial
    );

    //pedalStickLeft
    const pedalStickLeftGeometry = new THREE.BoxGeometry(
      0.07 * 35,
      0.367916 * 35,
      0.032 * 35
    );
    pedalStickLeftGeometry.translate(
      0,
      -0.367916 * 35 - -0.18399 * 35,
      -0.0365395 * 35 + -0.016 * 35
    );
    const pedalStickLeft = new THREE.Mesh(
      pedalStickLeftGeometry,
      corpusMaterial
    );

    const cylinderCSG = CSG.fromMesh(cylinder);
    const pedalStickRightCSG = CSG.fromMesh(pedalStickRight);
    const pedalStickLeftCSG = CSG.fromMesh(pedalStickLeft);
    const cylinderBody = CSG.toMesh(
      cylinderCSG.union(pedalStickLeftCSG).union(pedalStickRightCSG),
      cylinder.matrix,
      cylinder.material
    );
    cylinderBody.position.set(-1.41066 * 35, 0.459419 * 35, 0);

    cylinderBody.castShadow = true;
    this.add(cylinderBody);

    //cylinderBody spinning animation
    cylinderBody.tweenAnimation = new TWEEN.Tween(cylinderBody.rotation)
      .to(
        new THREE.Vector3(
          cylinderBody.rotation.x,
          cylinderBody.rotation.y,
          cylinderBody.rotation.z - 8 * Math.PI
        ),
        3000
      )
      .easing(TWEEN.Easing.Cubic.InOut);
  }
}
