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

/* Botones preparados para conectarse */
/* Cada botón tiene data-accion. ESTO CREO QUE ES IMPORTANTE Quien conecte las pestañas agrega aquí su lógica. */
document.querySelectorAll('[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;
        console.log('Clic en:', accion);

        if (accion === 'cuenta') {
            window.location.href = '/src/Views/cuenta.html';
        }

        if (accion === 'idioma') {
            window.location.href = '/src/Views/idioma.html';
        }

        if (accion === 'apariencia') {
            window.location.href = '/src/Views/apariencia.html';
        }

        if (accion === 'accesibilidad') {
            window.location.href = '/src/Views/accesibilidad.html';
        }

        if (accion === 'notificaciones') {
            window.location.href = '/src/Views/notificaciones.html';
        }

        if (accion === 'seguridad') {
            window.location.href = '/src/Views/seguridad.html';
        }

        if (accion === 'privacidad') {
            window.location.href = '/src/Views/privacidad.html';
        }

        if (accion === 'soporte') {
            window.location.href = '/src/Views/conversacion.html';
        }

        if (accion === 'datos') {
            window.location.href = '/src/Views/datos.html';
        }

        // Segun vi el ejemplo de cómo conectarlo después:
        // if (accion === 'cuenta') abrirPanelCuenta();
        // if (accion === 'cerrar-sesion') cerrarSesion();
    });
});
 // Tengo que dejar comentarios aqui o no puedo? osea realmente quien me detiene?