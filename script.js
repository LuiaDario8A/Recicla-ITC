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

// Función para iniciar sesión
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = "index.html"; // Redirigir al usuario a la página principal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Función para registrar un nuevo usuario
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            db.ref('usuarios/' + user.uid).set({
                email: user.email,
                createdAt: new Date().toISOString()
            });
            alert("Registro exitoso. Ahora inicia sesión.");
            showLogin();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Función para cerrar sesión
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        alert("Error al cerrar sesión");
    });
}

// Función para cambiar entre login y registro
function showRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

function showLogin() {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("register-section").style.display = "none";
}

