import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';

// 1. SCENE AND RENDERER SETUP
const scene = new THREE.Scene();
const canvas = document.getElementById('playground');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true // Make canvas background transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const clock = new THREE.Clock();

// 2. CAMERA SETUP
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 3. LIGHTING
const ambientLight = new THREE.AmbientLight(0xeb5243, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfac19c, 1);
directionalLight.position.set(10, 5, 5);
scene.add(directionalLight);

// 4. CONTROLS (for user interaction)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes the movement smoother
controls.autoRotate = true; // Gentle auto-rotation
controls.autoRotateSpeed = 10;

// 5. MOLECULE LOADING AND VISUALIZATION
const pdbLoader = new PDBLoader();
const molecule = new THREE.Object3D(); // Use an Object3D to group atoms and bonds

pdbLoader.load(
  // URL to a .pdb file (we'll use caffeine)
//   'https://files.rcsb.org/ligands/view/CFF_ideal.pdb'
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/pdb/caffeine.pdb',
  
  function (pdb) {
    const { geometryAtoms, geometryBonds, json } = pdb;
    const atomPositions = geometryAtoms.getAttribute('position');
    const atomColors = geometryAtoms.getAttribute('color');
    const bondPositions = geometryBonds.getAttribute('position');

    // Visualize Atoms (as spheres)
    for (let i = 0; i < atomPositions.count; i++) {
      const position = new THREE.Vector3().fromBufferAttribute(atomPositions, i);
      const color = new THREE.Color().fromBufferAttribute(atomColors, i);
      
      const atomGeometry = new THREE.IcosahedronGeometry(0.8, 3);
      const atomMaterial = new THREE.MeshPhongMaterial({ color: color });
      const atom = new THREE.Mesh(atomGeometry, atomMaterial);
      atom.position.copy(position);
      molecule.add(atom);
    }
    
    // Visualize Bonds (as cylinders)
    for (let i = 0; i < bondPositions.count; i += 2) {
      const start = new THREE.Vector3().fromBufferAttribute(bondPositions, i);
      const end = new THREE.Vector3().fromBufferAttribute(bondPositions, i + 1);
      
      const bondGeometry = new THREE.CylinderGeometry(0.2, 0.2, start.distanceTo(end), 8, 1);
      const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
      const bond = new THREE.Mesh(bondGeometry, bondMaterial);
      
      bond.position.copy(start).lerp(end, 0.5);
      bond.lookAt(end);
      molecule.add(bond);
    }
    
    // Center the molecule and add it to the scene
    const box = new THREE.Box3().setFromObject(molecule);
    const center = box.getCenter(new THREE.Vector3());
    molecule.position.sub(center);
    scene.add(molecule);
  }
);

// 6. ANIMATION LOOP
// 6. ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // Get the elapsed time from the clock
  const elapsedTime = clock.getElapsedTime();

  // Update the molecule's position and rotation
  if (molecule) {
    // Bobbing motion (up and down)
    // Math.sin() creates a smooth wave-like motion
    molecule.position.y = Math.sin(elapsedTime * 0.5) * 0.5;

    // Tumbling motion (rotating on all axes)
    // Using slightly different speeds makes the tumble feel more natural
    molecule.rotation.x += 0.008;
    molecule.rotation.y += 0.008;
    molecule.rotation.z += 0.0005;
  }

  // Update the controls to allow user interaction to continue working
  controls.update();
  
  // Render the scene
  renderer.render(scene, camera);
}
// Start the animation loop
animate();