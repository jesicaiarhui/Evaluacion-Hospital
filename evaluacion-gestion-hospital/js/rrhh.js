// rrhh.js
import { supabase } from '../supabase.js';

document.getElementById('rrhh').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Captura los valores del formulario
  const sector = document.getElementById('sector').value;
  const turnos_cubiertos = document.querySelector('input[name="turnos_cubiertos"]:checked')?.value || '';
  const dificultades_turnos = document.getElementById('dificultades_turnos').value;
  const horarios_cumplidos = document.querySelector('input[name="horarios_cumplidos"]:checked')?.value || '';
  const comentarios_horarios = document.getElementById('comentarios_horarios').value;
  const tiempo_cumplido = document.querySelector('input[name="tiempo_cumplido"]:checked')?.value || '';
  const demoras = document.getElementById('demoras').value;
  const necesidades = document.getElementById('necesidades').value;
  const desempeno = document.getElementById('desempeno').value;
  const comunicacion_interna = document.querySelector('input[name="comunicacion_interna"]:checked')?.value || '';
  const comentarios_comunicacion = document.getElementById('comentarios_comunicacion').value;
  const observaciones = document.getElementById('observaciones').value;

  try {
    const { data, error } = await supabase
      .from('evaluaciones')
      .insert([
        {
          area: 'Recursos Humanos',
          sector,
          cobertura: turnos_cubiertos,
          necesidades,
          ausentismo: dificultades_turnos,
          desempeno,
          control_horario: horarios_cumplidos,
          comentarios_horarios,
          tiempo_cumplido,
          demoras,
          comunicacion_interna,
          comentarios_comunicacion,
          observaciones,
          semaforo: 'verde' // Ajusta esta lógica si querés que sea dinámico
        }
      ]);

    if (error) {
      console.error('Error al guardar la evaluación:', error);
      alert('Error al guardar la evaluación');
    } else {
      document.getElementById('modal').style.display = 'block';
      console.log('Evaluación guardada:', data);
    }
  } catch (err) {
    console.error('Error al guardar la evaluación:', err);
    alert('Error al guardar la evaluación');
  }
});
