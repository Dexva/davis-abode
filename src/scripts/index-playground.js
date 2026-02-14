import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';

let renderer, scene, camera, controls, molecule, animationId;

function initThreeJs() {
  // Clean up previous instance
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }

  const canvas = document.getElementById('playground');
  if (!canvas) return; // Canvas not on this page

  // 1. SCENE AND RENDERER SETUP
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true // Make canvas background transparent
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const clock = new THREE.Clock();

  // 2. CAMERA SETUP
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  // Handle window resizing
  const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', resizeHandler);

  // 3. LIGHTING
  const ambientLight = new THREE.AmbientLight(0xeb5243, 0.9);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfac19c, 1);
  directionalLight.position.set(10, 5, 5);
  scene.add(directionalLight);

  // 4. CONTROLS (for user interaction)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Makes the movement smoother
  controls.autoRotate = true; // Gentle auto-rotation
  controls.autoRotateSpeed = 10;

  // 5. MOLECULE LOADING AND VISUALIZATION
  const pdbLoader = new PDBLoader();
  molecule = new THREE.Object3D(); // Use an Object3D to group atoms and bonds

  pdbLoader.load(
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
  function animate() {
    animationId = requestAnimationFrame(animate);

    // Get the elapsed time from the clock
    const elapsedTime = clock.getElapsedTime();

    // Update the molecule's position and rotation
    if (molecule && molecule.children.length > 0) {
      // Bobbing motion (up and down)
      molecule.position.y = Math.sin(elapsedTime * 0.5) * 0.5;

      // Tumbling motion (rotating on all axes)
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
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThreeJs);

// Reinitialize on view transition
document.addEventListener('astro:after-swap', initThreeJs);