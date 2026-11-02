const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');

const itemModo = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '/svg/moon-sat.svg';
const ICONO_SOL = '/svg/sun-light.svg';

/* CAmbio importante ahora cada icono guarda su ruta normal en "data-base" (esto para hacer cambio mas rapido de iconos negros a blanco).
   En modo oscuro se usa la version "White" de los iconos (ej: sun-lightWhite.svg) todos tienen su version white */
function rutaBase(img) {
    if (!img.dataset.base) {
        img.dataset.base = img.getAttribute('src');
    }
    return img.dataset.base;
}

function aplicarIcono(img, oscuro) {
    const base = rutaBase(img);
    img.src = oscuro ? base.replace(/\.svg$/, 'White.svg') : base;
}

function actualizarIconos(oscuro) {
    document.querySelectorAll('img[src*="svg/"]').forEach(img => aplicarIcono(img, oscuro));
}

/* menú hamburguesa del header */
if (menu && sidebar && main) {
    menu.addEventListener('click', () => {
        sidebar.classList.toggle('menu-toggle');
        main.classList.toggle('menu-toggle');

        if (imagen) {
            const actual = rutaBase(imagen);
            imagen.dataset.base = actual.endsWith('/keyframes.svg')
                ? '/svg/keyframes-solid.svg'
                : '/svg/keyframes.svg';
            aplicarIcono(imagen, document.body.classList.contains('modo-oscuro'));
        }
    });
}

/* modo oscuro */
function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    if (itemModo) itemModo.setAttribute('aria-checked', String(activo));
    if (iconoModo) iconoModo.dataset.base = activo ? ICONO_SOL : ICONO_LUNA;
    actualizarIconos(activo);
    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

if (itemModo) {
    itemModo.addEventListener('click', () => {
        aplicarModoOscuro(!document.body.classList.contains('modo-oscuro'));
    });
}

aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');

/* Navegación por controlador MVC */
document.querySelectorAll('[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;

        const rutas = {
            'cuenta': '/?url=configuracion/cuenta',
            'idioma': '/?url=configuracion/idioma',
            'apariencia': '/?url=configuracion/apariencia',
            'accesibilidad': '/?url=configuracion/accesibilidad',
            'notificaciones': '/?url=configuracion/notificaciones',
            'seguridad': '/?url=configuracion/seguridad',
            'privacidad': '/?url=configuracion/privacidad',
            'soporte': '/?url=chat/conversacion',
            'datos': '/?url=configuracion/datos',
            'menu': '/?url=home',
            'chat': '/?url=chat',
            'configuracion': '/?url=configuracion',
            'logout': '/?url=auth/logout'
        };

        if (rutas[accion]) {
            window.location.href = rutas[accion];
        }
    });
});