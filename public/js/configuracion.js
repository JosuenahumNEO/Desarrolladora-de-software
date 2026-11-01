const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');

const itemModo = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '/svg/moon-sat.svg';
const ICONO_SOL = '/svg/sun-light.svg';

/* menú hamburguesa del header */
if (menu && sidebar && main) {
    menu.addEventListener('click', () => {
        sidebar.classList.toggle('menu-toggle');
        main.classList.toggle('menu-toggle');

        if (imagen) {
            if (imagen.src.includes('/svg/keyframes.svg')) {
                imagen.src = '/svg/keyframes-solid.svg';
            } else {
                imagen.src = '/svg/keyframes.svg';
            }
        }
    });
}

/* modo oscuro */
function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    if (itemModo) itemModo.setAttribute('aria-checked', String(activo));
    if (iconoModo) iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
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
