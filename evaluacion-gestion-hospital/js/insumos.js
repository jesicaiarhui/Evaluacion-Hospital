import { supabase } from '../supabase.js';  // Asegúrate de que la ruta a supabase.js sea correcta

// Cuando se envíe el formulario
document.getElementById('insumos').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se recargue

    // Captura los valores del formulario
    const sector = document.getElementById('sector').value;
    const stockCritico = document.getElementById('stock_critico').value;
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    const incidentes = document.getElementById('incidentes').value;
    const necesidades = document.getElementById('necesidades').value;
    const tipoEvaluador = document.querySelector('input[name="tipo_evaluador"]:checked')?.value;
    const accesoAdecuado = document.querySelector('input[name="acceso_adecuado"]:checked')?.value;
    const descripcionIncidente = document.getElementById('descripcion_incidente').value;
    const comentariosAcceso = document.getElementById('comentarios_acceso').value;
    const observaciones = document.getElementById('observaciones').value;

    // Calcular el semáforo basado en los datos
    let semaforo = 'verde';
    if (porcentaje < 50 || stockCritico === 'Sí' || incidentes.length > 0) {
        semaforo = 'rojo';
    } else if (porcentaje < 80) {
        semaforo = 'amarillo';
    }

    try {
        // Enviar los datos a Supabase
        const { data, error } = await supabase
            .from('evaluaciones')
            .insert([
                {
                    area: 'Medicamentos e Insumos',  // Area se define como 'Medicamentos e Insumos'
                    sector,
                    stock_critico: stockCritico,
                    porcentaje_insumos_entregados: porcentaje,
                    incidentes_por_faltante: incidentes,
                    listado_necesidades: necesidades,
                    semaforo,
                    tipo_evaluador: tipoEvaluador,
                    acceso_adecuado: accesoAdecuado,
                    descripcion_incidente: descripcionIncidente,
                    comentarios_acceso: comentariosAcceso,
                    observaciones,
                }
            ]);

        if (error) {
            console.error('Error al guardar la evaluación:', error);
            alert('Error al guardar la evaluación');
        } else {
            // Mostrar ventana modal
            document.getElementById('modal').style.display = 'block';
            setTimeout(() => {
                document.getElementById('modal').style.display = 'none';
            }, 2000);

            // Limpiar campos después de enviar el formulario
            document.getElementById('insumos').reset();
        }
    } catch (err) {
        console.error('Error al guardar la evaluación:', err);
        alert('Error al guardar la evaluación');
    }
});
