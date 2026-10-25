const toggleDarkMode = document.getElementById("toggleDarkMode");

const btnSolicitarDescarga = document.getElementById("btnSolicitarDescarga");
const msgPreparando = document.getElementById("msgPreparando");
const msgListo = document.getElementById("msgListo");

const btnAbrirEliminacion = document.getElementById("btnAbrirEliminacion");
const cardEliminacion = document.getElementById("cardEliminacion");

const inputPasswordEliminar = document.getElementById("inputPasswordEliminar");
const togglePassEliminar = document.getElementById("togglePassEliminar");
const imgOjoEliminar = document.getElementById("imgOjoEliminar");

const btnSolicitudDefinitiva = document.getElementById("btnSolicitudDefinitiva");
const modalConfirmacionFinal = document.getElementById("modalConfirmacionFinal");
const btnAccionFinalEliminar = document.getElementById("btnAccionFinalEliminar");

toggleDarkMode.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

btnSolicitarDescarga.addEventListener("click", () => {
  msgPreparando.classList.remove("hidden");
  msgListo.classList.add("hidden");
  btnSolicitarDescarga.disabled = true;
  btnSolicitarDescarga.style.opacity = "0.6";

  setTimeout(() => {
    msgPreparando.classList.add("hidden");
    msgListo.classList.remove("hidden");
    btnSolicitarDescarga.disabled = false;
    btnSolicitarDescarga.style.opacity = "1";
  }, 4000);
});

btnAbrirEliminacion.addEventListener("click", () => {
  cardEliminacion.classList.toggle("hidden");
});

togglePassEliminar.addEventListener("click", () => {
  if (inputPasswordEliminar.type === "password") {
    inputPasswordEliminar.type = "text";
    imgOjoEliminar.src = "/public/img/ojo_abierto.png";
  } else {
    inputPasswordEliminar.type = "password";
    imgOjoEliminar.src = "/public/img/ojo.png";
  }
});

btnSolicitudDefinitiva.addEventListener("click", () => {
  if (inputPasswordEliminar.value.trim() === "") {
    alert("Por favor escribe tu contraseña actual para continuar.");
    return;
  }
  modalConfirmacionFinal.classList.remove("hidden");
});


btnAccionFinalEliminar.addEventListener("click", () => {
  alert("Cuenta eliminada correctamente. La sesión se cerrará.");
  window.location.href = "/src/views/cuenta.html"; 
});