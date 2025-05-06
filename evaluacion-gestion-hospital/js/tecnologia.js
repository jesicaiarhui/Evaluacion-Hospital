import { supabase } from '../supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('tecnologia');

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sector = document.getElementById('sector').value.trim();
    const equipos_disponibles = document.getElementById('equipos').value.trim();
    const estado_general = parseInt(document.getElementById('estado').value);
    const mantenimiento = formulario.querySelector('input[name="mantenimiento"]:checked')?.value || '';
    const tipo_mantenimiento = document.getElementById('tipo_mantenimiento').value.trim();
    const equipos_fuera_servicio = document.getElementById('equipos_fuera_servicio').value.trim();
    const notificado_a = document.getElementById('notificado_a').value.trim();
    const tiempo_estimado_reposicion = document.getElementById('tiempo_estimado_reposicion').value.trim();
    const incorporacion_nuevas_tecnologias = document.getElementById('nuevas_tecnologias').value.trim();
    const observaciones = document.getElementById('observaciones').value.trim();

    const { error } = await supabase.from('evaluaciones').insert([
      {
        area: 'Recursos Tecnológicos',
        sector,
        equipos_disponibles,
        estado_general,
        porcentaje_mantenimiento: mantenimiento,
        tipo_mantenimiento,
        equipos_fuera_servicio,
        notificado_a,
        tiempo_estimado_reposicion,
        incorporacion_nuevas_tecnologias,
        observaciones
      }
    ]);

    if (error) {
      console.error('Error al guardar los datos:', error.message);
      alert('Ocurrió un error al guardar los datos. Intente nuevamente.');
    } else {
      mostrarModal(); // Mostrar modal de éxito
      formulario.reset(); // Limpiar formulario
    }
  });
});
