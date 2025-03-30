document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Cuenta creada con éxito");
                    window.location.href = "index.html"; // Redirige al inicio de sesión
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Inicio de sesión exitoso");
                    window.location.href = "dashboard.html"; // Página después de iniciar sesión
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }
});


