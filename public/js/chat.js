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

/* ===== CHAT ===== */

/* Marca una conversación como leída (quita el puntito azul) */
function marcarComoLeido(chatItem) {
    chatItem.classList.remove('no-leido');
    const punto = chatItem.querySelector('.chat-punto');
    if (punto) punto.removeAttribute('aria-label');
}

/* Abre una conversación. Quien conecte el backend completa esta función. */
function abrirChat(id, chatItem) {
    console.log('Abrir chat con id:', id);
    marcarComoLeido(chatItem);
    // TODO: window.location.href = `/chat/${id}`;
}

/* Botones preparados para conectarse */
/* Cada botón tiene data-accion. Quien conecte las pestañas agrega aquí su lógica. */
document.querySelectorAll('[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;
        console.log('Clic en:', accion);

        if (accion === 'abrir-chat') abrirChat(boton.dataset.id, boton);

        // if (accion === 'contactar-desarrolladores') abrirFormularioContacto();
        // if (accion === 'configuracion') window.location.href = '/configuracion';
        // if (accion === 'logout') cerrarSesion();
    });
});