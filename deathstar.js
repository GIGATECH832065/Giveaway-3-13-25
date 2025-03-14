// deathstar.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000); // Fixed aspect ratio for container
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('deathstar-container');

renderer.setSize(400, 400);
container.appendChild(renderer.domElement);

// Death Star Base (Wireframe Sphere)
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffcc, // Neon cyan
  wireframe: true,
  wireframeLinewidth: 2,
});
const deathStar = new THREE.Mesh(sphereGeometry, wireframeMaterial);
scene.add(deathStar);

// Superlaser Dish (Schematic Circle with Depth)
const dishGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32, 1, true); // Open-ended cylinder
const dishMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffcc,
  wireframe: true,
  side: THREE.DoubleSide,
});
const dish = new THREE.Mesh(dishGeometry, dishMaterial);
dish.position.set(0, 0.5, 2); // Position on sphere surface
dish.rotation.x = Math.PI / 2;
deathStar.add(dish);

// Surface Panels (Simplified Grid Lines)
const panelGeometry = new THREE.BufferGeometry();
const vertices = [];
for (let lat = -1.5; lat <= 1.5; lat += 0.5) {
  for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 6) {
    const x = 2 * Math.cos(lon) * Math.cos(lat);
    const y = 2 * Math.sin(lat);
    const z = 2 * Math.sin(lon) * Math.cos(lat);
    vertices.push(x, y, z);
  }
}
panelGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const panelMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff }); // Neon magenta
const panels = new THREE.LineSegments(panelGeometry, panelMaterial);
deathStar.add(panels);

// Lighting (Soft ambient for schematic feel)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffcc, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  deathStar.rotation.y += 0.005; // Slower rotation for schematic detail
  deathStar.rotation.x += 0.002;
  renderer.render(scene, camera);
}

animate();

// Responsive Handling
window.addEventListener('resize', () => {
  camera.updateProjectionMatrix();
  renderer.setSize(400, 400); // Keep fixed size
});