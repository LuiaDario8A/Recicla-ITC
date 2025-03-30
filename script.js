// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCfq6YcNfAfExWw3ChPDREw8U3oAKfKcSw",
    authDomain: "proyecto-rec-c048c.firebaseapp.com",
    databaseURL: "https://proyecto-rec-c048c-default-rtdb.firebaseio.com",
    projectId: "proyecto-rec-c048c",
    storageBucket: "proyecto-rec-c048c.appspot.com",
    messagingSenderId: "369525260052",
    appId: "1:369525260052:web:f376ed49de8e04e79d4c01",
    measurementId: "G-9WSCEYMJKW"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// --- Activar cámara ---
async function startCamera() {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error al acceder a la cámara: ", error);
        alert("No se pudo acceder a la cámara. Verifica los permisos.");
    }
}

// --- Capturar imagen y clasificar ---
function classifyImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const result = document.getElementById('classification-result');
    const suggestion = document.getElementById('bin-suggestion');

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');

    mockClassify(imageUrl).then(material => {
        result.textContent = `Resultado: ${material}`;
        let bin = "Desconocido";
        if (material === "Papel") bin = "Papel";
        else if (material === "Plástico") bin = "Plásticos";
        else if (material === "Metal") bin = "Metales";

        suggestion.textContent = `Bótalo en: ${bin}`;

        // Guardar en Firebase
        const recordRef = db.ref(`residuos`).push();
        recordRef.set({
            material,
            bin,
            timestamp: new Date().toISOString()
        });
    });
}

// Simulación de clasificación (sustituye con Teachable Machine real)
async function mockClassify(imageUrl) {
    const materials = ["Papel", "Plástico", "Metal"];
    return materials[Math.floor(Math.random() * materials.length)];
}

// Iniciar cámara al cargar la página
window.onload = startCamera;

