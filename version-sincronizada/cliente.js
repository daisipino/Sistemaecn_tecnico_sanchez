// VERSIÓN SINCRONIZADA: Los datos se guardan en localStorage
// El cliente y el técnico ven los mismos datos en tiempo real

// limpia caracteres no permitidos (solo letras, números y espacios)
function cleanInputString(texto) {
  return texto.replace(/[^a-zA-Z0-9\s]/g, "").trim();
}

// borra el formulario y el mensaje de resultado
function limpiarFormulario() {
  document.getElementById("pedidoForm").reset();
  document.getElementById("resultado").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("pedidoForm");
  const resultado = document.getElementById("resultado");
  const tabla = document.getElementById("tablaSolicitudes");
  const totalSpan = document.getElementById("totalEstimado");

  // cargar solicitudes del localStorage si existen, sino arreglo vacío
  let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
  let totalEstimado = 0;

  // dibujar tabla al cargar la página
  actualizarTabla();

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // no recargue la página

    // extraigo y limpio valores
    const cliente = cleanInputString(
      document.getElementById("cliente").value
    );
    const direccion = cleanInputString(
      document.getElementById("direccion").value
    );
    const localidad = cleanInputString(
      document.getElementById("localidad").value
    );
    const tipo = document.getElementById("tipo").value;
    const problema = cleanInputString(
      document.getElementById("problema").value
    );

    const urgente = document.getElementById("urgente").checked;
    const conGarantia = document.getElementById("conGarantia").checked;
    const presupuestoPrevio =
      document.getElementById("presupuestoPrevio").checked;

    // validación simple
    if (!cliente || !direccion || !localidad || !tipo || !problema) {
      alert("Complete todos los campos obligatorios");
      return;
    }

    // cálculo de costo según tipo
    let costo = 0;
    if (tipo === "Instalación") costo = 50000;
    else if (tipo === "Mantenimiento") costo = 20000;
    else if (tipo === "Reparación") costo = 35000;
    else costo = "A convenir";

    // muestro mensaje de resultado con aviso de evaluación técnica
    resultado.innerHTML =
      "Gracias " +
      cliente +
      ". Costo aproximado para " +
      tipo +
      ": $" +
      costo +
      ". El técnico confirmará el precio final. " +
      "Este monto es estimado y está sujeto a evaluación; " +
      "podría modificarse tras la revisión técnica.";

    // agrego la solicitud al arreglo
    solicitudes.push({
      cliente,
      direccion,
      localidad,
      tipo,
      urgente,
      conGarantia,
      presupuestoPrevio,
      costo,
    });

    // GUARDAR en localStorage para que el técnico lo vea
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

    actualizarTabla();
    formulario.reset();
  });

  // redibuja la tabla y recalcula el total
  function actualizarTabla() {
    tabla.innerHTML = "";
    totalEstimado = 0;
    solicitudes.forEach((s, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${s.cliente}</td>
        <td>${s.direccion}</td>
        <td>${s.localidad}</td>
        <td>${s.tipo}</td>
        <td>${s.urgente ? "Sí" : "No"}</td>
        <td>${s.conGarantia ? "Sí" : "No"}</td>
        <td>${s.presupuestoPrevio ? "Sí" : "No"}</td>
        <td>${typeof s.costo === "number" ? "$" + s.costo : s.costo}</td>
        <td><button class="btn-eliminar" onclick="eliminarSolicitud(${i})">Eliminar</button></td>
      `;
      tabla.appendChild(fila);
      if (typeof s.costo === "number") totalEstimado += s.costo;
    });
    totalSpan.textContent = totalEstimado;
  }

  // función global para eliminar una solicitud
  window.eliminarSolicitud = function (index) {
    if (typeof solicitudes[index].costo === "number") {
      totalEstimado -= solicitudes[index].costo;
    }
    solicitudes.splice(index, 1);
    // GUARDAR cambios en localStorage
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    actualizarTabla();
  };
});