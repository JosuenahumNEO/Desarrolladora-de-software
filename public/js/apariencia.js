
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. ELEMENTOS DEL DISEÑO GENERAL
    // ==========================================

    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("sidebar");
    const imagen = document.getElementById("keyframes2");
    const main = document.getElementById("main");

    const itemModo = document.getElementById("item-modo");
    const iconoModo = document.getElementById("icono-modo");

    const ICONO_LUNA = "../../public/svg/moon-sat.svg";
    const ICONO_SOL = "../../public/svg/sun-light.svg";

    // ==========================================
    // 2. MENÚ HAMBURGUESA
    // ==========================================

    if (menu && sidebar && main && imagen) {

        menu.addEventListener("click", () => {

            sidebar.classList.toggle("menu-toggle");
            main.classList.toggle("menu-toggle");

            if (imagen.src.includes("keyframes.svg") &&
                !imagen.src.includes("keyframes-solid.svg")) {

                imagen.src = "../../public/svg/keyframes-solid.svg";

            } else {

                imagen.src = "../../public/svg/keyframes.svg";

            }

        });

    }

    // ==========================================
    // 3. TARJETAS DE APARIENCIA
    // ==========================================

    const tarjetas = document.querySelectorAll(".tarjeta");

    function actualizarTarjetas(modo) {

        tarjetas.forEach((tarjeta) => {

            const boton = tarjeta.querySelector(".boton-modo");
            const texto = tarjeta.querySelector(".texto-seleccion");

            if (!boton || !texto) return;

            const seleccionada = tarjeta.dataset.modo === modo;

            tarjeta.classList.toggle("seleccionada", seleccionada);

            boton.setAttribute(
                "aria-pressed",
                String(seleccionada)
            );

            texto.textContent = seleccionada
                ? "✓ Modo " + modo + " seleccionado"
                : "Seleccionar modo " + tarjeta.dataset.modo;

        });

    }

    // ==========================================
    // 4. APLICAR MODO CLARO U OSCURO
    // ==========================================

    function aplicarModoOscuro(activo, guardar = true) {

        document.body.classList.toggle("modo-oscuro", activo);

        // Sincronizar el interruptor lateral
        if (itemModo) {
            itemModo.setAttribute(
                "aria-checked",
                String(activo)
            );
        }

        // Cambiar el icono de luna por el de sol
        if (iconoModo) {
            iconoModo.src = activo ? ICONO_SOL : ICONO_LUNA;
        }

        // Actualizar también las tarjetas de apariencia
        actualizarTarjetas(activo ? "oscuro" : "claro");

        // Recordar el modo seleccionado
        if (guardar) {
            try {
                localStorage.setItem(
                    "modoOscuro",
                    activo ? "1" : "0"
                );
            } catch (error) {
                console.warn(
                    "No se pudo guardar la preferencia de apariencia.",
                    error
                );
            }
        }

    }

    // ==========================================
    // 5. INTERRUPTOR DEL MENÚ LATERAL
    // ==========================================

    if (itemModo) {

        itemModo.addEventListener("click", () => {

            const oscuroActivado =
                !document.body.classList.contains("modo-oscuro");

            aplicarModoOscuro(oscuroActivado);

        });

    }

    // ==========================================
    // 6. BOTONES DE LAS TARJETAS
    // ==========================================

    tarjetas.forEach((tarjeta) => {

        const boton = tarjeta.querySelector(".boton-modo");

        if (!boton) return;

        boton.addEventListener("click", () => {

            const modoElegido = tarjeta.dataset.modo;

            // Aplicar el tema y sincronizar toda la interfaz
            aplicarModoOscuro(modoElegido === "oscuro");

        });

    });

    // ==========================================
    // 7. RESTAURAR EL MODO GUARDADO
    // ==========================================

    let modoGuardado = "0";

    try {
        modoGuardado = localStorage.getItem("modoOscuro") || "0";
    } catch (error) {
        console.warn(
            "No se pudo recuperar la preferencia de apariencia.",
            error
        );
    }

    aplicarModoOscuro(modoGuardado === "1", false);

    // ==========================================
    // 8. BOTONES PREPARADOS PARA CONECTARSE
    // ==========================================

    document.querySelectorAll("[data-accion]").forEach((boton) => {

        boton.addEventListener("click", () => {

            const accion = boton.dataset.accion;

            console.log("Clic en:", accion);

            // Aquí se podrá conectar la lógica de cada acción.
            // Por ejemplo: abrir una vista o cerrar la sesión.

        });

    });

});
