/* datos.js
   Vista de Datos. Sin backend todavía: la descarga y la eliminación se simulan en el cliente.
   El modo oscuro y la navegación del sidebar los maneja base.js. */
(() => {
  const OJO_CERRADO = '/img/ojo.png';
  const OJO_ABIERTO = '/img/ojo_abierto.png';
  const RUTA_LOGOUT = '/?url=auth/logout';

  const $ = id => document.getElementById(id);
  const btnSolicitarDescarga = $('btnSolicitarDescarga');
  const msgPreparando = $('msgPreparando');
  const msgListo = $('msgListo');

  const btnAbrirEliminacion = $('btnAbrirEliminacion');
  const cardEliminacion = $('cardEliminacion');
  const inputPasswordEliminar = $('inputPasswordEliminar');
  const togglePassEliminar = $('togglePassEliminar');
  const imgOjoEliminar = $('imgOjoEliminar');
  const btnSolicitudDefinitiva = $('btnSolicitudDefinitiva');

  const modalConfirmacionFinal = $('modalConfirmacionFinal');
  const btnAccionFinalEliminar = $('btnAccionFinalEliminar');
  const btnCancelarEliminar = $('btnCancelarEliminar');

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

  /* ---------- descarga de datos personales ---------- */
  btnSolicitarDescarga.addEventListener('click', () => {
    msgPreparando.classList.remove('hidden');
    msgListo.classList.add('hidden');
    btnSolicitarDescarga.disabled = true;

    setTimeout(() => {
      msgPreparando.classList.add('hidden');
      msgListo.classList.remove('hidden');
      btnSolicitarDescarga.disabled = false;
    }, 4000);
  });

  /* ---------- eliminación de la cuenta ---------- */
  function cerrarCardEliminacion() {
    cardEliminacion.classList.add('hidden');
    btnAbrirEliminacion.setAttribute('aria-expanded', 'false');
    inputPasswordEliminar.value = '';
    inputPasswordEliminar.type = 'password';
    imgOjoEliminar.src = OJO_CERRADO;
  }

  btnAbrirEliminacion.addEventListener('click', () => {
    if (cardEliminacion.classList.contains('hidden')) {
      cardEliminacion.classList.remove('hidden');
      btnAbrirEliminacion.setAttribute('aria-expanded', 'true');
      inputPasswordEliminar.focus();
    } else {
      cerrarCardEliminacion();
    }
  });

  togglePassEliminar.addEventListener('click', () => {
    const mostrar = inputPasswordEliminar.type === 'password';
    inputPasswordEliminar.type = mostrar ? 'text' : 'password';
    imgOjoEliminar.src = mostrar ? OJO_ABIERTO : OJO_CERRADO;
  });

  btnSolicitudDefinitiva.addEventListener('click', () => {
    if (inputPasswordEliminar.value.trim() === '') {
      aviso('Escribe tu contraseña actual para continuar.', 'error');
      inputPasswordEliminar.focus();
      return;
    }
    modalConfirmacionFinal.classList.remove('hidden');
    btnCancelarEliminar.focus();
  });

  function cerrarModalFinal() {
    modalConfirmacionFinal.classList.add('hidden');
  }

  btnCancelarEliminar.addEventListener('click', cerrarModalFinal);

  // Clic fuera de la caja o Escape también cancelan
  modalConfirmacionFinal.addEventListener('click', e => {
    if (e.target === modalConfirmacionFinal) cerrarModalFinal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalConfirmacionFinal.classList.contains('hidden')) cerrarModalFinal();
  });

  btnAccionFinalEliminar.addEventListener('click', () => {
    btnAccionFinalEliminar.disabled = true;
    btnCancelarEliminar.disabled = true;
    aviso('Solicitud registrada. Tu cuenta se eliminará en 15 días. Se cerrará la sesión.');
    setTimeout(() => { window.location.href = RUTA_LOGOUT; }, 1800);
  });
})();