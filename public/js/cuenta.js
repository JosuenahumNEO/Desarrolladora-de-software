/* cuenta.js
   Vista de Cuenta. Sin backend todavía: el nombre y la foto se guardan en localStorage ('perfil'),
   que es la misma clave que lee ajustes.js para pintar la foto en el header de todas las vistas.
   La contraseña es un dato de prueba en memoria: NO se guarda en localStorage. */
(() => {
  const FOTO_DEFAULT = '/img/usuario.png';
  const OJO_CERRADO = '/img/ojo.png';
  const OJO_ABIERTO = '/img/ojo_abierto.png';

  const App = window.App;
  const perfilLocal = App ? App.leer('perfil', {}) : {};

  // Datos de prueba (equivalen a public/json/cuenta.json). Lo guardado en localStorage tiene prioridad.
  const usuarioGuardado = {
    nombre: perfilLocal.nombre || 'josue nahum',
    correo: 'correo@gmail.com',
    password: 'contraseña123',
    fotoPerfil: perfilLocal.fotoPerfil || FOTO_DEFAULT
  };

  let fotoTemporal = null;

  const $ = id => document.getElementById(id);
  const inputNombre = $('inputNombre');
  const textoCorreo = $('textoCorreo');
  const mainPasswordInput = $('mainPasswordInput');
  const toggleMainPass = $('toggleMainPass');
  const imgOjoMain = $('imgOjoMain');

  const btnAbrirModalPass = $('btnAbrirModalPass');
  const modalPassword = $('modalPassword');
  const inputPassActual = $('inputPassActual');
  const toggleModalPass = $('toggleModalPass');
  const imgOjoModal = $('imgOjoModal');
  const inputNuevaPass = $('inputNuevaPass');
  const toggleNuevaPass = $('toggleNuevaPass');
  const imgOjoNueva = $('imgOjoNueva');

  const reqLength = $('reqLength');
  const reqUpper = $('reqUpper');
  const reqLower = $('reqLower');
  const btnDescartarPass = $('btnDescartarPass');
  const btnConfirmarPass = $('btnConfirmarPass');

  const btnElegirImagen = $('btnElegirImagen');
  const fileInput = $('fileInput');
  const imgPerfilActual = $('imgPerfilActual');

  const vistaAjustarFoto = $('vistaAjustarFoto');
  const cropWorkspace = $('cropWorkspace');
  const cropGuide = $('cropGuide');
  const imgPreviewCrop = $('imgPreviewCrop');
  const btnCancelarFoto = $('btnCancelarFoto');
  const btnOtraImagen = $('btnOtraImagen');
  const btnAceptarFoto = $('btnAceptarFoto');

  const btnDescartarGeneral = $('btnDescartarGeneral');
  const btnGuardarGeneral = $('btnGuardarGeneral');

  /* ---------- aviso flotante ---------- */
  let toastTimer = null;
  function aviso(texto, tipo = 'ok') {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.className = 'toast ' + tipo;
    t.textContent = texto;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.remove(), 3500);
  }

  /* ---------- estado inicial ---------- */
  function pintarDatos() {
    inputNombre.value = usuarioGuardado.nombre;
    textoCorreo.textContent = usuarioGuardado.correo;
    mainPasswordInput.value = usuarioGuardado.password;
    imgPerfilActual.src = usuarioGuardado.fotoPerfil;
  }
  pintarDatos();

  /* ---------- mostrar / ocultar contraseña ---------- */
  function alternarVisibilidad(input, img) {
    const mostrar = input.type === 'password';
    input.type = mostrar ? 'text' : 'password';
    img.src = mostrar ? OJO_ABIERTO : OJO_CERRADO;
  }
  toggleMainPass.addEventListener('click', () => alternarVisibilidad(mainPasswordInput, imgOjoMain));
  toggleModalPass.addEventListener('click', () => alternarVisibilidad(inputPassActual, imgOjoModal));
  toggleNuevaPass.addEventListener('click', () => alternarVisibilidad(inputNuevaPass, imgOjoNueva));

  /* ---------- cambiar contraseña ---------- */
  function validarNuevaPassword(valor) {
    const tiene8 = valor.length >= 8;
    const tieneMayus = /[A-Z]/.test(valor);
    const tieneMinus = /[a-z]/.test(valor);
    reqLength.className = tiene8 ? 'valid' : 'invalid';
    reqUpper.className = tieneMayus ? 'valid' : 'invalid';
    reqLower.className = tieneMinus ? 'valid' : 'invalid';
    return tiene8 && tieneMayus && tieneMinus;
  }

  function cerrarCardPassword() {
    inputPassActual.value = '';
    inputNuevaPass.value = '';
    inputPassActual.type = 'password';
    inputNuevaPass.type = 'password';
    imgOjoModal.src = OJO_CERRADO;
    imgOjoNueva.src = OJO_CERRADO;
    validarNuevaPassword('');
    modalPassword.classList.add('hidden');
  }

  btnAbrirModalPass.addEventListener('click', () => {
    // alterna: un segundo clic cierra la tarjeta
    if (!modalPassword.classList.contains('hidden')) { cerrarCardPassword(); return; }
    cerrarCardPassword();
    modalPassword.classList.remove('hidden');
    inputPassActual.focus();
  });

  inputNuevaPass.addEventListener('input', e => validarNuevaPassword(e.target.value));
  btnDescartarPass.addEventListener('click', cerrarCardPassword);

  btnConfirmarPass.addEventListener('click', () => {
    if (inputPassActual.value !== usuarioGuardado.password) {
      aviso('La contraseña actual no es correcta.', 'error');
      inputPassActual.focus();
      return;
    }
    const nueva = inputNuevaPass.value;
    if (!validarNuevaPassword(nueva)) {
      aviso('La nueva contraseña debe cumplir todos los requisitos en verde.', 'error');
      return;
    }
    if (nueva === usuarioGuardado.password) {
      aviso('La nueva contraseña debe ser distinta a la actual.', 'error');
      return;
    }
    // Se muestra en el campo principal; se confirma de forma definitiva con "Guardar cambios"
    mainPasswordInput.value = nueva;
    cerrarCardPassword();
    aviso('Contraseña lista. Pulsa "Guardar cambios" para confirmarla.');
  });

  /* ---------- foto de perfil + recorte ---------- */
  let posX = 0, posY = 0, startX = 0, startY = 0, arrastrando = false;

  function abrirSelector() { fileInput.click(); }
  btnElegirImagen.addEventListener('click', abrirSelector);
  btnOtraImagen.addEventListener('click', abrirSelector);

  function cerrarRecorte() {
    fotoTemporal = null;
    imgPreviewCrop.removeAttribute('src');
    vistaAjustarFoto.classList.add('hidden');
  }

  fileInput.addEventListener('change', e => {
    const archivo = e.target.files[0];
    fileInput.value = '';
    if (!archivo) return;
    if (!archivo.type.startsWith('image/')) {
      aviso('Elige un archivo de imagen.', 'error');
      return;
    }
    if (archivo.size > 8 * 1024 * 1024) {
      aviso('La imagen pesa más de 8 MB. Elige una más ligera.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      fotoTemporal = ev.target.result;
      posX = 0; posY = 0;
      imgPreviewCrop.style.transform = 'translate(0px, 0px)';
      imgPreviewCrop.src = fotoTemporal;
      vistaAjustarFoto.classList.remove('hidden');
    };
    reader.readAsDataURL(archivo);
  });

  btnCancelarFoto.addEventListener('click', cerrarRecorte);

  // Recorta lo que queda dentro del círculo guía y lo reduce a 256x256 (ligero para localStorage)
  function recortarFoto() {
    const lado = 256;
    const g = cropGuide.getBoundingClientRect();
    const r = imgPreviewCrop.getBoundingClientRect();
    if (!imgPreviewCrop.naturalWidth || !r.width) return fotoTemporal;

    const borde = 4; // el borde del círculo guía
    const escala = imgPreviewCrop.naturalWidth / r.width;
    const sx = (g.left + borde - r.left) * escala;
    const sy = (g.top + borde - r.top) * escala;
    const sl = (g.width - borde * 2) * escala;

    const canvas = document.createElement('canvas');
    canvas.width = lado; canvas.height = lado;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, lado, lado);
    ctx.drawImage(imgPreviewCrop, sx, sy, sl, sl, 0, 0, lado, lado);
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  btnAceptarFoto.addEventListener('click', () => {
    if (fotoTemporal) imgPerfilActual.src = recortarFoto();
    cerrarRecorte();
  });

  // Arrastrar la imagen (mouse y táctil)
  cropWorkspace.addEventListener('pointerdown', e => {
    arrastrando = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    cropWorkspace.setPointerCapture(e.pointerId);
  });
  cropWorkspace.addEventListener('pointermove', e => {
    if (!arrastrando) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    imgPreviewCrop.style.transform = `translate(${posX}px, ${posY}px)`;
  });
  const soltar = () => { arrastrando = false; };
  cropWorkspace.addEventListener('pointerup', soltar);
  cropWorkspace.addEventListener('pointercancel', soltar);
  cropWorkspace.style.touchAction = 'none';

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !vistaAjustarFoto.classList.contains('hidden')) cerrarRecorte();
  });

  /* ---------- descartar / guardar ---------- */
  btnDescartarGeneral.addEventListener('click', () => {
    pintarDatos();
    cerrarCardPassword();
    aviso('Cambios descartados. Se restauraron los datos anteriores.');
  });

  btnGuardarGeneral.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    if (nombre === '') {
      aviso('El nombre no puede estar vacío.', 'error');
      inputNombre.focus();
      return;
    }
    usuarioGuardado.nombre = nombre;
    usuarioGuardado.password = mainPasswordInput.value;
    usuarioGuardado.fotoPerfil = imgPerfilActual.getAttribute('src');
    inputNombre.value = nombre;

    if (App) {
      const perfil = { ...App.leer('perfil', {}), nombre: usuarioGuardado.nombre };
      // La silueta por defecto no se guarda: así el header conserva su foto original
      if (usuarioGuardado.fotoPerfil === FOTO_DEFAULT) delete perfil.fotoPerfil;
      else perfil.fotoPerfil = usuarioGuardado.fotoPerfil;
      App.guardar('perfil', perfil);
      App.refrescarAvatar();
    }
    aviso('¡Cambios guardados correctamente!');
  });
})();