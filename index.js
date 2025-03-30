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
const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Iniciar sesión
loginBtn.addEventListener("click", () => {
    auth.signInWithEmailAndPassword(email.value, password.value)
    .then(userCredential => {
        console.log("Usuario autenticado:", userCredential.user);
        loginSection.style.display = "none";
        appSection.style.display = "block";
    })
    .catch(error => {
        console.error("Error al iniciar sesión:", error.message);
        alert("Error: " + error.message);
    });
});

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        console.log("Usuario cerró sesión");
        loginSection.style.display = "block";
        appSection.style.display = "none";
    });
});

