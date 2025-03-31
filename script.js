
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


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.database();


const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const classificationSection = document.getElementById("classification-section");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");


document.getElementById("show-register").addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
});
document.getElementById("show-login").addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
});


registerBtn.addEventListener("click", () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Usuario registrado con éxito.");
            registerSection.style.display = "none";
            classificationSection.style.display = "block";
        })
        .catch(error => alert(error.message));
});


loginBtn.addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginSection.style.display = "none";
            classificationSection.style.display = "block";
        })
        .catch(error => alert(error.message));
});


logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        classificationSection.style.display = "none";
        loginSection.style.display = "block";
    });
});


auth.onAuthStateChanged(user => {
    if (user) {
        loginSection.style.display = "none";
        registerSection.style.display = "none";
        classificationSection.style.display = "block";
    } else {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
        classificationSection.style.display = "none";
    }
});


const video = document.getElementById("camera");
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error al acceder a la cámara:", err);
    });


function classifyImage() {
    const result = document.getElementById("classification-result");
    const suggestion = document.getElementById("bin-suggestion");

   
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
        const recordRef = db.ref(`usuarios/${user.uid}/residuos`).push();
        recordRef.set({
            material,
            bin,
            timestamp: new Date().toISOString()
        });
    }
}

// Agregar evento al botón
document.getElementById("capture-btn").addEventListener("click", classifyImage);
