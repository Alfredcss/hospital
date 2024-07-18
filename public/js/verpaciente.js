import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5FtYUL8Br1yyzjPVob_f5NxH8RGJHQYU",
  authDomain: "expediente-1ed23.firebaseapp.com",
  projectId: "expediente-1ed23",
  storageBucket: "expediente-1ed23.appspot.com",
  messagingSenderId: "281693892079",
  appId: "1:281693892079:web:ce51c550f275e7ff219a1a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener la lista de pacientes
const getPacientes = async () => {
  try {
    const pacientesCollection = collection(db, 'expediente');
    const pacientesSnapshot = await getDocs(pacientesCollection);
    const pacientesData = pacientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return pacientesData;
  } catch (error) {
    console.error('Error obteniendo los pacientes:', error);
  }
};

// Función para eliminar un expediente
const deletePaciente = async (id) => {
  try {
    const pacienteDoc = doc(db, 'expediente', id);
    await deleteDoc(pacienteDoc);
    console.log('Paciente eliminado con éxito:', id);
  } catch (error) {
    console.error('Error eliminando el paciente:', error);
  }
};

// Función para mostrar la alerta de confirmación
const mostrarAlertaEliminar = (pacienteId, pacientes) => {
  $('#confirmModal').modal('show');

  const confirmButton = document.getElementById('confirmDeleteButton');
  confirmButton.onclick = async () => {
    try {
      await deletePaciente(pacienteId);
      const updatedPacientes = await getPacientes();
      mostrarPacientes(updatedPacientes);
      $('#confirmModal').modal('hide');
      alert('Paciente eliminado con éxito.');
    } catch (error) {
      console.error('Error eliminando paciente:', error);
      alert('Hubo un problema al eliminar el paciente.');
    }
  };
};

const mostrarPacientes = (pacientes) => {
  const pacientesListElement = document.getElementById('pacientes-list');
  pacientesListElement.innerHTML = ''; // Limpiar la lista antes de agregar pacientes nuevos

  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');

  pacientes.forEach(paciente => {
    const column = document.createElement('div');
    column.classList.add('col', 'mb-4');

    const notification = document.createElement('div');
    notification.classList.add('notification');

    const notiTitle = document.createElement('div');
    notiTitle.classList.add('notititle');
    notiTitle.innerHTML = `${paciente.nombre} ${paciente.apellidos}`;

    const notiBody = document.createElement('div');
    notiBody.classList.add('notibody');
    notiBody.innerHTML = `
      <p><strong>Edad:</strong> ${paciente.edad}</p>
      <p><strong>Fecha de nacimiento:</strong> ${paciente.fechaNacimiento}</p>
      <p><strong>Género:</strong> ${paciente.genero}</p>
      <p><strong>Dirección:</strong> ${paciente.direccion}</p>
      <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
      <p><strong>Grupo Étnico:</strong> ${paciente.grupoetnico}</p>
      <p><strong>ID:</strong> <span class="badge bg-secondary rounded-pill">${paciente.id}</span></p>
      <button class="btn btn-link btn-sm ver-detalles-btn" type="button" data-paciente-id="${paciente.id}">Ver detalles</button>
    `;

    const notiFooter = document.createElement('div');
    notiFooter.classList.add('notifooter'); // Usando una nueva clase para el pie de tarjeta
    notiFooter.innerHTML = `
      <button class="btn btn-outline-danger btn-sm mx-1 eliminar-btn" data-paciente-id="${paciente.id}">Eliminar</button>
      <button class="btn btn-outline-primary btn-sm mx-1 editar-btn" data-paciente-id="${paciente.id}">Actualizar</button>
    `;

    notification.appendChild(notiTitle);
    notification.appendChild(notiBody);
    notification.appendChild(notiFooter);
    column.appendChild(notification);
    rowWrapper.appendChild(column);
  });

  pacientesListElement.appendChild(rowWrapper);

  // Agregar event listener a los botones de eliminar
  document.querySelectorAll('.eliminar-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const pacienteId = event.target.getAttribute('data-paciente-id');
      mostrarAlertaEliminar(pacienteId, pacientes);
    });
  });

  // Agregar event listener a los botones de ver detalles
  document.querySelectorAll('.ver-detalles-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const pacienteId = event.target.getAttribute('data-paciente-id');
      const paciente = pacientes.find(p => p.id === pacienteId);
      mostrarDetallesPaciente(paciente);
    });
  });

  // Agregar event listener a los botones de actualizar
  document.querySelectorAll('.editar-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const pacienteId = event.target.getAttribute('data-paciente-id');
      window.location.href = `editarpaciente.html?id=${pacienteId}`;
    });
  });
};

