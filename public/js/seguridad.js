/* =====================================================
   SEGURIDAD
   - Cambiar contraseña (ventana con actual / nueva / confirmar)
   - Autenticación en dos pasos:
       contraseña actual -> código por correo -> verificado (queda ACTIVADA) -> teléfono opcional
       Con la verificación activa, el mismo formulario sirve para DESACTIVARLA (pide la contraseña).
   Sin backend todavía: las funciones de la sección "BACKEND" son las que hay que cambiar por fetch().
   El resto de la vista no se toca. base.js y ajustes.js ya están cargados (header, aside, modo oscuro).
   ===================================================== */
(() => {
  'use strict';

  const App = window.App;
  const leer = (k, def) => (App ? App.leer(k, def) : def);
  const guardar = (k, v) => { if (App) App.guardar(k, v); };

  const ICONO_OJO = '/svg/eye-solid-full.svg';
  const ICONO_OJO_TACHADO = '/svg/eye-slash-solid-full.svg';

  const CODIGO_VIGENCIA_MS = 5 * 60 * 1000;   // el código vence a los 5 minutos
  const CODIGO_INTENTOS = 5;                  // errores permitidos antes de pedir otro código
  const ESPERA_REENVIO_S = 30;

  /* ===== DATOS DE PRUEBA: reemplazar con los datos reales del backend =====
     La contraseña vive solo en memoria (igual que en Cuenta): al recargar vuelve a la de prueba.
     La verificación en dos pasos y el teléfono se guardan en localStorage para que no se pierdan. */
  let contrasenaActual = 'contraseña123';
  const CLAVE_ESTADO = 'seguridad:estado';
  const estado = { dosPasos: false, telefono: '', ...leer(CLAVE_ESTADO, {}) };
  const guardarEstado = () => guardar(CLAVE_ESTADO, { dosPasos: !!estado.dosPasos, telefono: String(estado.telefono || '') });

  /* ===== Elementos ===== */
  const $ = id => document.getElementById(id);

  const valorContrasena = $('valor-contrasena');
  const ojoContrasena = $('ojo-contrasena');
  const valorTelefono = $('valor-telefono');

  const estado2fa = $('estado-2fa');
  const descripcion2fa = $('descripcion-2fa');
  const form2fa = $('form-2fa');
  const inputContrasena2fa = $('input-contrasena-2fa');
  const btn2fa = $('btn-2fa');
  const error2fa = $('error-2fa');

  const modalFondo = $('modal-fondo');
  const pasoCodigo = $('paso-codigo');
  const pasoVerificado = $('paso-verificado');
  const pasoContrasena = $('paso-contrasena');

  const avisoDemo = $('aviso-demo');
  const inputCodigo = $('input-codigo');
  const errorCodigo = $('error-codigo');
  const btnReenviar = $('btn-reenviar');

  const formTelefono = $('form-telefono');
  const selectLada = $('select-lada');
  const inputTelefono = $('input-telefono');
  const errorTelefono = $('error-telefono');

  const formContrasena = $('form-contrasena');
  const inputPassActual = $('input-pass-actual');
  const inputPassNueva = $('input-pass-nueva');
  const inputPassConfirmar = $('input-pass-confirmar');
  const errorContrasena = $('error-contrasena');
  const reqLargo = $('req-largo');
  const reqMayus = $('req-mayus');
  const reqMinus = $('req-minus');

  /* ===== Aviso flotante ===== */
  let toastTimer = null;
  function aviso(texto, tipo = 'ok') {
    let t = $('toast');
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

  /* =====================================================
     BACKEND (por ahora simulado)
     Todas devuelven una promesa para cambiarlas por fetch() sin tocar el resto.
     ===================================================== */

  let codigoPendiente = null;   // { codigo, expira, intentos }

  function generarCodigo() {
    const n = new Uint32Array(1);
    crypto.getRandomValues(n);
    return String(n[0] % 1e9).padStart(9, '0');
  }

  const formatearCodigo = digitos => digitos.replace(/(\d{3})(?=\d)/g, '$1-');

  async function verificarContrasena(valor) {
    // TODO: fetch('/api/verificar-contrasena', ...)
    return valor === contrasenaActual;
  }

  async function enviarCodigoPorCorreo() {
    // TODO: fetch('/api/enviar-codigo', ...). El servidor genera el código y lo manda por correo.
    codigoPendiente = { codigo: generarCodigo(), expira: Date.now() + CODIGO_VIGENCIA_MS, intentos: 0 };

    // DEMO: como no hay correo, se muestra el código en la ventana. Borrar al conectar el backend.
    avisoDemo.textContent = '';
    avisoDemo.append('Modo demostración (aún no se envían correos). Tu código es ');
    const fuerte = document.createElement('strong');
    fuerte.textContent = formatearCodigo(codigoPendiente.codigo);
    avisoDemo.append(fuerte, '.');
  }

  /* Devuelve { resultado: 'ok' | 'incorrecto' | 'expirado' | 'bloqueado', restantes } */
  async function verificarCodigo(texto) {
    // TODO: fetch('/api/verificar-codigo', ...)
    const digitos = texto.replace(/\D/g, '');
    const c = codigoPendiente;

    if (!c || Date.now() > c.expira) {
      codigoPendiente = null;
      return { resultado: 'expirado' };
    }
    if (c.intentos >= CODIGO_INTENTOS) return { resultado: 'bloqueado' };

    if (digitos === c.codigo) {
      codigoPendiente = null;
      return { resultado: 'ok' };
    }

    c.intentos++;
    const restantes = CODIGO_INTENTOS - c.intentos;
    return { resultado: restantes > 0 ? 'incorrecto' : 'bloqueado', restantes };
  }

  async function guardarDosPasos(activo) {
    // TODO: fetch('/api/dos-pasos', { activo })
    estado.dosPasos = activo;
    guardarEstado();
    return true;
  }

  async function guardarTelefono(lada, digitos) {
    // TODO: fetch('/api/telefono', ...)
    estado.telefono = formatearTelefono(lada, digitos);
    guardarEstado();
    return true;
  }

  async function guardarContrasenaNueva(nueva) {
    // TODO: fetch('/api/cambiar-contrasena', { actual, nueva })
    contrasenaActual = nueva;
    return true;
  }

  /* ===== Ojitos (mostrar / ocultar contraseña) ===== */

  function ponerIconoOjo(boton, visible) {
    boton.querySelector('img').src = visible ? ICONO_OJO : ICONO_OJO_TACHADO;
    boton.setAttribute('aria-pressed', String(visible));
    boton.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  }

  /* Contraseña actual (texto de la tarjeta) */
  let contrasenaVisible = false;

  function pintarContrasena() {
    valorContrasena.textContent = contrasenaVisible
      ? contrasenaActual
      : '•'.repeat(contrasenaActual.length);
    ponerIconoOjo(ojoContrasena, contrasenaVisible);
  }

  ojoContrasena.addEventListener('click', () => {
    contrasenaVisible = !contrasenaVisible;
    pintarContrasena();
  });

  /* Campos de contraseña (data-ojo = id del input que controla el botón) */
  document.querySelectorAll('[data-ojo]').forEach(boton => {
    boton.addEventListener('click', () => {
      const input = $(boton.dataset.ojo);
      const mostrar = input.type === 'password';
      input.type = mostrar ? 'text' : 'password';
      ponerIconoOjo(boton, mostrar);
    });
  });

  function ocultarTodosLosOjos() {
    document.querySelectorAll('[data-ojo]').forEach(boton => {
      $(boton.dataset.ojo).type = 'password';
      ponerIconoOjo(boton, false);
    });
  }

  /* ===== Estado visible de la autenticación en dos pasos ===== */

  function pintarEstado2fa() {
    const activo = !!estado.dosPasos;
    estado2fa.textContent = activo ? 'Activada' : 'Desactivada';
    estado2fa.dataset.activo = String(activo);
    descripcion2fa.textContent = activo
      ? 'La verificación en dos pasos está activada. Para desactivarla, confirma tu contraseña actual.'
      : 'Confirma tu identidad con tu contraseña actual. Te enviaremos un código por correo.';
    btn2fa.textContent = activo ? 'Desactivar' : 'Continuar';
    btn2fa.classList.toggle('peligro', activo);
  }

  function pintarTelefono() {
    if (estado.telefono) valorTelefono.textContent = estado.telefono;
  }

  /* ===== Ventanas ===== */

  const PASOS = {
    codigo: { el: pasoCodigo, foco: inputCodigo },
    verificado: { el: pasoVerificado, foco: selectLada },
    contrasena: { el: pasoContrasena, foco: inputPassActual }
  };

  function abrirModal(paso) {
    modalFondo.hidden = false;
    Object.entries(PASOS).forEach(([nombre, p]) => { p.el.hidden = nombre !== paso; });
    PASOS[paso].foco.focus();
  }

  function cerrarModal() {
    modalFondo.hidden = true;
    Object.values(PASOS).forEach(p => { p.el.hidden = true; });

    clearInterval(temporizador);
    btnReenviar.disabled = false;
    btnReenviar.textContent = 'Reenviar código';
    codigoPendiente = null;
    avisoDemo.textContent = '';

    // formulario del código y del teléfono
    inputCodigo.value = '';
    inputTelefono.value = '';
    errorCodigo.textContent = '';
    errorTelefono.textContent = '';

    // formulario de cambiar contraseña
    inputPassActual.value = '';
    inputPassNueva.value = '';
    inputPassConfirmar.value = '';
    errorContrasena.textContent = '';
    validarRequisitos('');

    // formulario de la tarjeta
    inputContrasena2fa.value = '';
    ocultarTodosLosOjos();
    inputContrasena2fa.focus();
  }

  document.querySelectorAll('[data-cerrar]').forEach(b => b.addEventListener('click', cerrarModal));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalFondo.hidden) cerrarModal();
  });

  /* ===== Autenticación en dos pasos: contraseña actual ===== */

  form2fa.addEventListener('submit', async e => {
    e.preventDefault();
    error2fa.textContent = '';

    const valor = inputContrasena2fa.value;
    if (!valor) {
      error2fa.textContent = 'Escribe tu contraseña actual.';
      return;
    }

    if (!(await verificarContrasena(valor))) {
      error2fa.textContent = 'La contraseña no es correcta.';
      return;
    }

    // Verificación ya activa: este formulario la desactiva
    if (estado.dosPasos) {
      await guardarDosPasos(false);
      pintarEstado2fa();
      inputContrasena2fa.value = '';
      ocultarTodosLosOjos();
      aviso('Autenticación en dos pasos desactivada.');
      return;
    }

    await enviarCodigoPorCorreo();
    abrirModal('codigo');
    iniciarEspera();
  });

  /* ===== Paso 1: código por correo ===== */

  let temporizador = null;

  /* Bloquea "Reenviar código" unos segundos para evitar spam */
  function iniciarEspera(segundos = ESPERA_REENVIO_S) {
    clearInterval(temporizador);
    let restante = segundos;
    btnReenviar.disabled = true;
    btnReenviar.textContent = `Reenviar en ${restante}s`;

    temporizador = setInterval(() => {
      restante--;
      if (restante <= 0) {
        clearInterval(temporizador);
        btnReenviar.disabled = false;
        btnReenviar.textContent = 'Reenviar código';
      } else {
        btnReenviar.textContent = `Reenviar en ${restante}s`;
      }
    }, 1000);
  }

  btnReenviar.addEventListener('click', async () => {
    errorCodigo.textContent = '';
    inputCodigo.value = '';
    await enviarCodigoPorCorreo();
    iniciarEspera();
    inputCodigo.focus();
  });

  /* Da formato xxx-xxx-xxx y verifica solo al completar los 9 dígitos */
  inputCodigo.addEventListener('input', async () => {
    const digitos = inputCodigo.value.replace(/\D/g, '').slice(0, 9);
    inputCodigo.value = formatearCodigo(digitos);
    errorCodigo.textContent = '';

    if (digitos.length < 9) return;

    const { resultado, restantes } = await verificarCodigo(inputCodigo.value);

    if (resultado === 'ok') {
      clearInterval(temporizador);
      await guardarDosPasos(true);
      pintarEstado2fa();
      abrirModal('verificado');
      aviso('Autenticación en dos pasos activada.');
      return;
    }

    if (resultado === 'incorrecto') {
      errorCodigo.textContent = `El código no es correcto. Te ${restantes === 1 ? 'queda 1 intento' : `quedan ${restantes} intentos`}.`;
    } else if (resultado === 'expirado') {
      errorCodigo.textContent = 'El código venció. Pide uno nuevo con "Reenviar código".';
    } else {
      errorCodigo.textContent = 'Demasiados intentos. Pide un código nuevo con "Reenviar código".';
    }
    inputCodigo.select();
  });

  $('form-codigo').addEventListener('submit', e => e.preventDefault());

  /* ===== Paso 2: añadir teléfono ===== */

  /* Dígitos que debe tener el número NACIONAL (sin la lada) según el país: [mínimo, máximo].
     si se agregan mas ladas en el html se actualizan estos valores */
  const LONGITUD_TELEFONO = {
    '+52': [10, 10],  // México
    '+1':  [10, 10],  // EE. UU. / Canadá
    '+57': [8, 10],   // Colombia (fijo 8, celular 10)
    '+54': [10, 10],  // Argentina
    '+34': [9, 9]     // España
  };

  /* Devuelve el mensaje de error, o '' si el número es válido */
  function validarTelefono(lada, digitos) {
    const [min, max] = LONGITUD_TELEFONO[lada] || [7, 15];

    if (digitos.length < min || digitos.length > max) {
      return min === max
        ? `Para ${lada} el número debe tener ${min} dígitos.`
        : `Para ${lada} el número debe tener entre ${min} y ${max} dígitos.`;
    }
    if (digitos.startsWith('0')) {
      return 'El número no puede empezar con 0.';
    }
    // rechaza 1111111111, 1234567890, 9876543210, etc.
    const secuencia = '01234567890123456789';
    const alReves = secuencia.split('').reverse().join('');
    if (/^(\d)\1+$/.test(digitos) || secuencia.includes(digitos) || alReves.includes(digitos)) {
      return 'Escribe un número de teléfono real.';
    }
    return '';
  }

  function formatearTelefono(lada, digitos) {
    // 10 dígitos
    const texto = digitos.length === 10
      ? `${digitos.slice(0, 3)}-${digitos.slice(3, 7)}-${digitos.slice(7)}`
      : digitos;
    return `${lada} ${texto}`;
  }

  formTelefono.addEventListener('submit', async e => {
    e.preventDefault();
    errorTelefono.textContent = '';

    const digitos = inputTelefono.value.replace(/\D/g, '');
    const lada = selectLada.value;

    const mensaje = validarTelefono(lada, digitos);
    if (mensaje) {
      errorTelefono.textContent = mensaje;
      return;
    }

    if (await guardarTelefono(lada, digitos)) {
      pintarTelefono();
      cerrarModal();
      aviso('Teléfono guardado.');
    } else {
      errorTelefono.textContent = 'No se pudo guardar el número. Inténtalo de nuevo.';
    }
  });

  /* ===== Cambiar contraseña ===== */

  /* Mismas reglas que la vista Cuenta: 8 caracteres, 1 mayúscula y 1 minúscula */
  function validarRequisitos(valor) {
    const largo = valor.length >= 8;
    const mayus = /[A-Z]/.test(valor);
    const minus = /[a-z]/.test(valor);
    reqLargo.className = largo ? 'valid' : 'invalid';
    reqMayus.className = mayus ? 'valid' : 'invalid';
    reqMinus.className = minus ? 'valid' : 'invalid';
    return largo && mayus && minus;
  }

  document.querySelector('[data-accion="cambiar-contrasena"]').addEventListener('click', () => {
    validarRequisitos('');
    abrirModal('contrasena');
  });

  inputPassNueva.addEventListener('input', () => validarRequisitos(inputPassNueva.value));

  formContrasena.addEventListener('submit', async e => {
    e.preventDefault();
    errorContrasena.textContent = '';

    const actual = inputPassActual.value;
    const nueva = inputPassNueva.value;
    const confirmar = inputPassConfirmar.value;

    if (!actual) {
      errorContrasena.textContent = 'Escribe tu contraseña actual.';
      inputPassActual.focus();
      return;
    }
    if (!(await verificarContrasena(actual))) {
      errorContrasena.textContent = 'La contraseña actual no es correcta.';
      inputPassActual.focus();
      return;
    }
    if (!validarRequisitos(nueva)) {
      errorContrasena.textContent = 'La nueva contraseña debe cumplir todos los requisitos en verde.';
      inputPassNueva.focus();
      return;
    }
    if (nueva === actual) {
      errorContrasena.textContent = 'La nueva contraseña debe ser distinta a la actual.';
      inputPassNueva.focus();
      return;
    }
    if (nueva !== confirmar) {
      errorContrasena.textContent = 'Las contraseñas no coinciden.';
      inputPassConfirmar.focus();
      return;
    }

    if (await guardarContrasenaNueva(nueva)) {
      pintarContrasena();
      cerrarModal();
      aviso('Contraseña actualizada.');
    } else {
      errorContrasena.textContent = 'No se pudo cambiar la contraseña. Inténtalo de nuevo.';
    }
  });

  /* ===== Estado inicial ===== */
  pintarContrasena();
  pintarEstado2fa();
  pintarTelefono();
})();
