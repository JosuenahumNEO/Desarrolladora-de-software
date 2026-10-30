/* =====================================================
           MODO OSCURO (Sincronizado con localStorage de los Homes)
           ===================================================== */
const btnModo = document.getElementById('boton-modo');
const iconoModo = document.getElementById('icono-modo');

function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    if (iconoModo) {
        iconoModo.className = activo ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

btnModo.addEventListener('click', () => {
    const activo = !document.body.classList.contains('modo-oscuro');
    aplicarModoOscuro(activo);
});

// Inicializar según preferencia guardada en los paneles
aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');

/* =====================================================
   TOGGLE VISIBILIDAD DE CONTRASEÑA
   ===================================================== */
document.querySelectorAll('.btn-toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
});

/* =====================================================
   MEDIDOR DE FORTALEZA DE CONTRASEÑA
   ===================================================== */
const passInput = document.getElementById('contrasena');
const meterBar = document.getElementById('meter-bar');
const meterLabel = document.getElementById('meter-label');

passInput.addEventListener('input', () => {
    const val = passInput.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let pct = '0%';
    let color = 'transparent';
    let label = 'Seguridad';

    if (val.length === 0) {
        pct = '0%';
        label = 'Seguridad';
    } else if (score <= 1) {
        pct = '25%';
        color = '#ef4444';
        label = 'Débil';
    } else if (score === 2) {
        pct = '50%';
        color = '#f59e0b';
        label = 'Media';
    } else if (score === 3) {
        pct = '75%';
        color = '#91a2d9';
        label = 'Buena';
    } else {
        pct = '100%';
        color = '#10b981';
        label = 'Excelente';
    }

    meterBar.style.width = pct;
    meterBar.style.backgroundColor = color;
    meterLabel.textContent = label;
    meterLabel.style.color = color || 'inherit';
});

/* =====================================================
   FEEDBACK TOAST & VALIDACIÓN
   ===================================================== */
let toastEl = null;
let toastTimer = null;

function mostrarToast(mensaje, esError = true) {
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.className = 'toast-notif';
        toastEl.setAttribute('role', 'alert');
        toastEl.innerHTML = `
                    <span class="toast-notif__icon"></span>
                    <span class="toast-notif__text"></span>
                    <button type="button" class="toast-notif__close" aria-label="Cerrar">✕</button>
                `;
        toastEl.querySelector('.toast-notif__close').addEventListener('click', () => {
            toastEl.classList.remove('toast-visible');
        });
        document.body.appendChild(toastEl);
    }

    toastEl.classList.toggle('toast-error', esError);
    toastEl.querySelector('.toast-notif__icon').textContent = esError ? '⚠️' : '✅';
    toastEl.querySelector('.toast-notif__text').textContent = mensaje;
    toastEl.classList.add('toast-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.remove('toast-visible');
    }, 4500);
}

function marcarError(campo, mensaje) {
    campo.classList.add('input-error');
    campo.setAttribute('aria-invalid', 'true');

    const prevMsg = campo.closest('.form-group').querySelector('.field-error-msg');
    if (prevMsg) prevMsg.remove();

    const msg = document.createElement('p');
    msg.className = 'field-error-msg';
    msg.innerHTML = `<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ${mensaje}`;
    campo.closest('.input-wrapper').insertAdjacentElement('afterend', msg);

    campo.addEventListener('input', function limpiar() {
        campo.classList.remove('input-error');
        campo.removeAttribute('aria-invalid');
        msg.remove();
        campo.removeEventListener('input', limpiar);
    });
}

const form = document.getElementById('form-registro');
form.addEventListener('submit', (e) => {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const pass = document.getElementById('contrasena');
    const conf = document.getElementById('confirmar');
    const terminos = document.getElementById('terminos');

    let tieneError = false;

    if (!nombre.value.trim()) {
        e.preventDefault();
        marcarError(nombre, 'Ingresa tu nombre o razón social.');
        tieneError = true;
    }

    if (!correo.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
        e.preventDefault();
        marcarError(correo, 'Ingresa un correo electrónico válido.');
        tieneError = true;
    }

    if (pass.value.length < 8) {
        e.preventDefault();
        marcarError(pass, 'La contraseña debe tener al menos 8 caracteres.');
        tieneError = true;
    }

    if (pass.value !== conf.value) {
        e.preventDefault();
        marcarError(conf, 'Las contraseñas no coinciden.');
        tieneError = true;
    }

    if (!terminos.checked) {
        e.preventDefault();
        mostrarToast('Debes aceptar los términos y condiciones para continuar.', true);
        tieneError = true;
    }

    if (tieneError) {
        mostrarToast('Por favor revisa los campos señalados.', true);
    }
});