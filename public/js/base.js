/* =====================================================
   BASE COMPARTIDA: menu hamburguesa + modo oscuro + navegación del aside
   Cargar ANTES del js de cada pagina.
   Todas las vistas (chat, conversación, configuración y subpantallas)
   usan este archivo, así el aside se comporta igual en todas.
   ===================================================== */

const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');

const itemModo = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '/svg/moon-sat.svg';
const ICONO_SOL = '/svg/sun-light.svg';

/* Rutas del aside (controlador MVC: ?url=controlador/metodo) */
const RUTAS_SIDEBAR = {
    menu: '/?url=home',
    chat: '/?url=chat',
    configuracion: '/?url=configuracion',
    logout: '/?url=auth/logout'
};

/* Cada icono guarda su ruta normal en "data-base". En modo oscuro se usa la versión
   "White" (ej: sun-lightWhite.svg). Solo se cambian los iconos del header y del aside,
   que son los que tienen versión blanca. */
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
    document.querySelectorAll('header img[src*="svg/"], .sidebar img[src*="svg/"]')
        .forEach(img => aplicarIcono(img, oscuro));
}

/* menú hamburguesa del header */
if (menu && sidebar && main) {
    menu.setAttribute('role', 'button');
    menu.setAttribute('tabindex', '0');
    menu.setAttribute('aria-label', 'Abrir o cerrar el menú');
    menu.setAttribute('aria-expanded', 'false');

    const alternarMenu = () => {
        const abierto = sidebar.classList.toggle('menu-toggle');
        main.classList.toggle('menu-toggle', abierto);
        menu.setAttribute('aria-expanded', String(abierto));

        if (imagen) {
            imagen.dataset.base = abierto ? '/svg/keyframes-solid.svg' : '/svg/keyframes.svg';
            aplicarIcono(imagen, document.body.classList.contains('modo-oscuro'));
        }
    };

    menu.addEventListener('click', alternarMenu);
    menu.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            alternarMenu();
        }
    });
}

/* modo oscuro */
function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    if (itemModo) itemModo.setAttribute('aria-checked', String(activo));
    if (iconoModo) iconoModo.dataset.base = activo ? ICONO_SOL : ICONO_LUNA;
    actualizarIconos(activo);

    try {
        localStorage.setItem('modoOscuro', activo ? '1' : '0');
    } catch (error) {
        console.warn('No se pudo guardar la preferencia de apariencia.');
    }

    // Las vistas que muestran el modo (ej. Apariencia) se enteran con este evento
    document.dispatchEvent(new CustomEvent('modo-oscuro', { detail: { activo } }));
}

if (itemModo) {
    itemModo.addEventListener('click', () => {
        aplicarModoOscuro(!document.body.classList.contains('modo-oscuro'));
    });
}

let modoGuardado = false;
try {
    modoGuardado = localStorage.getItem('modoOscuro') === '1';
} catch (error) {
    console.warn('No se pudo recuperar la preferencia de apariencia.');
}
aplicarModoOscuro(modoGuardado);

/* Navegación del aside común */
document.querySelectorAll('.sidebar .btn-sidebar[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const ruta = RUTAS_SIDEBAR[boton.dataset.accion];
        if (ruta) window.location.href = ruta;
    });
});
