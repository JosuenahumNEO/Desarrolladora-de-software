/* =====================================================
   CHAT
   El aside (menú hamburguesa, modo oscuro y navegación) lo maneja base.js,
   que se carga antes que este archivo. Aquí solo va la lógica del chat.
   ===================================================== */

const RUTA_CONVERSACION = '/?url=chat/conversacion';

/* Marca una conversación como leída (quita el puntito azul) */
function marcarComoLeido(chatItem) {
    chatItem.classList.remove('no-leido');
    const punto = chatItem.querySelector('.chat-punto');
    if (punto) punto.removeAttribute('aria-label');
}

/* Abre una conversación: conversacion.js lee el id de la URL */
function abrirChat(id, chatItem) {
    marcarComoLeido(chatItem);
    window.location.href = `${RUTA_CONVERSACION}&id=${encodeURIComponent(id)}`;
}

/* "Contactar desarrolladores" lleva a la conversación (conversacion.php) */
function abrirFormularioContacto() {
    window.location.href = RUTA_CONVERSACION;
}

document.querySelectorAll('[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;

        if (accion === 'abrir-chat') abrirChat(boton.dataset.id, boton);
        if (accion === 'contactar-desarrolladores') abrirFormularioContacto();
    });
});
