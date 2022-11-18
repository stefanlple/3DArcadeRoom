import * as THREE from "three";

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
      //other side of outercorpus
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
    ].map((e) => 35 * e);

    const indices = [
      //right outer side of arcade
      0, 1, 3, 1, 2, 3, 0, 3, 9, 3, 4, 9, 4, 8, 9, 4, 7, 8, 4, 6, 7, 4, 5, 6,
      //right outer side other side of arcade
      10, 11, 13, 11, 12, 13, 10, 13, 19, 13, 14, 19, 14, 18, 19, 14, 17, 18,
      14, 16, 17, 14, 15, 16,
      //merge two planes --- pattern increment by 1 every 3 or 6
      0, 9, 19, 0, 10, 19, 0, 1, 10, 1, 10, 11, 1, 11, 2, 2, 12, 11, 2, 3, 13,
      2, 13, 12, 3, 4, 14, 3, 14, 13, 4, 5, 15, 4, 14, 15, 5, 6, 16, 5, 15, 16,
      6, 7, 17, 6, 16, 17, 7, 8, 18, 7, 17, 18, 8, 9, 19, 8, 18, 19,
    ];

    function toDouble(modArray) {
      for (var i = 2; i < modArray.length; i += 3) {
        modArray[i] -= 0.099132;
        //modArray[i] += 5000;
      }
      return modArray;
    }

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
  }
}
