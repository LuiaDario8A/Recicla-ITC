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

// --- Clasificación de Imagen ---
function classifyImage() {
    const input = document.getElementById('imageInput');
    const result = document.getElementById('classification-result');
    const suggestion = document.getElementById('bin-suggestion');

    if (input.files.length === 0) {
        alert('Sube una imagen de la basura');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
        const imageUrl = e.target.result;

        // Simulación de clasificación (sustituye con Teachable Machine real)
        const material = await mockClassify(imageUrl);

        result.textContent = `Resultado: ${material}`;
        let bin = "Desconocido";
        if (material === "Papel") bin = "Papel";
        else if (material === "Plástico") bin = "Plásticos";
        else if (material === "Metal") bin = "Metales";

        suggestion.textContent = `Bótalo en: ${bin}`;

        // Guardar en Firebase
        const recordRef = db.ref(`usuarios/anonimo/residuos`).push();
        recordRef.set({
            material,
            bin,
            timestamp: new Date().toISOString()
        });
    };

    reader.readAsDataURL(file);
}

// Simulación de clasificación
async function mockClassify(imageUrl) {
    const materials = ["Papel", "Plástico", "Metal"];
    return materials[Math.floor(Math.random() * materials.length)];
}
