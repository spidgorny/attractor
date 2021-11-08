import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;
let geometry, material, mesh;
let controls;

init();

function init() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
	camera.position.set(0, 0, 100);
	camera.lookAt(0, 0, 0);

	scene = new THREE.Scene();

	const material = new THREE.LineBasicMaterial({color: 0x0000ff});
	const points = [];
	points.push(new THREE.Vector3(-10, 0, 0));
	points.push(new THREE.Vector3(0, 10, 0));
	points.push(new THREE.Vector3(10, 0, 0));

	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
}

function animation(time) {
	camera.rotation.x = time / 2000;
	camera.rotation.y = time / 1000;

	controls.update();
	renderer.render(scene, camera);
}
