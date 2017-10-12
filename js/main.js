// Set up the scene and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 150;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// End of scene setup

// These are our setup variables.

var numberOfPoints = 100000;
var radiusOfSphere = 50;

/*

Comment out alternate lines to see the different positioning in effect

*/

var positionData = getCartesianPositions(numberOfPoints, radiusOfSphere);
// var positionData = getSphericalPositions(numberOfPoints, radiusOfSphere);
// var positionData = getSphericalPositionsWithBias(numberOfPoints,radiusOfSphere);
// var positionData = getSphericalPositionsWithBias(numberOfPoints,radiusOfSphere, 1);
// var positionData = getSphericalPositionsWithBias(numberOfPoints,radiusOfSphere, 0.5);
// var positionData = getUniformPositions(numberOfPoints, radiusOfSphere);

// Convert out positionData into a float32Array for handing to the buffer geometry
const positions = new Float32Array(positionData.length * 3);
positionData.forEach(function(vert, vertIndex) {
	vert.toArray(positions, vertIndex * 3);
}, this);

var geometry = new THREE.BufferGeometry();
geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));

var texture = new THREE.TextureLoader().load("./assets/textures/dot.png");

var texture = new THREE.TextureLoader().load("./assets/textures/dot.png");

var materialOptions = {
	color: 0x888888,
	map: texture,
	transparent: true,
	depthTest: false,
	opacity: 0.25,
	blending: THREE.AdditiveBlending,
};

var material = new THREE.PointsMaterial(materialOptions);

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
	requestAnimationFrame(animate);

	// animation here - lets rotate our dots
	points.rotation.y += 0.005;

	controls.update();

	renderer.render(scene, camera);
}

animate();

/*
The following are the position generating methods
*/

function getCartesianPositions(howMany, radius) {
	// Create and array to store our vector3 point data
	var vectors = [];

	// Create new points using random x,y and z properties then setting vector length to radius

	for (var i = 0; i < howMany; i += 1) {
		var vec3 = new THREE.Vector3();

		vec3.x = THREE.Math.randFloatSpread(1);
		vec3.y = THREE.Math.randFloatSpread(1);
		vec3.z = THREE.Math.randFloatSpread(1);

		vec3.setLength(radius);

		vectors.push(vec3);
	}

	return vectors;
}

function getSphericalPositions(howMany, radius) {
	// Create and array to store our vector3 point data
	var vectors = [];

	// Create a spherical object
	var spherical = new THREE.Spherical();

	// Set radius of spherical
	spherical.radius = radius;

	// Create new points using random phi and theta properties of the spherical object
	for (var i = 0; i < howMany; i += 1) {
		spherical.phi = THREE.Math.randFloat(0, Math.PI); // Phi is between 0 - PI
		spherical.theta = THREE.Math.randFloat(0, Math.PI * 2); // Phi is between 0 - 2 PI

		var vec3 = new THREE.Vector3().setFromSpherical(spherical);

		vectors.push(vec3);
	}

	return vectors;
}

function getSphericalPositionsWithBias(howMany, radius, bias) {
	var vectors = [];

	var spherical = new THREE.Spherical();

	spherical.radius = radius;

	for (var i = 0; i < howMany; i += 1) {
		spherical.phi = getRndBias(0, Math.PI, Math.PI / 2, bias); // Phi is between 0 - PI
		spherical.theta = THREE.Math.randFloat(0, Math.PI * 2); // Theta is between 0 - 2 PI

		var vec3 = new THREE.Vector3().setFromSpherical(spherical);

		vectors.push(vec3);
	}

	return vectors;
}

function getRndBias(min, max, bias, influence) {
	const rnd = Math.random() * (max - min) + min; // random in range
	const mix = Math.random() * influence; // random mixer
	return rnd * (1 - mix) + bias * mix; // mix full range and bias
}

// This method distributes the particles uniformly accross the surface of a sphere

function getUniformPositions(howMany, radius) {
	var vectors = [];

	var inc = Math.PI * (3 - Math.sqrt(5));

	var x = 0;
	var y = 0;
	var z = 0;
	var r = 0;
	var phi = 0;

	for (var k = 0; k < howMany; k++) {
		var off = 2 / howMany;
		var vec3 = new THREE.Vector3();

		y = k * off - 1 + off / 2;
		r = Math.sqrt(1 - y * y);

		phi = k * inc;

		x = Math.cos(phi) * r;

		z = (0, Math.sin(phi) * r);

		x *= radius;
		y *= radius;
		z *= radius;

		vec3.x = x;
		vec3.y = y;
		vec3.z = z;

		vectors.push(vec3);
	}

	return vectors;
}
