import * as THREE from 'three';

let scene, camera, renderer, textMesh;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('headline-container').appendChild(renderer.domElement);

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.add(pointLight);
    scene.add(camera);

    // Load font and create text
    const loader = new THREE.FontLoader();
    loader.load('path/to/font.json', function (font) {
        const geometry = new THREE.TextGeometry('Your Headline', {
            font: font,
            size: 1,
            height: 0.2
        });
        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa }); // Chrome color
        textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate text for animation
    if (textMesh) {
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

init();
