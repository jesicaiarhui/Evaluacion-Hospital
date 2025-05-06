// dashboard.js
import { supabase } from '../supabase.js';  // Asegúrate de que la ruta a supabase.js sea correcta

// Este es el código para cargar los datos en el dashboard, puedes agregarlo si lo necesitas
document.getElementById('load-dashboard').addEventListener('click', async () => {
    try {
        // Consultar los datos desde Supabase
        const { data, error } = await supabase
            .from('evaluaciones')
            .select('*');

        if (error) {
            console.error('Error al cargar los datos:', error);
            alert('Error al cargar los datos');
        } else {
            console.log('Datos cargados:', data);
            // Aquí puedes procesar los datos y mostrarlos en el dashboard
        }
    } catch (err) {
        console.error('Error al cargar los datos:', err);
        alert('Error al cargar los datos');
    }
});
