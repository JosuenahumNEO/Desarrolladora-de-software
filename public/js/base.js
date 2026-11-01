/* =====================================================
   BASE COMPARTIDA: menu hamburguesa + modo oscuro + navegación
   Cargar ANTES del js de cada pagina.
   ===================================================== */

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
            if (imagen.src.includes('keyframes-solid.svg')) {
                imagen.src = '/svg/keyframes.svg';
            } else {
                imagen.src = '/svg/keyframes-solid.svg';
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

/* Navegación del sidebar común */
document.querySelectorAll('.sidebar .btn-sidebar[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;
        if (accion === 'menu') {
            window.location.href = '/?url=home';
        } else if (accion === 'chat') {
            window.location.href = '/?url=chat';
        } else if (accion === 'configuracion') {
            window.location.href = '/?url=configuracion';
        } else if (accion === 'logout') {
            window.location.href = '/?url=auth/logout';
        }
    });
});
