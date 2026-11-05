
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ELEMENTOS DEL DISEÑO GENERAL
    // ==========================================

    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("sidebar");
    const imagenMenu = document.getElementById("keyframes2");
    const main = document.getElementById("main");

    const itemModo = document.getElementById("item-modo");
    const iconoModo = document.getElementById("icono-modo");

    const ICONO_LUNA = "../../public/svg/moon-sat.svg";
    const ICONO_SOL = "../../public/svg/sun-light.svg";

    // ==========================================
    // 2. MENÚ LATERAL
    // ==========================================

    if (menu && sidebar && imagenMenu && main) {
        menu.addEventListener("click", function () {
            sidebar.classList.toggle("menu-toggle");
            main.classList.toggle("menu-toggle");

            if (sidebar.classList.contains("menu-toggle")) {
                imagenMenu.src = "../../public/svg/keyframes-solid.svg";
            } else {
                imagenMenu.src = "../../public/svg/keyframes.svg";
            }
        });
    }

    // ==========================================
    // 3. MODO CLARO Y OSCURO
    // ==========================================

    function aplicarModoOscuro(activo) {
        document.body.classList.toggle("modo-oscuro", activo);

        if (itemModo) {
            itemModo.setAttribute("aria-checked", String(activo));
        }

        if (iconoModo) {
            iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
        }

        try {
            localStorage.setItem("modoOscuro", activo ? "1" : "0");
        } catch (error) {
            console.warn("No se pudo guardar la preferencia de apariencia.");
        }
    }

    if (itemModo) {
        itemModo.addEventListener("click", function () {
            const activo = document.body.classList.contains("modo-oscuro");
            aplicarModoOscuro(!activo);
        });
    }

    let modoGuardado = false;

    try {
        modoGuardado = localStorage.getItem("modoOscuro") === "1";
    } catch (error) {
        console.warn("No se pudo recuperar la preferencia de apariencia.");
    }

    aplicarModoOscuro(modoGuardado);

    // ==========================================
    // 4. ELEMENTOS DE LA VISTA DE IDIOMA
    // ==========================================

    const selectorIdioma = document.getElementById("selector-idioma");
    const idiomaActual = document.getElementById("idioma-actual");
    const banderas = document.querySelectorAll(".tarjeta-idioma");

    const textoIdiomaActual = idiomaActual
        ? idiomaActual.querySelector('[data-i18n="espanolMexico"]')
        : null;

    let idiomaSeleccionado = "es-MX";

    const nombresIdiomas = {
        "es-MX": "Español (México)",
        "zh-CN": "Chino (Simplificado)",
        "hi-IN": "Hindi",
        "en-GB": "Inglés (Reino Unido)",
        "ru-RU": "Ruso",
        "fr-FR": "Francés"
    };

    // ==========================================
    // 5. CAMBIAR EL IDIOMA SELECCIONADO
    // ==========================================

    function cambiarIdioma(codigoIdioma) {
        if (!nombresIdiomas[codigoIdioma]) {
            return;
        }

        idiomaSeleccionado = codigoIdioma;

        // Actualiza el texto del recuadro sin eliminar su estructura HTML.
        if (textoIdiomaActual) {
            textoIdiomaActual.textContent = nombresIdiomas[codigoIdioma];
        }

        // Sincroniza el selector desplegable.
        if (selectorIdioma) {
            selectorIdioma.value = codigoIdioma;
        }

        // Marca la bandera elegida.
        banderas.forEach(function (bandera) {
            const seleccionada =
                bandera.dataset.idioma === codigoIdioma;

            bandera.classList.toggle("seleccionado", seleccionada);
            bandera.setAttribute("aria-pressed", String(seleccionada));
        });

        // Actualiza el idioma declarado del documento.
        document.documentElement.lang = codigoIdioma;

        // Guarda la preferencia para utilizarla en la integración posterior.
        try {
            localStorage.setItem("idiomaSeleccionado", idiomaSeleccionado);
        } catch (error) {
            console.warn("No se pudo guardar el idioma seleccionado.");
        }
    }

    // ==========================================
    // 6. EVENTOS DE SELECCIÓN
    // ==========================================

    if (selectorIdioma) {
        selectorIdioma.addEventListener("change", function () {
            cambiarIdioma(selectorIdioma.value);
        });
    }

    banderas.forEach(function (bandera) {
        bandera.addEventListener("click", function () {
            cambiarIdioma(bandera.dataset.idioma);
        });
    });

    // ==========================================
    // 7. ACCIONES GENERALES DEL MENÚ
    // ==========================================

    document.querySelectorAll("[data-accion]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const accion = boton.dataset.accion;

            console.log("Clic en:", accion);

            // Aquí se conectarán las acciones reales del sistema.
        });
    });

    // ==========================================
    // 8. ESTADO INICIAL DE LA VISTA
    // ==========================================

   // Recuperar el idioma guardado //
let idiomaGuardado = "es-MX";
try {
    const idiomaGuardadoLocal = localStorage.getItem("idiomaSeleccionado");

    if (idiomaGuardadoLocal && nombresIdiomas[idiomaGuardadoLocal]) {
        idiomaGuardado = idiomaGuardadoLocal;
    }

} catch (error) {
    console.warn("No se pudo recuperar el idioma seleccionado.");
}

// Aplicar el idioma guardado al cargar la página
cambiarIdioma(idiomaGuardado);


});






// Conectar con el Google Translate //










    // ==========================================
    // 9. NAVEGACIÓN ENTRE LAS VISTAS
    // ==========================================

    const rutasVistas = {
        menu: "/?url=home",
        chat: "/?url=chat",
        configuracion: "/?url=configuracion"
    };

    document.querySelectorAll(".btn-sidebar[data-accion]").forEach((boton) => {

        boton.addEventListener("click", () => {

            const accion = boton.dataset.accion;
            const ruta = rutasVistas[accion];

            if (ruta) {
                window.location.href = ruta;
            }

        });

    });
