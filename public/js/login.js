import { ManageAccount } from './firebaseconect.js';

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const account = new ManageAccount();
        account.authenticate(email, password)
            .then(() => {
                // Redireccionar al usuario después de la autenticación exitosa
                window.location.href = "/html/home.html";
            })
            .catch(error => {
                // Manejar errores de autenticación
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: error.message
                });
                console.error("Error de autenticación:", error);
            });
    });

    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');
    togglePassword.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Check authentication status and redirect
// Suponiendo que estás utilizando Firebase Authentication para autenticación
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // Usuario no autenticado, redirigir a la página de inicio de sesión
        window.location.href = "./index.html";
    }
});

