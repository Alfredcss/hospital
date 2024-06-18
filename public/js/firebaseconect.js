import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, query, orderByChild, limitToLast, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyC5FtYUL8Br1yyzjPVob_f5NxH8RGJHQYU",
  authDomain: "expediente-1ed23.firebaseapp.com",
  projectId: "expediente-1ed23",
  storageBucket: "expediente-1ed23.appspot.com",
  messagingSenderId: "281693892079",
  appId: "1:281693892079:web:ce51c550f275e7ff219a1a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
const database = getDatabase(app);

auth.onAuthStateChanged(function(user) {
  if (!user && window.location.pathname !== '/html/index.html') {
      // Si el usuario no está autenticado y no está en la página de inicio de sesión, redirige
      window.location.href = "/html/index.html";
  }
});

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "login.html";
        alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Error al registrar: " + error.message);
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente. Serás redirigido a la página principal.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.href = "/html/home.html";
        });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          title: 'Error al iniciar sesión',
          text: `Error: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  signOut() {
    Swal.fire({
      title: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then((_) => {
            window.location.href = "/html/index.html";
          })
          .catch((error) => {
            console.error(error.message);
            Swal.fire({
              title: 'Error al cerrar sesión',
              text: `Error: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }
}

// Función para obtener el último paciente agregado
export async function getLastAddedPatient() {
  const patientsRef = ref(database, 'expediente');
  const latestPatientQuery = query(patientsRef, orderByChild('createdAt'), limitToLast(1));
  const snapshot = await get(latestPatientQuery);
  const latestPatient = snapshot.val();
  return latestPatient ? Object.values(latestPatient)[0] : null;
}
