// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Verificar si el usuario está autenticado
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
    }
});

// Función para cerrar sesión
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}

// Función para activar la cámara
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            document.getElementById('camera').srcObject = stream;
        })
        .catch(error => {
            console.error("Error al acceder a la cámara: ", error);
        });
}

// Función para clasificar la basura
function classifyImage() {
    const user = auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para clasificar residuos.");
        return;
    }

    const materials = ["Papel", "Plástico", "Metal"];
    const material = materials[Math.floor(Math.random() * materials.length)];

    document.getElementById("result").textContent = `Resultado: ${material}`;
    let bin = material === "Papel" ? "Papelera Azul" :
              material === "Plástico" ? "Papelera Amarilla" :
              "Papelera Roja";

    document.getElementById("suggestion").textContent = `Bótalo en: ${bin}`;

    // Guardar en Firebase
    db.ref(`usuarios/${user.uid}/residuos`).push({
        material,
        bin,
        timestamp: new Date().toISOString()
    });
}

// Iniciar la cámara al cargar la página
window.onload = startCamera;

