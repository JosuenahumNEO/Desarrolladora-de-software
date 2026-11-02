/* =====================================================
   CONVERSACION con un desarrollador
   El chat NO desaparece: los mensajes se guardan por id de conversación.
   ===================================================== */

/* ===== DATOS DE PRUEBA: reemplazar con los desarrolladores reales ===== */
const DESARROLLADORES = {
    '1': { nombre: 'Nahúm (desarrollador)', avatar: '/public/svg/cube-hole.svg' },
    '2': { nombre: 'Oyoque (desarrollador)', avatar: '/public/img/dev-oyoque.png' }
};

/* id de la conversación: conversacion.html?id=2  (si no viene, usa la 1) */
const params = new URLSearchParams(window.location.search);
const chatId = DESARROLLADORES[params.get('id')] ? params.get('id') : '1';
const dev = DESARROLLADORES[chatId];
const CLAVE_CHAT = `chat-${chatId}`;

const convNombre = document.getElementById('conv-nombre');
const convAvatar = document.getElementById('conv-avatar');
const listaMensajes = document.getElementById('mensajes');
const vacio = document.getElementById('vacio');
const formMensaje = document.getElementById('form-mensaje');
const inputMensaje = document.getElementById('input-mensaje');

convNombre.textContent = dev.nombre;
convAvatar.src = dev.avatar;

/* Panel lateral con los datos del desarrollador (no existe en pantallas muy chicas) */
const asideNombre = document.getElementById('aside-nombre');
const asideAvatar = document.getElementById('aside-avatar');
if (asideNombre) asideNombre.textContent = dev.nombre;
if (asideAvatar) asideAvatar.src = dev.avatar;
document.title = `Chat con ${dev.nombre}`;

/* ===== Guardado (por ahora en el navegador) ===== */

function cargarMensajes() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CHAT)) || [];
    } catch {
        return [];
    }
}

function guardarMensajes(lista) {
    localStorage.setItem(CLAVE_CHAT, JSON.stringify(lista));
    // TODO: con backend, enviar el mensaje al servidor y recibir los del desarrollador
}

const mensajes = cargarMensajes();

/* ===== Pintar mensajes ===== */

function formatearHora(iso) {
    return new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

function crearBurbuja(mensaje) {
    const li = document.createElement('li');
    li.className = `mensaje ${mensaje.autor === 'yo' ? 'mio' : 'ajeno'}`;

    // textContent (no innerHTML) para que nadie pueda inyectar HTML en el chat
    const texto = document.createElement('span');
    texto.className = 'mensaje-texto';
    texto.textContent = mensaje.texto;

    const hora = document.createElement('time');
    hora.className = 'mensaje-hora';
    hora.dateTime = mensaje.hora;
    hora.textContent = formatearHora(mensaje.hora);

    li.append(texto, hora);
    return li;
}

function irAlFinal() {
    listaMensajes.scrollTop = listaMensajes.scrollHeight;
}

mensajes.forEach(m => listaMensajes.appendChild(crearBurbuja(m)));
vacio.hidden = mensajes.length > 0;
irAlFinal();

/* ===== Enviar ===== */

formMensaje.addEventListener('submit', e => {
    e.preventDefault();

    const texto = inputMensaje.value.trim();
    if (!texto) return;

    const mensaje = { autor: 'yo', texto, hora: new Date().toISOString() };
    mensajes.push(mensaje);
    guardarMensajes(mensajes);

    vacio.hidden = true;
    listaMensajes.appendChild(crearBurbuja(mensaje));
    irAlFinal();

    inputMensaje.value = '';
    inputMensaje.focus();
});

/* ===== Botón volver ===== */
document.querySelector('[data-accion="volver-chat"]').addEventListener('click', () => {
    console.log('Clic en: volver-chat');
    window.location.href = '/?url=chat';
});

inputMensaje.focus();
