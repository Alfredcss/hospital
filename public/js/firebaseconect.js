import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5FtYUL8Br1yyzjPVob_f5NxH8RGJHQYU",
  authDomain: "expediente-1ed23.firebaseapp.com",
  projectId: "expediente-1ed23",
  storageBucket: "expediente-1ed23.appspot.com",
  messagingSenderId: "281693892079",
  appId: "1:281693892079:web:ce51c550f275e7ff219a1a"
};

// Inicializa la app de Firebase y obtén la instancia de Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export { auth };
const database = getDatabase(app);

// Inicializa el proveedor de Google
const provider = new GoogleAuthProvider();

export { provider };

// Función para obtener un paciente por su ID
export async function getPacienteById(id) {
  const docRef = doc(db, 'expediente', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No se encontró el documento');
    return null;
  }
}

// Función para actualizar un paciente en Firestore
export async function updatePaciente(id, updatedData) {
  const docRef = doc(db, 'expediente', id);
  await updateDoc(docRef, updatedData);
}

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

  signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión con Google correctamente. Serás redirigido a la página principal.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.href = "/html/home.html";
        });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          title: 'Error al iniciar sesión con Google',
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