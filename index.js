// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    databaseURL: "TU_DATABASE_URL"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "register.html"; // Redirigir al login si no está autenticado
    }
});

// CERRAR SESIÓN
document.getElementById("logoutButton").addEventListener("click", function () {
    auth.signOut().then(() => {
        window.location.href = "register.html"; // Volver al login al cerrar sesión
    });
});

// ACTIVAR CÁMARA
const video = document.getElementById("camera");
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Error al acceder a la cámara: ", error);
    });

// ESCANEAR RESIDUO Y GUARDARLO EN FIREBASE
document.getElementById("captureButton").addEventListener("click", function () {
    const user = auth.currentUser;
    if (!user) {
        alert("Debes iniciar sesión para registrar residuos.");
        return;
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const wasteType = classifyWaste(); // Simulación de clasificación

    database.ref('residuos/' + user.uid).push({
        tipo: wasteType,
        fecha: new Date().toISOString()
    });

    document.getElementById("classificationResult").innerText = `Residuo clasificado como: ${wasteType}`;
});

// FUNCIÓN SIMULADA PARA CLASIFICACIÓN DE RESIDUOS
function classifyWaste() {
    const categories = ["Plástico", "Papel", "Metal"];
    return categories[Math.floor(Math.random() * categories.length)];
}
