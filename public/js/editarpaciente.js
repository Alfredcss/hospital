import { getPacienteById, updatePaciente } from '/js/firebaseconect.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    if (pacienteId) {
        const paciente = await getPacienteById(pacienteId);
        if (paciente) {
            Object.keys(paciente).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = paciente[key];
                }
            });
        }

        const editarPacienteForm = document.getElementById('editarPacienteForm');
        editarPacienteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedData = {};

            ['nombre', 'apellidos', 'edad', 'fechaNacimiento', 'genero', 'direccion', 'telefono', 'grupoetnico', 
             'antecedentesheredofamiliares', 'antecedentespersonales', 'padecimientoactual', 'interrogatorioaparatos', 
             'habitus','peso', 'talla', 'datoscabeza', 'datoscuello', 'datostorax', 'datosabdomen', 
             'datosmiembros', 'datosgenitales', 'resultadosestudios', 'diagnosticos', 'pronostico', 'indicacionterapeutica', 
             'evolucion', 'signosvitalesevolucion', 'resultadosrelevantes', 'diagnosticosevolucion', 'pronosticoevolucion', 
             'tratamientoindicaciones', 'criteriosdiagnosticos', 'planestudios', 'sugerenciasdiagnosticas', 'fechahoraatencion', 
             'motivoatencion', 'resumeninterrogatorio', 'resultadosrelevantesurgencias', 'diagnosticosurgencias', 
             'tratamientopronostico','FC','TA','FR','T']
            .forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    updatedData[id] = input.value;
                }
            });

            try {
                await updatePaciente(pacienteId, updatedData);
                alert('Paciente actualizado exitosamente');
                window.location.href = '/html/verpacientes.html';
            } catch (error) {
                console.error('Error actualizando los datos del paciente:', error);
                alert('Hubo un error al intentar actualizar los datos del paciente');
            }
        });
    } else {
        console.error('ID de paciente no proporcionado');
        alert('No se ha proporcionado un ID de paciente válido');
    }
});
