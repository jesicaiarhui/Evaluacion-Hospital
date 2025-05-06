import { supabase } from '../supabase.js'; // Asegúrate de que la ruta sea correcta

// Función para obtener los resultados desde la base de datos
async function obtenerResultados() {
    const { data, error } = await supabase
        .from('evaluaciones')
        .select('*') // Puedes agregar columnas específicas si quieres filtrar más
        .order('created_at', { ascending: false }); // Ordenar por fecha
    
    if (error) {
        console.error('Error al obtener resultados:', error);
        return;
    }

    return data;
}

// Función para mostrar el semáforo
function mostrarSemaforo(data) {
    const semaforo = document.getElementById('semaforo');
    
    let color = 'verde'; // Asumimos verde por defecto
    let evaluacionesPendientes = data.filter(item => item.semaforo !== 'verde');

    if (evaluacionesPendientes.length > 0) {
        color = 'rojo'; // Si hay resultados no positivos, se pone rojo
    }

    semaforo.innerHTML = `<div style="background-color: ${color}; padding: 10px;">Semáforo: ${color}</div>`;
}

// Función para mostrar las estadísticas
function mostrarEstadisticas(data) {
    const ctx = document.getElementById('graficoEstadisticas').getContext('2d');
    const categorias = ['Infraestructura', 'Recursos Humanos', 'Recursos Tecnológicos', 'Medicamentos e Insumos'];
    const estadisticas = categorias.map(area => {
        return data.filter(item => item.area === area).length; // Cuenta cuántas evaluaciones hay por área
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Número de Evaluaciones',
                data: estadisticas,
                backgroundColor: ['#478e65', '#1abc9c', '#f39c12', '#e74c3c'],
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para mostrar los resultados detallados
function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    let htmlContent = '<ul>';

    data.forEach(item => {
        htmlContent += `
            <li>
                <strong>Área:</strong> ${item.area}<br>
                <strong>Sector:</strong> ${item.sector}<br>
                <strong>Semáforo:</strong> ${item.semaforo}<br>
                <strong>Observaciones:</strong> ${item.observaciones || 'N/A'}<br>
            </li>
        `;
    });

    htmlContent += '</ul>';
    resultadosDiv.innerHTML = htmlContent;
}

// Función para cargar y mostrar todos los datos
async function cargarResultados() {
    const data = await obtenerResultados();
    
    if (data) {
        mostrarSemaforo(data);
        mostrarEstadisticas(data);
        mostrarResultados(data);
    }
}

// Llamada inicial para cargar los resultados
cargarResultados();
