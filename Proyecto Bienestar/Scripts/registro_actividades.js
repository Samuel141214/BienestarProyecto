// Manejar el envío del formulario
document.getElementById('actividad-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que se recargue la página
  
    // Obtener valores del formulario
    const tipoActividad = document.getElementById('tipo-actividad').value;
    const descripcion = document.getElementById('descripcion').value;
    const duracion = document.getElementById('duracion').value;
  
    // Crear una actividad
    const actividad = {
      tipo: tipoActividad,
      descripcion: descripcion,
      duracion: `${duracion} minutos`,
      fecha: new Date().toLocaleDateString(),
    };
  
    // Guardar la actividad en localStorage
    let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades.push(actividad);
    localStorage.setItem('actividades', JSON.stringify(actividades));
  
    // Mostrar mensaje de éxito
    alert('Actividad registrada con éxito');
    // Limpiar el formulario
    e.target.reset();
  });
  