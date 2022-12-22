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
      console.log(this.screenState);
      if (this.screenState === "game") {
        console.log("hallo");
        this.traverse((child) => {
          if (child.name === "spaceInvadersScreen") {
            removeObject3D(child);
          }
        });

        this.createScreen();
        arcadeState.inGame = false;
        console.log(this.screenState);
      } else {
        this.traverse((child) => {
          if (child.name === "DVDScreen") {
            removeObject3D(child);
          }
        });
        arcadeState.inGame = true;
        this.createGame();
        console.log(this.screenState);
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
