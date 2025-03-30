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

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Iniciar cámara
async function startCamera() {
    const video = document.getElementById('camera');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error al acceder a la cámara: ", error);
    }
}

// Clasificación (Mock, debe conectarse a Teachable Machine)
async function classifyImage() {
    const result = document.getElementById('classification-result');
    const suggestion = document.getElementById('bin-suggestion');
    
    const materials = ["Papel", "Plástico", "Metal"];
    const material = materials[Math.floor(Math.random() * materials.length)];

    result.textContent = `Resultado: ${material}`;
    suggestion.textContent = `Bótalo en: ${material}`;

    // Guardar en Firebase
    const recordRef = db.ref(`usuarios/anonimo/residuos`).push();
    recordRef.set({
        material,
        bin: material,
        timestamp: new Date().toISOString()
    });
}

// Ejecutar cámara al cargar
window.onload = () => {
    startCamera();
    document.getElementById('capture-btn').addEventListener('click', classifyImage);
};

