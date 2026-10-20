document.addEventListener("DOMContentLoaded", function () {

    // Obtener los elementos de la vista
    const interruptor = document.getElementById(
        "interruptor-notificaciones"
    );

    const estado = document.getElementById(
        "estado-notificaciones"
    );

    // Actualizar el mensaje según el estado del interruptor
    function actualizarEstado() {

        if (interruptor.checked) {
            estado.textContent = "Notificaciones activadas";
        } else {
            estado.textContent = "Notificaciones desactivadas";
        }
    }

    // Detectar cuando el usuario cambia el interruptor
    interruptor.addEventListener("change", actualizarEstado);

    // Mostrar el estado inicial al abrir la página
    actualizarEstado();

});
