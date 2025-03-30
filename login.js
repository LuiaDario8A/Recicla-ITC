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

// Función para iniciar sesión
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            window.location.href = "index.html"; // Redirige a la página principal
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// Función para registrar usuarios
function register() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Cuenta creada con éxito. Ahora inicia sesión.");
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
