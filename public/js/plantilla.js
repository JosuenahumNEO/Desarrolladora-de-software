const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const imagen = document.getElementById('keyframes2');
const main = document.getElementById('main');
const selectorIdioma = document.getElementById("selector-idioma");
const idiomaActual = document.getElementById("idioma-actual");
const banderas = document.querySelectorAll(".tarjeta-idioma");

const itemModo = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

const ICONO_LUNA = '../../public/svg/moon-sat.svg';
const ICONO_SOL = '../../public/svg/sun-light.svg';

/* menú hamburguesa del header */
menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');

    if (imagen.src.includes('/public/svg/keyframes.svg')) {
        imagen.src = '../../public/svg/keyframes-solid.svg';
    } else {
        imagen.src = '../../public/svg/keyframes.svg';
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

        // Segun vi el ejemplo de cómo conectarlo después:
        // if (accion === 'cuenta') abrirPanelCuenta();
        // if (accion === 'cerrar-sesion') cerrarSesion();
    });
});

 // Idioma predeterminado
let idiomaSeleccionado = "es-MX";

// Nombres de los idiomas disponibles
const nombresIdiomas = {
    "es-MX": "Español (México)",
    "zh-CN": "Chino (Simplificado)",
    "hi-IN": "Hindi",
    "en-GB": "Inglés (Reino Unido)",
    "ru-RU": "Ruso",
    "fr-FR": "Francés"
};

// Actualiza el recuadro y marca la bandera seleccionada
function cambiarIdioma(codigoIdioma) {
    if (!nombresIdiomas[codigoIdioma]) {
        return;
    }

    idiomaSeleccionado = codigoIdioma;

    idiomaActual.textContent =
        "Idioma actual: " + nombresIdiomas[codigoIdioma];

    // Sincroniza la lista desplegable
    selectorIdioma.value = codigoIdioma;

    // Marca visualmente la bandera seleccionada
    banderas.forEach(function (bandera) {
        const esSeleccionada =
            bandera.dataset.idioma === codigoIdioma;

        bandera.classList.toggle("seleccionado", esSeleccionada);

        bandera.setAttribute(
            "aria-pressed",
            String(esSeleccionada)
        );
    });

    // Actualiza el idioma declarado en el documento
    document.documentElement.lang = codigoIdioma;
}

// Cuando se selecciona una opción del desplegable
selectorIdioma.addEventListener("change", function () {
    cambiarIdioma(selectorIdioma.value);
});

// Cuando se pulsa una bandera
banderas.forEach(function (bandera) {
    bandera.addEventListener("click", function () {
        cambiarIdioma(bandera.dataset.idioma);
    });
});


// Establece el idioma inicial
cambiarIdioma(idiomaSeleccionado);