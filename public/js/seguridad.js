/* =====================================================
   SEGURIDAD
   Flujo: contraseña actual -> código por correo -> verificado -> guardar teléfono
   ===================================================== */

/* ===== DATOS DE PRUEBA: reemplazar con los datos reales del backend ===== */
const DEMO_CONTRASENA = 'contraseña123';

const ICONO_OJO = '/public/svg/eye-solid-full.svg';
const ICONO_OJO_TACHADO = '/public/svg/eye-slash-solid-full.svg';

/* ===== Elementos ===== */
const valorContrasena = document.getElementById('valor-contrasena');
const ojoContrasena = document.getElementById('ojo-contrasena');
const valorTelefono = document.getElementById('valor-telefono');

const form2fa = document.getElementById('form-2fa');
const inputContrasena2fa = document.getElementById('input-contrasena-2fa');
const ojo2fa = document.getElementById('ojo-2fa');
const error2fa = document.getElementById('error-2fa');

const modalFondo = document.getElementById('modal-fondo');
const pasoCodigo = document.getElementById('paso-codigo');
const pasoVerificado = document.getElementById('paso-verificado');

const inputCodigo = document.getElementById('input-codigo');
const errorCodigo = document.getElementById('error-codigo');
const btnReenviar = document.getElementById('btn-reenviar');

const formTelefono = document.getElementById('form-telefono');
const selectLada = document.getElementById('select-lada');
const inputTelefono = document.getElementById('input-telefono');
const errorTelefono = document.getElementById('error-telefono');

/* ===== Funciones del backend (por ahora simuladas) =====
   Todas devuelven una promesa para cambiarlas por fetch() sin tocar el resto. */

async function verificarContrasena(valor) {
    // TODO: fetch('/api/verificar-contrasena', ...)
    return valor === DEMO_CONTRASENA;
}

async function enviarCodigoPorCorreo() {
    // TODO: fetch('/api/enviar-codigo', ...)
    console.log('Código enviado por correo (simulado)');
}

async function verificarCodigo(codigo) {
    // TODO: fetch('/api/verificar-codigo', ...)  (aquí acepta cualquier código con formato válido)
    return /^\d{3}-\d{3}-\d{3}$/.test(codigo);
}

async function guardarTelefono(lada, digitos) {
    // TODO: fetch('/api/telefono', ...)
    console.log('Teléfono guardado (simulado):', lada, digitos);
    return true;
}

/* ===== Ojitos (mostrar / ocultar contraseña) ===== */

function ponerIconoOjo(boton, visible) {
    boton.querySelector('img').src = visible ? ICONO_OJO : ICONO_OJO_TACHADO;
    boton.setAttribute('aria-pressed', String(visible));
    boton.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
}

/* Contraseña actual (texto) */
let contrasenaVisible = false;

function pintarContrasena() {
    valorContrasena.textContent = contrasenaVisible
        ? DEMO_CONTRASENA
        : '•'.repeat(DEMO_CONTRASENA.length);
    ponerIconoOjo(ojoContrasena, contrasenaVisible);
}

ojoContrasena.addEventListener('click', () => {
    contrasenaVisible = !contrasenaVisible;
    pintarContrasena();
});

/* Campo de contraseña de la autenticación en dos pasos */
ojo2fa.addEventListener('click', () => {
    const mostrar = inputContrasena2fa.type === 'password';
    inputContrasena2fa.type = mostrar ? 'text' : 'password';
    ponerIconoOjo(ojo2fa, mostrar);
});

/* ===== Ventanas ===== */

function abrirModal(paso) {
    modalFondo.hidden = false;
    pasoCodigo.hidden = paso !== 'codigo';
    pasoVerificado.hidden = paso !== 'verificado';
    (paso === 'codigo' ? inputCodigo : selectLada).focus();
}

function cerrarModal() {
    modalFondo.hidden = true;
    pasoCodigo.hidden = true;
    pasoVerificado.hidden = true;

    clearInterval(temporizador);
    btnReenviar.disabled = false;
    btnReenviar.textContent = 'Reenviar código';

    inputCodigo.value = '';
    inputTelefono.value = '';
    errorCodigo.textContent = '';
    errorTelefono.textContent = '';
    inputContrasena2fa.value = '';
    inputContrasena2fa.type = 'password';
    ponerIconoOjo(ojo2fa, false);
    inputContrasena2fa.focus();
}

document.querySelectorAll('[data-cerrar]').forEach(b => b.addEventListener('click', cerrarModal));

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalFondo.hidden) cerrarModal();
});

/* ===== Paso 0: contraseña actual ===== */

form2fa.addEventListener('submit', async e => {
    e.preventDefault();
    error2fa.classList.remove('info');
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

    await enviarCodigoPorCorreo();
    abrirModal('codigo');
    iniciarEspera();
});

/* ===== Paso 1: código por correo ===== */

let temporizador = null;

/* Bloquea "Reenviar código" unos segundos para evitar spam */
function iniciarEspera(segundos = 30) {
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
    await enviarCodigoPorCorreo();
    iniciarEspera();
});

/* Da formato xxx-xxx-xxx y verifica solo al completar los 9 dígitos */
inputCodigo.addEventListener('input', async () => {
    const digitos = inputCodigo.value.replace(/\D/g, '').slice(0, 9);
    inputCodigo.value = digitos.replace(/(\d{3})(?=\d)/g, '$1-');
    errorCodigo.textContent = '';

    if (digitos.length === 9) {
        if (await verificarCodigo(inputCodigo.value)) {
            clearInterval(temporizador);
            abrirModal('verificado');
        } else {
            errorCodigo.textContent = 'El código no es correcto. Revisa tu correo e inténtalo de nuevo.';
        }
    }
});

document.getElementById('form-codigo').addEventListener('submit', e => e.preventDefault());

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
        valorTelefono.textContent = formatearTelefono(lada, digitos);
        cerrarModal();
    } else {
        errorTelefono.textContent = 'No se pudo guardar el número. Inténtalo de nuevo.';
    }
});

/* ===== Botón "Cambiar contraseña" ===== */
document.querySelector('[data-accion="cambiar-contrasena"]')?.addEventListener('click', () => {
    console.log('Clic en: cambiar-contrasena');
    // no hay mockups de la pantalla de cambiar contraseña
});

pintarContrasena();