/* =====================================================
   BASE COMPARTIDA: menu hamburguesa + modo oscuro
   Cargar ANTES del js de cada pagina.
   ===================================================== */

const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');

const itemModo = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '/public/svg/moon-sat.svg';
const ICONO_SOL = '/public/svg/sun-light.svg';

/* menú hamburguesa del header */
menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');

    if (imagen.src.includes('/public/svg/keyframes.svg')) {
        imagen.src = '/public/svg/keyframes-solid.svg';
    } else {
        imagen.src = '/public/svg/keyframes.svg';
    }
});

/* modo oscuro */
function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    itemModo.setAttribute('aria-checked', String(activo));
    iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

itemModo.addEventListener('click', () => {
    aplicarModoOscuro(!document.body.classList.contains('modo-oscuro'));
});

aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');