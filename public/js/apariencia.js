const tarjetas = document.querySelectorAll(".tarjeta");
const interruptor = document.getElementById("interruptor-tema");

// Seleccionar una tarjeta de apariencia
tarjetas.forEach((tarjeta) => {

    const boton = tarjeta.querySelector(".boton-modo");
    const texto = tarjeta.querySelector(".texto-seleccion");

    boton.addEventListener("click", () => {

        // Quitar la selección anterior
        tarjetas.forEach((otraTarjeta) => {

            otraTarjeta.classList.remove("seleccionada");

            const otroBoton =
                otraTarjeta.querySelector(".boton-modo");

            otroBoton.setAttribute("aria-pressed", "false");

            otraTarjeta.querySelector(
                ".texto-seleccion"
            ).textContent =
                "Seleccionar " +
                otraTarjeta.dataset.modo.replace(
                    /^./,
                    letra => letra.toLowerCase()
                );
        });

        // Resaltar la opción elegida
        tarjeta.classList.add("seleccionada");
        boton.setAttribute("aria-pressed", "true");

        texto.textContent =
            "✓ " +
            "Modo " +
            tarjeta.dataset.modo +
            " seleccionado";
    });

});

// Interruptor de la interfaz general
interruptor.addEventListener("click", () => {

    const oscuroActivado =
        document.body.classList.toggle("modo-oscuro");

    interruptor.setAttribute(
        "aria-pressed",
        String(oscuroActivado)
    );

});