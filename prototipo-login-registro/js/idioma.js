
const selectorIdioma = document.getElementById("selector-idioma");
const idiomaActual = document.getElementById("idioma-actual");
const banderas = document.querySelectorAll(".tarjeta-idioma");
const interruptorModo = document.getElementById("interruptor-modo");

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

// Alternar entre modo claro y oscuro
interruptorModo.addEventListener("change", function () {
    document.body.classList.toggle(
        "oscuro",
        interruptorModo.checked
    );
});

// Establece el idioma inicial
cambiarIdioma(idiomaSeleccionado);

















// Conectar con el Google Translate //

