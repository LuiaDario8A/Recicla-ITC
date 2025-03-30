// Configurar Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elementos del DOM
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerBtn = document.getElementById("registerBtn");

// Registro de usuario
registerBtn.addEventListener("click", () => {
    auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value)
    .then(userCredential => {
        console.log("Usuario registrado:", userCredential.user);
        alert("Registro exitoso. Ahora inicia sesión.");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error al registrar usuario:", error.message);
        alert("Error: " + error.message);
    });
});


