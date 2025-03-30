// Configuración de Firebase
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
const auth = firebase.auth();
const db = firebase.database();

// Manejo de sesión
auth.onAuthStateChanged(user => {
    if (user) {
        if (window.location.pathname === "/index.html") {
            window.location.href = "app.html";
        }
    } else {
        if (window.location.pathname === "/app.html") {
            window.location.href = "index.html";
        }
    }
});

function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid;
            db.ref('usuarios/' + userId).set({
                email: email,
                intentos: 0
            });
            document.getElementById('auth-message').innerText = "Registro exitoso. Inicia sesión.";
        })
        .catch(error => {
            document.getElementById('auth-message').innerText = error.message;
        });
}

function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            document.getElementById('auth-message').innerText = error.message;
        });
}

function logoutUser() {
    auth.signOut();
}

// Activar la cámara
function startCamera() {
    const video = document.getElementById('camera');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Error al activar la cámara:", err));
}

// Clasificación de imagen (mock)
function classifyImage() {
    const result = document.getElementById('classification-result');
    const suggestion = document.getElementById('bin-suggestion');
    
    const materials = ["Papel", "Plástico", "Metal"];
    const material = materials[Math.floor(Math.random() * materials.length)];
    result.textContent = `Resultado: ${material}`;
    
    let bin = "Desconocido";
    if (material === "Papel") bin = "Papel";
    else if (material === "Plástico") bin = "Plásticos";
    else if (material === "Metal") bin = "Metales";

    suggestion.textContent = `Bótalo en: ${bin}`;

    const user = auth.currentUser;
    if (user) {
        db.ref(`usuarios/${user.uid}/residuos`).push({
            material,
            bin,
            timestamp: new Date().toISOString()
        });
    }
}
