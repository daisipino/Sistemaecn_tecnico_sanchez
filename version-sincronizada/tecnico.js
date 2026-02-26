// VERSIÓN SINCRONIZADA: Lee solicitudes del cliente desde localStorage
// limpia caracteres especiales (igual que en cliente.js)
function cleanInputString(texto) {
  return texto.replace(/[^a-zA-Z0-9\s]/g, "").trim();
}

document.addEventListener("DOMContentLoaded", function () {
  // cargar datos del localStorage
  let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
  let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  let totalDia = 0;

  const form = document.getElementById("serviceForm");
  const tabla = document.getElementById("tablaServicios");
  const tablaSolicitudes = document.getElementById("tablaSolicitudesPendientes");
  const totalDiaSpan = document.getElementById("totalDia");

  // dibujar solicitudes pendientes y servicios al cargar
  dibujarSolicitudes();
  dibujarTabla();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cliente = cleanInputString(
      document.getElementById("cliente").value
    );
    const direccion = cleanInputString(
      document.getElementById("direccion").value
    );
    const tipo = document.getElementById("tipo").value;
    const costo = Number(document.getElementById("costo").value);
    const pago = document.getElementById("pago").value;
    const urgente = document.getElementById("urgente").checked;

    if (cliente === "" || direccion === "" || costo <= 0) {
      alert("Complete correctamente los campos");
      return;
    }

    const servicio = {
      cliente,
      direccion,
      tipo,
      costo,
      pago,
      urgente,
      estado: "Pendiente",
      sumado: false,
    };

    servicios.push(servicio);
    // GUARDAR en localStorage
    localStorage.setItem('servicios', JSON.stringify(servicios));
    dibujarTabla();
    form.reset();
  });

  function dibujarTabla() {
    tabla.innerHTML = "";
    servicios.forEach((servicio, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${servicio.cliente}</td>
        <td>${servicio.direccion}</td>
        <td>${servicio.tipo}</td>
        <td>$${servicio.costo}</td>
        <td>
          <select onchange="cambiarEstado(${index}, this.value)">
            <option ${
              servicio.estado === "Pendiente" ? "selected" : ""
            }>Pendiente</option>
            <option ${
              servicio.estado === "En camino" ? "selected" : ""
            }>En camino</option>
            <option ${
              servicio.estado === "Finalizado" ? "selected" : ""
            }>Finalizado</option>
          </select>
        </td>
        <td>${servicio.pago}</td>
        <td>${servicio.urgente ? "Sí" : "No"}</td>
        <td><button onclick="eliminarServicio(${index})">Eliminar</button></td>
      `;
      tabla.appendChild(fila);
    });
  }

  window.cambiarEstado = function (index, estado) {
    servicios[index].estado = estado;
    if (estado === "Finalizado" && !servicios[index].sumado) {
      totalDia += servicios[index].costo;
      servicios[index].sumado = true;
    }
    if (estado !== "Finalizado" && servicios[index].sumado) {
      totalDia -= servicios[index].costo;
      servicios[index].sumado = false;
    }
    // GUARDAR cambios en localStorage
    localStorage.setItem('servicios', JSON.stringify(servicios));
    totalDiaSpan.textContent = totalDia;
  };

  window.eliminarServicio = function (index) {
    if (servicios[index].sumado) {
      totalDia -= servicios[index].costo;
    }
    servicios.splice(index, 1);
    // GUARDAR cambios en localStorage
    localStorage.setItem('servicios', JSON.stringify(servicios));
    dibujarTabla();
    totalDiaSpan.textContent = totalDia;
  };

  // función para dibujar solicitudes pendientes del cliente
  function dibujarSolicitudes() {
    tablaSolicitudes.innerHTML = "";
    solicitudes.forEach((sol, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${sol.cliente}</td>
        <td>${sol.direccion}</td>
        <td>${sol.localidad}</td>
        <td>${sol.tipo}</td>
        <td>${sol.urgente ? "Sí" : "No"}</td>
        <td><button onclick="convertirASolicitud(${index})" class="btn-convertir">Convertir a Servicio</button></td>
      `;
      tablaSolicitudes.appendChild(fila);
    });
  }

  // función para convertir una solicitud en servicio
  window.convertirASolicitud = function (index) {
    const sol = solicitudes[index];
    servicios.push({
      cliente: sol.cliente,
      direccion: sol.direccion,
      tipo: sol.tipo,
      costo: 0,
      pago: "",
      urgente: sol.urgente,
      estado: "Pendiente",
      sumado: false
    });
    // GUARDAR nuevos servicios
    localStorage.setItem('servicios', JSON.stringify(servicios));
    // Eliminar solicitud procesada
    solicitudes.splice(index, 1);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    dibujarSolicitudes();
    dibujarTabla();
    alert("Solicitud convertida a servicio. Completa el costo y medio de pago.");
  };
});