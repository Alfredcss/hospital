import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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
    console.log('Snapshot:', pacientesSnapshot); // Verifica si obtienes el snapshot
    const pacientesData = pacientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Pacientes:', pacientesData); // Verifica los datos obtenidos
    return pacientesData;
  } catch (error) {
    console.error('Error obteniendo los pacientes:', error);
  }
};

const mostrarPacientes = (pacientes) => {
  const pacientesListElement = document.getElementById('pacientes-list');
  pacientesListElement.innerHTML = ''; // Limpiar la lista antes de agregar pacientes nuevos

  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');

  pacientes.forEach(paciente => {
    const column = document.createElement('div');
    column.classList.add('col', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerHTML = `
   
      <h5  style="color: #007bff;" class="card-title mb-0">${paciente.nombre} ${paciente.apellidos}</h5>
      <p class="card-text mb-0"><strong>Edad:</strong> ${paciente.edad}</p>
      <p class="card-text mb-0"><strong>Fecha de nacimiento:</strong> ${paciente.fechaNacimiento}</p>
      <p class="card-text mb-0"><strong>Género:</strong> ${paciente.genero}</p>
      <p class="card-text mb-0"><strong>Dirección:</strong> ${paciente.direccion}</p>
      <p class="card-text mb-0"><strong>Teléfono:</strong> ${paciente.telefono}</p>
      <p class="card-text mb-0"><strong>Grupo Étnico:</strong> ${paciente.grupoetnico}</p>
      <p class="card-text"><strong>ID:</strong> <span class="badge bg-secondary rounded-pill">${paciente.id}</span></p>
      <button class="btn btn-link btn-sm ver-detalles" type="button" data-toggle="modal" data-target="#detallesModal" data-id="${paciente.id}">Ver detalles</button>
    `;

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'text-center');
    cardFooter.innerHTML = `
      <button class="btn btn-danger btn-sm mx-1" data-paciente-id="${paciente.id}">Eliminar</button>
      <button class="btn btn-primary btn-sm mx-1" data-paciente-id="${paciente.id}">Actualizar</button>
    `;

    card.appendChild(cardHeader);
    card.appendChild(cardFooter);
    column.appendChild(card);
    rowWrapper.appendChild(column);
  });

  pacientesListElement.appendChild(rowWrapper);

  // Add event listeners for "Ver detalles" buttons
  document.querySelectorAll('.ver-detalles').forEach(button => {
    button.addEventListener('click', (event) => {
      const pacienteId = event.target.getAttribute('data-id');
      const paciente = pacientes.find(p => p.id === pacienteId);
      mostrarDetallesPaciente(paciente);
    });
  });
};

