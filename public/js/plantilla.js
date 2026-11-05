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
                    imagenMenu.src = "/svg/keyframes.svg";
                } else {
                    imagenMenu.src = "/svg/keyframes-solid.svg";
                }
            }
        });
    }

    // ========================================
    // MODO OSCURO
    // ========================================

    const itemModo = document.getElementById("item-modo");
    const iconoModo = document.getElementById("icono-modo");

    const ICONO_LUNA = "/svg/moon-sat.svg";
    const ICONO_SOL = "/svg/sun-light.svg";

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

    document.querySelectorAll(".sidebar [data-accion]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const accion = boton.dataset.accion;
            if (accion === "menu") {
                window.location.href = "/?url=home";
            } else if (accion === "chat") {
                window.location.href = "/?url=chat";
            } else if (accion === "configuracion") {
                window.location.href = "/?url=configuracion";
            } else if (accion === "logout") {
                window.location.href = "/?url=auth/logout";
            }
        });
    });
});
