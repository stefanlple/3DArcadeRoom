import * as THREE from "three";
import CSG from "../../../../lib/three-CSGMesh/three-csg.js";

export default class Arcade extends THREE.Group {
  constructor() {
    super();

    this.addParts();
  }

  addParts() {
    const corpusMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4000,
      flatShading: true,
      side: THREE.DoubleSide,
    });

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
        modArray[i] -= 1.183858;
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
    //this.add(corpus);

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
    this.add(buttonHolder1);

    const buttonHolder2 = buttonHolder1.clone();
    buttonHolder2.position.set(-0.758528 * 35, 1.3904 * 35, -0.181031 * 35);
    this.add(buttonHolder2);

    const buttonHolder3 = buttonHolder1.clone();
    buttonHolder3.position.set(-0.758528 * 35, 1.3904 * 35, -0.353658 * 35);
    this.add(buttonHolder3);

    //button
    const buttonGeometry = new THREE.CylinderGeometry(
      0.0393855,
      0.0393855,
      0.019893,
      8
    );
    buttonGeometry.scale(35, 35, 35);
    const button2 = new THREE.Mesh(buttonGeometry, corpusMaterial);
    button2.position.set(-0.758528 * 35, 1.41056 * 35, -0.181031 * 35);
    this.add(button2);

    const button3 = button2.clone();
    button3.position.set(-0.758528 * 35, 1.41056 * 35, -0.353658 * 35);
    this.add(button3);

    //joystick

    //stick
    const stickGeometry = new THREE.CylinderGeometry(
      0.018595,
      0.018595,
      0.147959,
      10
    );
    stickGeometry.scale(35, 35, 35);
    const stick = new THREE.Mesh(stickGeometry, corpusMaterial);
    stick.position.set(-0.759288 * 35, 1.44271 * 35, 0.321495 * 35);
    this.add(stick);

    //ball
    const ballGeometry = new THREE.SphereGeometry(0.0415);
    ballGeometry.scale(35, 35, 35);
    const ball = new THREE.Mesh(ballGeometry, corpusMaterial);
    ball.position.set(-0.758528 * 35, 1.515 * 35, 0.321495 * 35);
    this.add(ball);

    const stickCSG = CSG.fromMesh(stick);
    const ballCSG = CSG.fromMesh(ball);
    const joystick = CSG.toMesh(
      stickCSG.union(ballCSG),
      stick.matrix,
      stick.material
    );
    joystick.castShadow = true;
    this.add(joystick);
  }
}
