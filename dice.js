import * as CANNON from 'https://cdn.skypack.dev/cannon-es';
import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js'


/**
 * Really basic example to show cannon.js integration
 * with three.js.
 * Each frame the cannon.js world is stepped forward and then
 * the position and rotation data of the boody is copied
 * over to the three.js scene.
 */

// three.js variables
let camera, scene, renderer
let mesh

// cannon.js variables
let world
let body

initThree()
initCannon()
animate()

function initThree() {
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)
    camera.position.z = 10
    camera.position.y = 4
    const eulerStart = new THREE.Euler(-Math.PI / 4, 0, 0, 'XYZ');
    camera.quaternion.setFromEuler(eulerStart)

    // Scene
    scene = new THREE.Scene()

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize)

    // Box
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

    // Ground
    const planeGeometry = new THREE.PlaneGeometry(10, 10); // Large enough to catch the box
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2; // Rotate to match the groundBody in Cannon-es
    planeMesh.position.y = -4; // Align with the groundBody position
    scene.add(planeMesh);

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function initCannon() {
    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0); // Set gravity to act downward

    // Box
    const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    body = new CANNON.Body({
        mass: 1,
    })
    body.addShape(shape)
    const angularVelocityMult = 5
    body.angularVelocity.set(angularVelocityMult * Math.random(), angularVelocityMult * Math.random(), angularVelocityMult * Math.random())
    body.angularDamping = 0

    // random starting angle
    const startingPositionConstantMult = 2 * Math.PI
    body.quaternion.setFromEuler(startingPositionConstantMult * Math.random(), startingPositionConstantMult * Math.random(), startingPositionConstantMult * Math.random())

    world.addBody(body)

    // Plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
        mass: 0, // mass = 0 makes the body static
    });
    groundBody.addShape(groundShape);
    groundBody.position.set(0, -4, 0); // Position the ground slightly below the box
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate the plane to be horizontal
    world.addBody(groundBody);
}

function animate() {
    requestAnimationFrame(animate)

    // Step the physics world
    world.fixedStep()

    // Copy coordinates from cannon.js to three.js
    mesh.position.copy(body.position)
    mesh.quaternion.copy(body.quaternion)

    // Render three.js
    renderer.render(scene, camera)
}