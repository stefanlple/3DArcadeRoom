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

    /* canvas */
    //
    const screenGeometry = new THREE.PlaneGeometry(0.864, 1.13);
    screenGeometry.rotateY(Math.PI / 2);
    screenGeometry.rotateX(Math.PI / 2);
    screenGeometry.translate(-0.504, 1.85974, 0);
    screenGeometry.scale(35, 35, 35);
    const screen = new THREE.Mesh(screenGeometry, corpusMaterial2);
    this.add(screen);
  }
}
