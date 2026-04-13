const API_URL = `${window.location.protocol}//${window.location.hostname}:3000`;

const form = document.getElementById("reservaForm");
const lista = document.getElementById("listaReservas");

async function cargarReservas() {
  try {
    const res = await fetch(`${API_URL}/reservas`);
    const data = await res.json();
    lista.innerHTML = "";

    data.forEach((reserva) => {
      const li = document.createElement("li");
      li.textContent = `${reserva.nombre} - ${reserva.fecha} - ${reserva.hora}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar reservas:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  try {
    const res = await fetch(`${API_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, fecha, hora })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Reserva guardada correctamente");
      form.reset();
      cargarReservas();
    } else {
      alert(data.error || "Error al guardar la reserva");
    }
  } catch (error) {
    console.error("Error al enviar reserva:", error);
  }
});

cargarReservas();