const mostrarDetallesPaciente = (paciente) => {
  const modalBodyContent = document.getElementById('modal-body-content');
  modalBodyContent.innerHTML = `
  
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">

      <p class="font-weight-bold text-dark">
    <span class="bg-info text-dark px-1 rounded-pill">
        ${paciente.nombre} ${paciente.apellidos}
    </span>
</p>
          <div class="section-title">Historia Clínica</div>
          <div class="section-content">
            <div class="mb-3">
              <h6><strong>Antecedentes Heredo Familiares</strong></h6>
              
              <p>${paciente.antecedentesheredofamiliares}</p>
            </div>
            <div class="mb-3">
              <h6><strong>Antecedentes Personales:</strong></h6>
              <p>${paciente.antecedentespersonales}</p>
            </div>
            <div class="mb-3">
              <h6><strong>Padecimiento Actual:</strong></h6>
              <p>${paciente.padecimientoactual}</p>
            </div>
            <div class="mb-3">
              <h6><strong>Interrogatorio por Aparatos y Sistemas:</strong></h6>
              <p>${paciente.interrogatorioaparatos}</p>
            </div>
          </div>
          <div class="section-title">Exploración Física</div>
<div class="section-content">
    <div class="row">
        <div class="col-md-6">
            <p><strong>Habitus Exterior:</strong> ${paciente.habitus}</p>
            <p><strong>Peso:</strong> ${paciente.peso}</p>
            <p><strong>Talla:</strong> ${paciente.talla}</p>
        </div>
        <div class="col-md-6">
            <p><strong>FC:</strong> ${paciente.FC}</p>
            <p><strong>TA:</strong> ${paciente.TA}</p>
            <p><strong>FR:</strong> ${paciente.FR}</p>
            <p><strong>T:</strong> ${paciente.T}</p>
        </div>
        <div class="section-content">
    <ul>
        <li><strong>Datos de Cabeza:</strong>${paciente.datoscabeza}</li>
        <li><strong>Datos de Cuello:</strong>${paciente.datoscuello}</li>
        <li><strong>Datos de Tórax:</strong>${paciente.datostorax}</li>
        <li><strong>Datos de Abdomen:</strong>${paciente.datosabdomen}</li>
        <li><strong>Datos de Miembros:</strong>${paciente.datosmiembros}</li>
        <li><strong>Datos de Genitales:</strong>${paciente.datosgenitales}</li>
    </ul>
</div>
    </div>
</div>

        </div>
        <div class="col-md-6">
          <div class="section-title">Estudios y Diagnóstico</div>
          <div class="section-content">
            <div class="mb-3">
              <p><strong>Resultados de Estudios de Laboratorio y Gabinete:</strong> ${paciente.resultadosestudios}</p>
              <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticos}</p>
              <p><strong>Pronóstico:</strong> ${paciente.pronostico}</p>
              <p><strong>Indicación Terapéutica:</strong> ${paciente.indicacionterapeutica}</p>
            </div>
          </div>
          <div class="section-title">Nota de Interconsulta</div>
          <div class="section-content">
            <div class="mb-3">
              <p><strong>Evolución y Actualización del Cuadro Clínico:</strong> ${paciente.evolucion}</p>
              <p><strong>Signos Vitales:</strong> ${paciente.signosvitalesevolucion}</p>
              <p><strong>Resultados Relevantes de Estudios:</strong> ${paciente.resultadosrelevantes}</p>
              <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticosevolucion}</p>
              <p><strong>Pronóstico:</strong> ${paciente.pronosticoevolucion}</p>
              <p><strong>Tratamiento e Indicaciones Médicas:</strong> ${paciente.tratamientoindicaciones}</p>
              <p><strong>Criterios Diagnósticos:</strong> ${paciente.criteriosdiagnosticos}</p>
              <p><strong>Plan de Estudios:</strong> ${paciente.planestudios}</p>
              <p><strong>Sugerencias Diagnósticas y Tratamiento:</strong> ${paciente.sugerenciasdiagnosticas}</p>
            </div>
          </div>
          <div class="section-title">Nota Médica en Urgencias</div>
          <div class="section-content">
            <div class="mb-3">
              <p><strong>Fecha y Hora de Atención:</strong> ${paciente.fechahoraatencion}</p>
              <p><strong>Signos Vitales:</strong> ${paciente.signosvitalesurgencias}</p>
              <p><strong>Motivo de la Atención:</strong> ${paciente.motivoatencion}</p>
              <p><strong>Resumen del Interrogatorio:</strong> ${paciente.resumeninterrogatorio}</p>
              <p><strong>Resultados Relevantes de Estudios:</strong> ${paciente.resultadosrelevantesurgencias}</p>
              <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticosurgencias}</p>
              <p><strong>Tratamiento y Pronóstico:</strong> ${paciente.tratamientopronostico}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  $('#detallesModal').modal('show');
};

// Configurar el modal para que sea más amplio
$('#detallesModal').on('show.bs.modal', function () {
  $(this).find('.modal-dialog').addClass('modal-wide');
});



document.addEventListener('DOMContentLoaded', async () => {
  try {
    const pacientes = await getPacientes();
    console.log('Pacientes obtenidos:', pacientes); // Verifica los datos obtenidos
    mostrarPacientes(pacientes);

    const searchInput = document.getElementById('searchInput');

    const filtrarPacientes = () => {
      const term = searchInput.value.toLowerCase();
      const filteredPacientes = pacientes.filter(paciente => {
        // Verifica que las propiedades existen antes de usarlas
        const nombre = paciente.nombre ? paciente.nombre.toLowerCase() : '';
        const apellidos = paciente.apellidos ? paciente.apellidos.toLowerCase() : '';
        const genero = paciente.genero ? paciente.genero.toLowerCase() : '';
        const edad = paciente.edad ? paciente.edad.toString().toLowerCase() : ''; // Convertir edad a string
        const id = paciente.id ? paciente.id.toLowerCase() : '';
        
        const nombreCompleto = `${nombre} ${apellidos}`.trim();
        
        return nombre.includes(term) || apellidos.includes(term) || nombreCompleto.includes(term) || genero.includes(term) || edad.includes(term) || id.includes(term);
      });
      mostrarPacientes(filteredPacientes);
    };

    searchInput.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        filtrarPacientes();
      }
    });

  } catch (error) {
    console.error('Error obteniendo los pacientes:', error);
  }
});

