import { supabase } from '../supabase.js';  // Asegúrate de que la ruta a supabase.js sea correcta

// Cuando se envíe el formulario
document.getElementById('infraestructura').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se recargue

    // Captura los valores del formulario
    const sector = document.getElementById('sector').value;
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    const problemas = document.getElementById('problemas').value;
    const tiempo = document.getElementById('tiempo').value;
    const observaciones = document.getElementById('observaciones').value;

    // Cálculo automático del semáforo
    let semaforo = 'verde'; // Valor por defecto

    if (porcentaje < 50) {
        semaforo = 'rojo'; // Si el porcentaje es menor al 50%, semáforo rojo
    } else if (porcentaje >= 50 && porcentaje <= 75) {
        semaforo = 'amarillo'; // Si el porcentaje está entre 50 y 75%, semáforo amarillo
    } else {
        semaforo = 'verde'; // Si el porcentaje es mayor al 75%, semáforo verde
    }

    try {
        // Enviar los datos a Supabase
        const { data, error } = await supabase
            .from('evaluaciones')
            .insert([
                {
                    area: 'Infraestructura',  // Area se define como 'Infraestructura'
                    sector,
                    porcentaje,
                    semaforo,  // Usamos el semáforo calculado
                    observaciones,
                    problemas,
                    tiempo_promedio_solucion: tiempo,
                }
            ]);

        if (error) {
            console.error('Error al guardar la evaluación:', error);
            alert('Error al guardar la evaluación');
        } else {
            // Mostrar ventana modal con el mensaje de éxito
            mostrarModal();

            // Limpiar los campos del formulario
            document.getElementById('infraestructura').reset();

            console.log('Evaluación guardada:', data);
        }
    } catch (err) {
        console.error('Error al guardar la evaluación:', err);
        alert('Error al guardar la evaluación');
    }
});

// Función para mostrar el modal de éxito
function mostrarModal() {
    const modal = document.getElementById('modal-exito');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000); // Ocultar automáticamente a los 5 segundos
}

// Función para cerrar el modal manualmente
function cerrarModal() {
    document.getElementById('modal-exito').style.display = 'none';
}
