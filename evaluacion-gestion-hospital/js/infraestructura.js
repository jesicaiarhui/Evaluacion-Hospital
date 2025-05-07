import { supabase } from '../supabase.js'; // Asegúrate de que la ruta sea correcta

document.getElementById('infraestructura').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Captura los valores del formulario
    const sector = document.getElementById('sector').value;
    const estado = parseFloat(document.getElementById('estado').value); // antes "porcentaje"
    const problema_encontrado = document.querySelector('input[name="problema_encontrado"]:checked')?.value || '';
    const reportado_a = document.getElementById('reportado_a').value;
    const solucionado = document.querySelector('input[name="solucionado"]:checked')?.value || '';
    const tiempo = document.getElementById('tiempo').value;
    const observaciones = document.getElementById('observaciones').value;

    // Cálculo del semáforo según el estado
    let semaforo = 'verde';
    if (estado < 50) {
        semaforo = 'rojo';
    } else if (estado <= 75) {
        semaforo = 'amarillo';
    }

    try {
        const { data, error } = await supabase
            .from('evaluaciones')
            .insert([
                {
                    area: 'Infraestructura',
                    sector,
                    porcentaje: estado, // se sigue guardando como porcentaje en Supabase
                    semaforo,
                    observaciones,
                    problemas: problema_encontrado,
                    tiempo_promedio_solucion: tiempo,
                    notificado_a: reportado_a,
                    solucionado
                }
            ]);

        if (error) {
            console.error('Error al guardar la evaluación:', error);
            alert('Error al guardar la evaluación');
        } else {
            mostrarModal();
            document.getElementById('infraestructura').reset();
            console.log('Evaluación guardada:', data);
        }
    } catch (err) {
        console.error('Error al guardar la evaluación:', err);
        alert('Error al guardar la evaluación');
    }
});

function mostrarModal() {
    const modal = document.getElementById('modal-exito');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-exito');
    if (modal) {
        modal.style.display = 'none';
    }
}
