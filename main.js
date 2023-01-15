import "./style.css";
import * as THREE from "./node_modules/three/src/Three";
import { GUI } from "dat.gui";
import { MeshBasicMaterial } from "./node_modules/three/src/Three";
import { BoxGeometry } from "three";

const scene = new THREE.Scene();

//sets background
scene.background = new THREE.Color(0x000000);

//sets camera perspective
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geo1 = new BoxGeometry(0.5,0.5, 0.00005);
var mat1 = new THREE.MeshBasicMaterial({ color: "Red" });
var mesh = new THREE.Mesh(geo1, mat1);
mesh.position.x = 0.5;
mesh.position.y = -0.5;
mesh.position.z = 1;
mesh.scale.x=1.25;
mesh.scale.y=1.25;

//initial size of cube
const geometry = new THREE.BoxGeometry(2, 2, 2);

//making the cube with 6 faces
const material = new MeshBasicMaterial({ color: "White" });
const cube = new THREE.Mesh(geometry, material);

//adding cube to scene
cube.add(mesh);
scene.add(cube);

// wireframe - adds border to every edge
var geo = new THREE.EdgesGeometry(cube.geometry);
var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 4 });
var wireframe = new THREE.LineSegments(geo, mat);
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
cube.add(wireframe);

//adds dat.gui controls
const gui = new GUI({ width: 500 });
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 10);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 10);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 10);
cubeFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

const inner = gui.addFolder("Square move");
inner.add(mesh.position, "x", -0.65, 0.65);
inner.add(mesh.position, "y", -0.65, 0.65);
inner.open()

const inner1 = gui.addFolder("Square size");
inner1.add(mesh.scale, "x", 0.5,1.25);
inner1.add(mesh.scale, "y", 0.5, 1.25);
inner1.open()

//initial camera postition
camera.position.z = 5;

//recursive animate function to show animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//calling function to show on browser
animate();