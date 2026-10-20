const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');

const itemModo = document.getElementById('item-modo');
const switchModo = document.getElementById('switch-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '/public/svg/moon-sat.svg';
const ICONO_SOL = '/public/svg/sun-light.svg';

/* menu hamburguesa */
menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');

    /* cambio de imagen para el menu */
    if (imagen.src.includes('/public/svg/keyframes.svg')) {
        imagen.src = '/public/svg/keyframes-solid.svg';
    } else {
        imagen.src = '/public/svg/keyframes.svg';
    }
});

/* modo oscuro */
function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    switchModo.checked = activo;
    iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

/* al hacer clic en toda la fila (texto, icono o switch) */
itemModo.addEventListener('click', () => {
    aplicarModoOscuro(!document.body.classList.contains('modo-oscuro'));
});

/* recordar la preferencia al volver a abrir la página */
aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');