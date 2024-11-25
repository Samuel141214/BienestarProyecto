// Mostrar información del usuario
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuario) {
    document.getElementById("nombre-usuario").textContent = `Bienvenido, ${usuario.nombre}`;
    document.getElementById("email-usuario").textContent = usuario.email;
  } else {
    window.location.href = "login.html"; // Redirigir si no hay usuario activo
  }

  cargarActividades(); // Cargar actividades registradas
  actualizarProgreso(); // Actualizar el gráfico de progreso
  cargarMapa(); // Mostrar el mapa con lugares saludables
});

// Manejar el formulario de actividades
document.getElementById("actividad-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo-actividad").value;
  const descripcion = document.getElementById("descripcion").value;
  const duracion = document.getElementById("duracion").value;

  const actividad = {
    tipo,
    descripcion,
    duracion,
    fecha: new Date().toLocaleDateString(),
  };

  let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  actividades.push(actividad);
  localStorage.setItem("actividades", JSON.stringify(actividades));

  cargarActividades(); // Actualizar la tabla de actividades
  actualizarProgreso(); // Actualizar el gráfico de progreso
  e.target.reset(); // Limpiar el formulario
});

// Mostrar actividades en la tabla
function cargarActividades() {
  const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  const tabla = document.getElementById("tabla-actividades");
  tabla.innerHTML = "";

  actividades.forEach((actividad, index) => {
    const fila = document.createElement("tr");
    fila.classList.add("fila-animada"); // Agregar clase para animación
    fila.innerHTML = `
      <td>${actividad.tipo}</td>
      <td>${actividad.descripcion}</td>
      <td>${actividad.duracion}</td>
      <td>${actividad.fecha}</td>
      <td>
        <button class="btn btn-warning btn-sm mr-2" onclick="editarActividad(${index})">
          Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="eliminarActividad(${index})">
          Eliminar
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Editar actividad
function editarActividad(index) {
  const actividades = JSON.parse(localStorage.getItem("actividades"));
  const actividad = actividades[index];

  document.getElementById("tipo-actividad").value = actividad.tipo;
  document.getElementById("descripcion").value = actividad.descripcion;
  document.getElementById("duracion").value = actividad.duracion;

  actividades.splice(index, 1);
  localStorage.setItem("actividades", JSON.stringify(actividades));
  cargarActividades();
}

// Eliminar actividad
function eliminarActividad(index) {
  const actividades = JSON.parse(localStorage.getItem("actividades"));
  actividades.splice(index, 1);
  localStorage.setItem("actividades", JSON.stringify(actividades));
  cargarActividades();
  actualizarProgreso();
}

// Actualizar el gráfico de progreso
function actualizarProgreso() {
  const actividades = JSON.parse(localStorage.getItem("actividades")) || [];
  const resumen = actividades.reduce((acc, act) => {
    acc[act.tipo] = (acc[act.tipo] || 0) + parseInt(act.duracion);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(resumen),
    datasets: [
      {
        data: Object.values(resumen),
        backgroundColor: ["#28a745", "#007bff", "#ffc107"],
      },
    ],
  };

  new Chart(document.getElementById("grafico-progreso"), {
    type: "pie",
    data,
    options: {
      animation: {
        duration: 1500, // Duración de la animación en milisegundos
        easing: "easeOutBounce", // Estilo de la animación
      },
    },
  });
}

// Mostrar mapa con lugares saludables
function cargarMapa() {
  const map = L.map("map").setView([3.4516, -76.532], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const lugares = [
    {
      nombre: "Parque del Perro",
      coords: [3.4351, -76.5457],
      descripcion: "Un lugar ideal para caminar y relajarse.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Parque_del_Perro.jpg/320px-Parque_del_Perro.jpg",
    },
    {
      nombre: "Gimnasio FitGym",
      coords: [3.4442, -76.5322],
      descripcion: "Un gimnasio moderno con equipo de alta calidad.",
      imagen: "https://cdns3.fitfit.fitness/co/media/items/originals/518-Gimnasio-Smart-Fit-Calima-Cali-Rxd0N.jpg",
    },
    {
      nombre: "Cerro de las Tres Cruces",
      coords: [3.4615, -76.5438],
      descripcion: "Perfecto para practicar senderismo con vistas increíbles.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Cerro_de_las_Tres_Cruces.jpg/320px-Cerro_de_las_Tres_Cruces.jpg",
    },
  ];

  lugares.forEach((lugar) => {
    const marker = L.marker(lugar.coords, { bounceOnAdd: true })
      .addTo(map)
      .bindPopup(`
        <h5>${lugar.nombre}</h5>
        <img src="${lugar.imagen}" alt="${lugar.nombre}" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 5px;">
        <p>${lugar.descripcion}</p>
      `);

    // Efecto de rebote en los marcadores (opcional: usar un plugin adicional si es necesario)
  });
}
