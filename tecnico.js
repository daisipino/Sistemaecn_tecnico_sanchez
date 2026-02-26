// limpia caracteres especiales (igual que en cliente.js)
function cleanInputString(texto) {
  return texto.replace(/[^a-zA-Z0-9\s]/g, "").trim();
}

document.addEventListener("DOMContentLoaded", function () {
  let servicios = [];
  let totalDia = 0;

  const form = document.getElementById("serviceForm");
  const tabla = document.getElementById("tablaServicios");
  const totalDiaSpan = document.getElementById("totalDia");

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
    totalDiaSpan.textContent = totalDia;
  };

  window.eliminarServicio = function (index) {
    if (servicios[index].sumado) {
      totalDia -= servicios[index].costo;
    }
    servicios.splice(index, 1);
    dibujarTabla();
    totalDiaSpan.textContent = totalDia;
  };
});