import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const db = getFirestore();

const createExpediente = (name, apellidos, edad, fechaNacimiento, genero, direccion, telefono, grupoEtnico, antecedentesHeredoFamiliares, antecedentesPersonalesPatologicos, padecimientoActual, interrogatorioAparatos, habitusExterior, signosVitales, peso, talla, datosCabeza, datosCuello, datosTorax, datosAbdomen, datosMiembros, datosGenitales, resultadosEstudios, diagnosticos, pronostico, indicacionTerapeutica, evolucion, signosVitalesEvolucion, resultadosRelevantes, diagnosticosEvolucion, pronosticoEvolucion, tratamientoIndicaciones, criteriosDiagnosticos, planEstudios, sugerenciasDiagnosticas, establecimientoEnvia, establecimientoReceptor, motivoEnvio, impresionDiagnostica, terapeuticaEmpleada, fechaHoraAtencion, motivoAtencion, resumenInterrogatorio, resultadosRelevantesUrgencias, diagnosticosUrgencias, tratamientoPronostico) => {
    return addDoc(collection(db, 'expediente'), {
        name,
        apellidos,
        edad,
        fechaNacimiento,
        genero,
        direccion,
        telefono,
        grupoEtnico,
        antecedentesHeredoFamiliares,
        antecedentesPersonalesPatologicos,
        padecimientoActual,
        interrogatorioAparatos,
        habitusExterior,
        signosVitales,
        peso,
        talla,
        datosCabeza,
        datosCuello,
        datosTorax,
        datosAbdomen,
        datosMiembros,
        datosGenitales,
        resultadosEstudios,
        diagnosticos,
        pronostico,
        indicacionTerapeutica,
        evolucion,
        signosVitalesEvolucion,
        resultadosRelevantes,
        diagnosticosEvolucion,
        pronosticoEvolucion,
        tratamientoIndicaciones,
        criteriosDiagnosticos,
        planEstudios,
        sugerenciasDiagnosticas,
        establecimientoEnvia,
        establecimientoReceptor,
        motivoEnvio,
        impresionDiagnostica,
        terapeuticaEmpleada,
        fechaHoraAtencion,
        motivoAtencion,
        resumenInterrogatorio,
        resultadosRelevantesUrgencias,
        diagnosticosUrgencias,
        tratamientoPronostico
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const expedienteForm = document.getElementById('expedienteform');

    expedienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = expedienteForm['nombre'].value;
        const apellidos = expedienteForm['apellidos'].value;
        const edad = expedienteForm['edad'].value;
        const fechaNacimiento = expedienteForm['fechaNacimiento'].value;
        const genero = expedienteForm['genero'].value;
        const direccion = expedienteForm['direccion'].value;
        const telefono = expedienteForm['telefono'].value;
        const grupoEtnico = expedienteForm['grupoetnico'].value;
        const antecedentesHeredoFamiliares = expedienteForm['antecedentesheredofamiliares'].value;
        const antecedentesPersonalesPatologicos = expedienteForm['antecedentespersonales'].value;
        const padecimientoActual = expedienteForm['padecimientoactual'].value;
        const interrogatorioAparatos = expedienteForm['interrogatorioaparatos'].value;
        const habitusExterior = expedienteForm['habitus'].value;
        const signosVitales = expedienteForm['signosvitales'].value;
        const peso = expedienteForm['peso'].value;
        const talla = expedienteForm['talla'].value;
        const datosCabeza = expedienteForm['datoscabeza'].value;
        const datosCuello = expedienteForm['datoscuello'].value;
        const datosTorax = expedienteForm['datostorax'].value;
        const datosAbdomen = expedienteForm['datosabdomen'].value;
        const datosMiembros = expedienteForm['datosmiembros'].value;
        const datosGenitales = expedienteForm['datosgenitales'].value;
        const resultadosEstudios = expedienteForm['resultadosestudios'].value;
        const diagnosticos = expedienteForm['diagnosticos'].value;
        const pronostico = expedienteForm['pronostico'].value;
        const indicacionTerapeutica = expedienteForm['indicacionterapeutica'].value;
        const evolucion = expedienteForm['evolucion'].value;
        const signosVitalesEvolucion = expedienteForm['signosvitalesevolucion'].value;
        const resultadosRelevantes = expedienteForm['resultadosrelevantes'].value;
        const diagnosticosEvolucion = expedienteForm['diagnosticosevolucion'].value;
        const pronosticoEvolucion = expedienteForm['pronosticoevolucion'].value;
        const tratamientoIndicaciones = expedienteForm['tratamientoindicaciones'].value;
        const criteriosDiagnosticos = expedienteForm['criteriosdiagnosticos'].value;
        const planEstudios = expedienteForm['planestudios'].value;
        const sugerenciasDiagnosticas = expedienteForm['sugerenciasdiagnosticas'].value;
        const establecimientoEnvia = expedienteForm['establecimientoenvia'].value;
        const establecimientoReceptor = expedienteForm['establecimientoreceptor'].value;
        const motivoEnvio = expedienteForm['motivoenvio'].value;
        const impresionDiagnostica = expedienteForm['impresiondiagnostica'].value;
        const terapeuticaEmpleada = expedienteForm['terapeuticaempleada'].value;
        const fechaHoraAtencion = expedienteForm['fechahoraatencion'].value;
        const motivoAtencion = expedienteForm['motivoatencion'].value;
        const resumenInterrogatorio = expedienteForm['resumeninterrogatorio'].value;
        const resultadosRelevantesUrgencias = expedienteForm['resultadosrelevantesurgencias'].value;
        const diagnosticosUrgencias = expedienteForm['diagnosticosurgencias'].value;
        const tratamientoPronostico = expedienteForm['tratamientopronostico'].value;
        
        try {
            await createExpediente(name, apellidos, edad, fechaNacimiento, genero, direccion, telefono, grupoEtnico, antecedentesHeredoFamiliares, antecedentesPersonalesPatologicos, padecimientoActual, interrogatorioAparatos, habitusExterior, signosVitales  , peso, talla, datosCabeza, datosCuello, datosTorax, datosAbdomen, datosMiembros, datosGenitales, resultadosEstudios, diagnosticos, pronostico, indicacionTerapeutica, evolucion, signosVitalesEvolucion, resultadosRelevantes, diagnosticosEvolucion, pronosticoEvolucion, tratamientoIndicaciones, criteriosDiagnosticos, planEstudios, sugerenciasDiagnosticas, establecimientoEnvia, establecimientoReceptor, motivoEnvio, impresionDiagnostica, terapeuticaEmpleada, fechaHoraAtencion, motivoAtencion, resumenInterrogatorio, resultadosRelevantesUrgencias, diagnosticosUrgencias, tratamientoPronostico);
            alert('Expediente guardado con éxito');
            expedienteForm.reset();
        } catch (error) {
            console.error('Error guardando el expediente: ', error);
            alert('Hubo un error guardando el expediente');
        }
    });
});