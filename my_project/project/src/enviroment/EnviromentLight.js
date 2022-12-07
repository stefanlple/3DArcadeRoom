import * as THREE from "three";

//Light
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1;
window.scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 200, 100);
spotLight.intensity = 0.8;
spotLight.target = plane;
spotLight.angle = THREE.MathUtils.degToRad(30);
spotLight.penumbra = 1.0;
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(2048, 2048);
spotLight.shadow.camera.aspect = 1;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 500;
/*   window.scene.add(spotLight);
window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera)); */

const gui = new DATGUI.GUI();
gui.add(spotLight.position, "x", -200, 200);
gui.add(spotLight.position, "y", 0, 200);
gui.add(spotLight.position, "z", -200, 200);
