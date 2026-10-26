document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // MENÚ LATERAL
    // ========================================

    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("sidebar");
    const imagenMenu = document.getElementById("keyframes2");
    const main = document.getElementById("main");

    if (menu && sidebar && main) {
        menu.addEventListener("click", function () {
            sidebar.classList.toggle("menu-toggle");
            main.classList.toggle("menu-toggle");

            if (imagenMenu) {
                if (imagenMenu.src.includes("keyframes-solid.svg")) {
                    imagenMenu.src =
                        "../../public/svg/keyframes.svg";
                } else {
                    imagenMenu.src =
                        "../../public/svg/keyframes-solid.svg";
                }
            }
        });
    }

    // ========================================
    // MODO OSCURO
    // ========================================

    const itemModo = document.getElementById("item-modo");
    const iconoModo = document.getElementById("icono-modo");

    const ICONO_LUNA = "../../public/svg/moon-sat.svg";
    const ICONO_SOL = "../../public/svg/sun-light.svg";

    function aplicarModoOscuro(activo) {
        document.body.classList.toggle("modo-oscuro", activo);

        if (itemModo) {
            itemModo.setAttribute("aria-checked", String(activo));
        }

        if (iconoModo) {
            iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
        }

        localStorage.setItem("modoOscuro", activo ? "1" : "0");
    }

    if (itemModo) {
        itemModo.addEventListener("click", function () {
            const activado =
                document.body.classList.contains("modo-oscuro");

            aplicarModoOscuro(!activado);
        });

        aplicarModoOscuro(
            localStorage.getItem("modoOscuro") === "1"
        );
    }

    // ========================================
    // BOTONES DEL MENÚ
    // ========================================

    document.querySelectorAll("[data-accion]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const accion = boton.dataset.accion;
            console.log("Clic en:", accion);

            // Aquí se conectarán las acciones de cada botón.
        });
    });
});