const mostrarDetallesPaciente = (paciente) => {
  const modalBodyContent = document.getElementById('modal-body-content');
  modalBodyContent.innerHTML = `

    <h4 style="color: #007bff;">Historia Clínica</h4>
    <h6><strong>Antecedentes Heredo Familiares</strong></h6>
    <p>${paciente.antecedentesheredofamiliares}</p>
    <h6>Antecedentes Personales:</h6>
    <p>${paciente.antecedentespersonales}</p>
    <h6>Padecimiento Actual:</h6>
    <p>${paciente.padecimientoactual}</p>
    <h6>Interrogatorio por Aparatos y Sistemas:</h6>
    <p>${paciente.interrogatorioaparatos}</p>
    <h4>Exploración Física:</h4>
    <p><strong>Habitus Exterior:</strong> ${paciente.habitus}</p>
    <p><strong>Signos Vitales:</strong> ${paciente.signosvitales}</p>
    <p><strong>Peso:</strong> ${paciente.peso}</p>
    <p><strong>Talla:</strong> ${paciente.talla}</p>
    <p><strong>Datos de Cabeza:</strong> ${paciente.datoscabeza}</p>
    <p><strong>Datos de Cuello:</strong> ${paciente.datoscuello}</p>
    <p><strong>Datos de Tórax:</strong> ${paciente.datostorax}</p>
    <p><strong>Datos de Abdomen:</strong> ${paciente.datosabdomen}</p>
    <p><strong>Datos de Miembros:</strong> ${paciente.datosmiembros}</p>
    <p><strong>Datos de Genitales:</strong> ${paciente.datosgenitales}</p>

    <h4>Estudios y Diagnóstico:</h4>
    <p><strong>Resultados de Estudios de Laboratorio y Gabinete:</strong> ${paciente.resultadosestudios}</p>
    <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticos}</p>
    <p><strong>Pronóstico:</strong> ${paciente.pronostico}</p>
    <p><strong>Indicación Terapéutica:</strong> ${paciente.indicacionterapeutica}</p>
    <h4>Nota de Interconsulta:</h4>
    <p><strong>Evolución y Actualización del Cuadro Clínico:</strong> ${paciente.evolucion}</p>
    <p><strong>Signos Vitales:</strong> ${paciente.signosvitalesevolucion}</p>
    <p><strong>Resultados Relevantes de Estudios:</strong> ${paciente.resultadosrelevantes}</p>
    <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticosevolucion}</p>
    <p><strong>Pronóstico:</strong> ${paciente.pronosticoevolucion}</p>
    <p><strong>Tratamiento e Indicaciones Médicas:</strong> ${paciente.tratamientoindicaciones}</p>
    <p><strong>Criterios Diagnósticos:</strong> ${paciente.criteriosdiagnosticos}</p>
    <p><strong>Plan de Estudios:</strong> ${paciente.planestudios}</p>
    <p><strong>Sugerencias Diagnósticas y Tratamiento:</strong> ${paciente.sugerenciasdiagnosticas}</p>
    <h4>Nota de Referencia/Traslado:</h4>
    <p><strong>Establecimiento que Envía:</strong> ${paciente.establecimientoenvia}</p>
    <p><strong>Establecimiento Receptor:</strong> ${paciente.establecimientoreceptor}</p>
    <p><strong>Motivo de Envío:</strong> ${paciente.motivoenvio}</p>
    <p><strong>Impresión Diagnóstica:</strong> ${paciente.impresiondiagnostica}</p>
    <p><strong>Terapéutica Empleada:</strong> ${paciente.terapeuticaempleada}</p>

    <h4>Nota Médica en Urgencias:</h4>
    <p><strong>Fecha y Hora de Atención:</strong> ${paciente.fechahoraatencion}</p>
    <p><strong>Signos Vitales:</strong> ${paciente.signosvitalesurgencias}</p>
    <p><strong>Motivo de la Atención:</strong> ${paciente.motivoatencion}</p>
    <p><strong>Resumen del Interrogatorio:</strong> ${paciente.resumeninterrogatorio}</p>
    <p><strong>Resultados Relevantes de Estudios:</strong> ${paciente.resultadosrelevantesurgencias}</p>
    <p><strong>Diagnósticos o Problemas Clínicos:</strong> ${paciente.diagnosticosurgencias}</p>
    <p><strong>Tratamiento y Pronóstico:</strong> ${paciente.tratamientopronostico}</p>
  `;
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const pacientes = await getPacientes();
    console.log('Pacientes obtenidos:', pacientes); // Verifica los datos obtenidos
    mostrarPacientes(pacientes);

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const filtrarPacientes = () => {
      const term = searchInput.value.toLowerCase();
      const filteredPacientes = pacientes.filter(paciente =>
        paciente.nombre.toLowerCase().includes(term) ||
        paciente.apellidos.toLowerCase().includes(term) ||
        paciente.genero.toLowerCase().includes(term) ||
        paciente.edad.toLowerCase().includes(term) ||
        paciente.id.toLowerCase().includes(term)
      );
      mostrarPacientes(filteredPacientes);
    };

    searchButton.addEventListener('click', filtrarPacientes);
    searchInput.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        filtrarPacientes();
      }
    });

  } catch (error) {
    console.error('Error obteniendo los pacientes:', error);
  }
});
