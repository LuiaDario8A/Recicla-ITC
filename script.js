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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
    const authSection = document.getElementById("auth-section");
    const classificationSection = document.getElementById("classification-section");
    const logoutBtn = document.getElementById("logout-btn");

    // Verifica si el usuario está autenticado
    auth.onAuthStateChanged(user => {
        if (user) {
            authSection.style.display = "none";
            classificationSection.style.display = "block";
            logoutBtn.style.display = "block";
            startCamera();
        } else {
            authSection.style.display = "block";
            classificationSection.style.display = "none";
            logoutBtn.style.display = "none";
        }
    });

    // Inicio de sesión
    document.getElementById("login-btn").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message));
    });

    // Cierre de sesión
    logoutBtn.addEventListener("click", () => {
        auth.signOut();
    });

    // Registro de usuario
    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => alert("Usuario registrado"))
                .catch(error => alert(error.message));
        });
    }
});

// Función para iniciar la cámara
function startCamera() {
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Error al iniciar la cámara:", err));
}

// Clasificación de residuos (simulación)
document.getElementById("classify-btn").addEventListener("click", async () => {
    const materials = ["Papel", "Plástico", "Metal"];
    const material = materials[Math.floor(Math.random() * materials.length)];
    document.getElementById("classification-result").textContent = `Resultado: ${material}`;
    document.getElementById("bin-suggestion").textContent = `Bótalo en: ${material}`;

    // Guarda en Firebase
    const user = auth.currentUser;
    if (user) {
        const recordRef = db.ref(`usuarios/${user.uid}/residuos`).push();
        recordRef.set({
            material,
            bin: material,
            timestamp: new Date().toISOString()
        });
    }
});


