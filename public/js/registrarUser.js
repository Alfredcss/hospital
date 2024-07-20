// Referencias a Firebase
const auth = firebase.auth();
const firestore = firebase.firestore();

document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const adminPassword = document.getElementById('adminPassword').value;
    const role = document.getElementById('rol').value;

    try {
        // Verifica la contraseña del administrador
        const adminCredential = await auth.signInWithEmailAndPassword('admin@gmail.com', adminPassword);

        if (adminCredential.user) {
            // Contraseña del administrador es correcta
            // Crea el nuevo usuario
            await auth.createUserWithEmailAndPassword(email, password);

            // Opcional: Guardar el nombre, correo electrónico y rol en Firestore
            await firestore.collection('users').add({
                name,
                email,
                role
            });

            alert('Usuario agregado exitosamente.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
