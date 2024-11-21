// Multi-Step Form Navigation
const steps = document.querySelectorAll('.form-step');
let currentStep = 0;

document.querySelectorAll('.next-step').forEach((button) => {
    button.addEventListener('click', () => {
        steps[currentStep].classList.remove('active');
        currentStep++;
        steps[currentStep].classList.add('active');
        updateProgress();
    });
});

document.querySelectorAll('.prev-step').forEach((button) => {
    button.addEventListener('click', () => {
        steps[currentStep].classList.remove('active');
        currentStep--;
        steps[currentStep].classList.add('active');
        updateProgress();
    });
});

// Update Progress Circle
function updateProgress() {
    const progress = document.getElementById('progress-circle');
    const percentage = ((currentStep + 1) / steps.length) * 100;
    progress.style.background = `conic-gradient(#00ffcc ${percentage}%, #121212 ${percentage}%)`;
}

// Form Submission
document.getElementById('quote-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    fetch('/get_quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch the quote. Please try again.');
            }
            return response.json();
        })
        .then((result) => {
            alert(`Your quote is: $${result.quote}`);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while getting the quote. Please try again later.');
        });
});

// Interactive 3D Animation (Three.js Hero Background)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Add rotating torus
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
});
