import * as THREE from "three";
export default class DVDScreen extends THREE.Group {
  constructor() {
    super();
    this.addParts();
  }

  addParts() {
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
    this.video = document.video;

    //Video Plane
    const screenWidth = 1.13;
    const screenHeight = 0.864;
    const videoPlaneGeometry = new THREE.PlaneGeometry(
      screenWidth,
      screenHeight
    );
    videoPlaneGeometry.rotateY(-Math.PI / 2);
    videoPlaneGeometry.scale(35, 35, 35);
    videoPlaneGeometry.translate(0.3, 0, 0);
    const videoPlane = new THREE.Mesh(videoPlaneGeometry, videoMaterial);
    this.add(videoPlane);
  }
}
