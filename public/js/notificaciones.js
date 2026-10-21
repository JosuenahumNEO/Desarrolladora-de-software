
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // INTERRUPTOR DE NOTIFICACIONES
    // ========================================

    const interruptorNotificaciones = document.getElementById(
        "interruptor-notificaciones"
    );

    const estadoNotificaciones = document.getElementById(
        "estado-notificaciones"
    );

    // Actualizar el mensaje según el estado
    function actualizarEstadoNotificaciones() {

        if (!interruptorNotificaciones || !estadoNotificaciones) {
            return;
        }

        if (interruptorNotificaciones.checked) {
            estadoNotificaciones.textContent =
                "Notificaciones activadas";
        } else {
            estadoNotificaciones.textContent =
                "Notificaciones desactivadas";
        }
    }

    // Escuchar los cambios del interruptor
    if (interruptorNotificaciones) {

        interruptorNotificaciones.addEventListener(
            "change",
            actualizarEstadoNotificaciones
        );

        // Mostrar el estado inicial
        actualizarEstadoNotificaciones();
    }


    // ========================================
    // INTERRUPTOR DEL MODO OSCURO
    // ========================================

    const interruptorModo = document.getElementById(
        "interruptor-modo"
    );

    if (interruptorModo) {

        // Aplicar el estado inicial del modo oscuro
        document.body.classList.toggle(
            "oscuro",
            interruptorModo.checked
        );

        // Cambiar de modo cuando se utilice el switch
        interruptorModo.addEventListener("change", function () {

            document.body.classList.toggle(
                "oscuro",
                interruptorModo.checked
            );

        });
    }

});
