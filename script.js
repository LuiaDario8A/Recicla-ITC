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

// CAMBIAR ENTRE REGISTRO E INICIO DE SESIÓN
document.getElementById("showRegister").addEventListener("click", function () {
    document.querySelector(".container").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function () {
    document.querySelector(".container").style.display = "block";
    document.getElementById("registerContainer").style.display = "none";
});

// REGISTRO DE USUARIOS
document.getElementById("registerButton").addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            database.ref('usuarios/' + user.uid).set({
                email: email
            });
            alert("Registro exitoso");
            window.location.href = "index.html"; // Redirigir a la página principal
        })
        .catch((error) => {
            alert(error.message);
        });
});

// INICIO DE SESIÓN
document.getElementById("loginButton").addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html"; // Redirigir a la página principal
        })
        .catch((error) => {
            alert(error.message);
        });
});


