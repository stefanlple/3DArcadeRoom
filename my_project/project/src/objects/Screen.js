import SpaceInvadersGame from "./SpaceInvadersGame.js";
import DVDScreen from "./DVDScreen.js";
import * as THREE from "three";
import { removeObject3D } from "../utility/removeObject3D.js";

export default class Screen extends THREE.Group {
  constructor() {
    super();
    this.addParts();
    this.screenState = "dvd";
  }
  addParts() {
    this.createScreen();
    this.changeScreenState = (arcadeState) => {
      if (this.screenState === "game") {
        this.traverse((child) => {
          if (child.name === "spaceInvadersScreen") {
            removeObject3D(child);
          }
        });
        console.log(arcadeState);
        arcadeState.inGame = false;
        this.createScreen();
      } else {
        this.traverse((child) => {
          if (child.name === "DVDScreen") {
            removeObject3D(child);
          }
        });
        arcadeState.inGame = true;
        this.createGame();
      }
    };
  }

  createGame = () => {
    const spaceInvadersGame = new SpaceInvadersGame();
    this.add(spaceInvadersGame);
    spaceInvadersGame.name = "spaceInvadersScreen";
    this.screenState = "game";
  };

  createScreen = () => {
    const dvdScreen = new DVDScreen();
    this.add(dvdScreen);
    dvdScreen.name = "DVDScreen";
    this.screenState = "dvd";
  };
}
