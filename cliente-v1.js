// VERSIÓN 1: Sin sincronización entre cliente y técnico
// Los datos se guardan solo en memoria del navegador

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

  // arreglo en memoria para guardar las solicitudes
  let solicitudes = [];
  let totalEstimado = 0;

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

    // muestro mensaje de resultado
    resultado.innerHTML =
      "Gracias " +
      cliente +
      ". Costo aproximado para " +
      tipo +
      ": $" +
      costo +
      ". El técnico confirmará el precio final.";

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
    actualizarTabla();
  };
});
