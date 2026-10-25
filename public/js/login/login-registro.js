/* =====================================================
   LOGIN / REGISTRO — Lógica y animaciones
   ===================================================== */

/* --- Cambio de modo claro/oscuro --- */
function cambiarModo() {
    document.body.classList.toggle('modo-claro');
}

/* =====================================================
   SISTEMA DE FEEDBACK DE ERROR
   ===================================================== */

const MENSAJES = {
    correo:    'Verificá tu dirección de correo.',
    contrasena:'La contraseña ingresada es incorrecta.',
    generico:  'Credenciales inválidas. Intentá de nuevo.',
};

/* --- Crear el toast una sola vez --- */
let toastEl = null;

function crearToast() {
    if (toastEl) return;

    toastEl = document.createElement('div');
    toastEl.className = 'toast-error';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.innerHTML = `
        <span class="toast-error__icon">🔐</span>
        <span class="toast-error__text"></span>
        <button class="toast-error__close" aria-label="Cerrar">✕</button>
    `;

    toastEl.querySelector('.toast-error__close').addEventListener('click', () => {
        ocultarToast();
    });

    document.body.appendChild(toastEl);
}

let toastTimer = null;

function mostrarToast(mensaje) {
    crearToast();

    toastEl.querySelector('.toast-error__text').textContent = mensaje;
    toastEl.classList.add('toast-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(ocultarToast, 4000);
}

function ocultarToast() {
    if (toastEl) toastEl.classList.remove('toast-visible');
}

/* --- Marcar un campo como erróneo --- */
function marcarError(campo, mensaje) {
    campo.classList.add('input-error');
    campo.setAttribute('aria-invalid', 'true');

    /* Eliminar mensaje previo si existe */
    const prevMsg = campo.parentElement.querySelector('.field-error-msg');
    if (prevMsg) prevMsg.remove();

    /* Insertar mensaje inline debajo del campo */
    const msg = document.createElement('p');
    msg.className = 'field-error-msg';
    msg.setAttribute('aria-live', 'polite');
    msg.innerHTML = `<span aria-hidden="true">⚠</span> ${mensaje}`;
    campo.insertAdjacentElement('afterend', msg);

    /* Remover estado de error cuando el usuario empieza a corregir */
    campo.addEventListener('input', function limpiar() {
        campo.classList.remove('input-error');
        campo.removeAttribute('aria-invalid');
        msg.remove();
        campo.removeEventListener('input', limpiar);
    });
}

/* --- Validación client-side antes de enviar --- */
const form       = document.querySelector('form');
const inputEmail = document.getElementById('correo');
const inputPass  = document.getElementById('contrasena');

if (form) {
    form.addEventListener('submit', (e) => {
        let tieneError = false;

        if (!inputEmail.value.trim()) {
            e.preventDefault();
            marcarError(inputEmail, 'El correo es obligatorio.');
            mostrarToast('Completá todos los campos.');
            tieneError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value)) {
            e.preventDefault();
            marcarError(inputEmail, 'El formato del correo no es válido.');
            mostrarToast('Revisá el formato del correo.');
            tieneError = true;
        }

        if (!inputPass.value) {
            e.preventDefault();
            marcarError(inputPass, 'La contraseña es obligatoria.');
            if (!tieneError) mostrarToast('Ingresá tu contraseña.');
            tieneError = true;
        }
    });
}

/* =====================================================
   REACCIÓN AL ERROR PHP (contraseña incorrecta del server)
   El servidor renderiza <p class="mensaje-error">…</p>
   Lo interceptamos y lo convertimos en la animación.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const errorPHP = document.querySelector('.mensaje-error');

    if (errorPHP && errorPHP.textContent.trim()) {
        const textoError = errorPHP.textContent.trim().toLowerCase();

        /* Detectar qué campo falló según el mensaje del servidor */
        let campoFallido   = inputPass;   // por defecto asumimos contraseña
        let mensajeInline  = MENSAJES.contrasena;
        let mensajeToast   = '🔐 ' + MENSAJES.generico;

        if (textoError.includes('correo') || textoError.includes('email') || textoError.includes('usuario')) {
            campoFallido  = inputEmail;
            mensajeInline = MENSAJES.correo;
            mensajeToast  = '📧 ' + MENSAJES.correo;
        }

        /* Shake + inline error + toast */
        marcarError(campoFallido, mensajeInline);
        mostrarToast(mensajeToast);

        /* Llevar el foco al campo con error */
        campoFallido.focus();
    }
});