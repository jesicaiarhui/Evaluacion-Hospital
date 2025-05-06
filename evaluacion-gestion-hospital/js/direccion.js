const areaSelect = document.getElementById('area');
const periodoSelect = document.getElementById('periodo');
const tituloArea = document.getElementById('titulo-area');
const textoPeriodo = document.getElementById('texto-periodo');
const porcentajeElemento = document.getElementById('porcentaje');  // Elemento donde mostrarás el porcentaje real

// Event listeners para actualizar cuando se cambie área o periodo
areaSelect.addEventListener('change', actualizarVista);
periodoSelect.addEventListener('change', actualizarVista);

async function actualizarVista() {
  const area = areaSelect.value;
  const periodo = periodoSelect.value;

  tituloArea.textContent = `Evaluación de ${area}`;  // Actualiza el título
  textoPeriodo.textContent = `Evaluación por ${periodo}`;

  // Obtener las evaluaciones desde Supabase
  const evaluaciones = await obtenerEvaluaciones(area, periodo);

  if (evaluaciones.length > 0) {
    const evaluacion = evaluaciones[0]; // Suponiendo que solo quieres la última evaluación para el área y periodo
    const porcentaje = evaluacion.porcentaje;

    // Actualizar el porcentaje en la vista
    porcentajeElemento.textContent = `${porcentaje}%`;

    // Determinar el estado (rojo, amarillo, verde) según el porcentaje
    let estado;
    if (porcentaje < 50) {
      estado = 'malo';
    } else if (porcentaje >= 50 && porcentaje < 75) {
      estado = 'regular';
    } else {
      estado = 'bueno';
    }

    // Actualizar el semáforo en función del estado
    actualizarSemaforo(estado);
    generarGrafico(area, periodo, evaluaciones);
  } else {
    alert('No se encontraron evaluaciones para esta área y periodo.');
  }
}

async function obtenerEvaluaciones(area, periodo) {
  const { data, error } = await supabase
    .from('evaluaciones')
    .select('*')
    .eq('area', area)
    .eq('periodo', periodo)
    .order('fecha', { ascending: false })  // Trae las más recientes primero
    .limit(1);  // Limita a la última evaluación

  if (error) {
    console.error('Error al obtener las evaluaciones:', error);
    alert('Error al obtener las evaluaciones.');
    return [];
  }

  return data;
}

function actualizarSemaforo(estado) {
  // Elimina las clases activas de todas las luces del semáforo
  document.querySelectorAll('.luz').forEach(luz => luz.classList.remove('activa'));
  const textoEstado = document.querySelector('.estado-texto');

  // Actualiza el semáforo en función del estado
  if (estado === 'malo') {
    document.querySelector('.rojo').classList.add('activa');
    textoEstado.textContent = 'Estado: Crítico';
  } else if (estado === 'regular') {
    document.querySelector('.amarillo').classList.add('activa');
    textoEstado.textContent = 'Estado: Regular';
  } else if (estado === 'bueno') {
    document.querySelector('.verde').classList.add('activa');
    textoEstado.textContent = 'Estado: Óptimo';
  }
}

let grafico;

function generarGrafico(area, periodo, evaluaciones) {
  const ctx = document.getElementById('grafico-estadisticas').getContext('2d');

  // Suponiendo que las evaluaciones tienen un campo 'fecha' y 'porcentaje'
  const labels = evaluaciones.map(evaluacion => evaluacion.fecha);
  const datos = evaluaciones.map(evaluacion => evaluacion.porcentaje);

  const datosGrafico = {
    labels: labels,
    datasets: [{
      label: `${area} - ${periodo}`,
      data: datos,
      backgroundColor: '#66bb6a'  // Cambiar el color según lo que prefieras
    }]
  };

  // Si ya existe un gráfico, destrúyelo para evitar superposiciones
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'bar',
    data: datosGrafico,
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

actualizarVista();  // Inicializa la vista al cargar
