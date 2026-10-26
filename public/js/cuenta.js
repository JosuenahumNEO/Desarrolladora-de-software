let usuarioGuardado = {
  nombre: "josue nahum",
  correo: "correo@gmail.com",
  password: "contraseña123",
  fotoPerfil: "/public/img/usuario.png"
};

let fotoTemporal = null;

const inputNombre = document.getElementById("inputNombre");
const mainPasswordInput = document.getElementById("mainPasswordInput");
const toggleMainPass = document.getElementById("toggleMainPass");
const imgOjoMain = document.getElementById("imgOjoMain");

const btnAbrirModalPass = document.getElementById("btnAbrirModalPass");
const modalPassword = document.getElementById("modalPassword");

const inputPassActual = document.getElementById("inputPassActual");
const toggleModalPass = document.getElementById("toggleModalPass");
const imgOjoModal = document.getElementById("imgOjoModal");
const inputNuevaPass = document.getElementById("inputNuevaPass");

const reqLength = document.getElementById("reqLength");
const reqUpper = document.getElementById("reqUpper");
const reqLower = document.getElementById("reqLower");

const btnDescartarPass = document.getElementById("btnDescartarPass");
const btnConfirmarPass = document.getElementById("btnConfirmarPass");

const btnElegirImagen = document.getElementById("btnElegirImagen");
const fileInput = document.getElementById("fileInput");
const imgPerfilActual = document.getElementById("imgPerfilActual");

const vistaAjustarFoto = document.getElementById("vistaAjustarFoto");
const imgPreviewCrop = document.getElementById("imgPreviewCrop");
const btnCancelarFoto = document.getElementById("btnCancelarFoto");
const btnOtraImagen = document.getElementById("btnOtraImagen");
const btnAceptarFoto = document.getElementById("btnAceptarFoto");

const btnDescartarGeneral = document.getElementById("btnDescartarGeneral");
const btnGuardarGeneral = document.getElementById("btnGuardarGeneral");
const toggleDarkMode = document.getElementById("toggleDarkMode");

// 1. ACTIVAR / DESACTIVAR MODO OSCURO
toggleDarkMode.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

// 2. MOSTRAR / OCULTAR CONTRASEÑA Y CAMBIAR IMAGEN DEL OJO
function alternarVisibilidadPassword(inputElement, imgElement) {
  if (inputElement.type === "password") {
    inputElement.type = "text";
    imgElement.src = "/public/img/ojo_abierto.png";
  } else {
    inputElement.type = "password";
    imgElement.src = "/public/img/ojo.png";
  }
}

toggleMainPass.addEventListener("click", () => alternarVisibilidadPassword(mainPasswordInput, imgOjoMain));
toggleModalPass.addEventListener("click", () => alternarVisibilidadPassword(inputPassActual, imgOjoModal));

btnAbrirModalPass.addEventListener("click", () => {
  inputPassActual.value = mainPasswordInput.value;
  inputPassActual.type = "password";
  imgOjoModal.src = "/public/img/ojo.png";
  inputNuevaPass.value = "";
  validarNuevaPassword("");
  modalPassword.classList.remove("hidden");
});

function validarNuevaPassword(valor) {
  const tiene8 = valor.length >= 8;
  const tieneMayus = /[A-Z]/.test(valor);
  const tieneMinus = /[a-z]/.test(valor);

  reqLength.className = tiene8 ? "valid" : "invalid";
  reqUpper.className = tieneMayus ? "valid" : "invalid";
  reqLower.className = tieneMinus ? "valid" : "invalid";

  return tiene8 && tieneMayus && tieneMinus;
}

inputNuevaPass.addEventListener("input", (e) => {
  validarNuevaPassword(e.target.value);
});

btnDescartarPass.addEventListener("click", () => {
  inputNuevaPass.value = "";
  modalPassword.classList.add("hidden");
});

btnConfirmarPass.addEventListener("click", () => {
  const nueva = inputNuevaPass.value;
  if (!validarNuevaPassword(nueva)) {
    alert("La nueva contraseña debe cumplir todos los requisitos en color verde.");
    return;
  }
  mainPasswordInput.value = nueva;
  modalPassword.classList.add("hidden");
});

btnElegirImagen.addEventListener("click", () => {
  fileInput.click();
});

btnOtraImagen.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const archivo = e.target.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = function(evento) {
      fotoTemporal = evento.target.result;
      imgPreviewCrop.src = fotoTemporal;
      imgPreviewCrop.style.transform = `translate(0px, 0px)`;
      posX = 0; posY = 0;
      vistaAjustarFoto.classList.remove("hidden");
    };
    reader.readAsDataURL(archivo);
  }
  fileInput.value = "";
});

btnCancelarFoto.addEventListener("click", () => {
  fotoTemporal = null;
  vistaAjustarFoto.classList.add("hidden");
});

btnAceptarFoto.addEventListener("click", () => {
  if (fotoTemporal) {
    imgPerfilActual.src = fotoTemporal;
  }
  vistaAjustarFoto.classList.add("hidden");
});

let arrastrando = false;
let startX = 0, startY = 0, posX = 0, posY = 0;
const cropWorkspace = document.getElementById("cropWorkspace");

cropWorkspace.addEventListener("mousedown", (e) => {
  arrastrando = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
  if (!arrastrando) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  imgPreviewCrop.style.transform = `translate(${posX}px, ${posY}px)`;
});

window.addEventListener("mouseup", () => {
  arrastrando = false;
});

btnDescartarGeneral.addEventListener("click", () => {
  inputNombre.value = usuarioGuardado.nombre;
  mainPasswordInput.value = usuarioGuardado.password;
  imgPerfilActual.src = usuarioGuardado.fotoPerfil;
  modalPassword.classList.add("hidden");
  alert("Cambios descartados. Se restauraron los datos anteriores.");
});

btnGuardarGeneral.addEventListener("click", () => {
  usuarioGuardado.nombre = inputNombre.value;
  usuarioGuardado.password = mainPasswordInput.value;
  usuarioGuardado.fotoPerfil = imgPerfilActual.src;

  console.log("JSON actualizado:", JSON.stringify(usuarioGuardado, null, 2));
  alert("¡Cambios actualizados y guardados correctamente!");
});