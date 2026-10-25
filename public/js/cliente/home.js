/* =====================================================
   HOME CLIENTE — Lógica de la pantalla
   ===================================================== */

/* --- Modo oscuro (checkbox) --- */
const interruptor = document.getElementById('interruptor-modo');

function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    interruptor.checked = activo;
    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

interruptor.addEventListener('change', () => {
    aplicarModoOscuro(interruptor.checked);
});

aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');

/* --- Navegación --- */
document.querySelectorAll('[data-accion]').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        const accion = el.dataset.accion;

        if (accion === 'chat') {
            window.location.href = '/src/Views/chat.html';
        }
        if (accion === 'configuracion') {
            window.location.href = '/src/Views/configuracion.html';
        }
        if (accion === 'logout') {
            window.location.href = '/src/Views/login.html';
        }
    });
});

/* --- Botones "VER +" de las tarjetas --- */
document.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Conectar con la ruta del sistema correspondiente cuando esté disponible
        console.log('Ver sistema:', btn.id);
    });
});

/* --- Búsqueda en tiempo real --- */
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        cards.forEach(card => {
            const name = card.querySelector('.product-card__name')?.textContent.toLowerCase() ?? '';
            const desc = card.querySelector('.product-card__desc')?.textContent.toLowerCase() ?? '';
            card.style.display = (name.includes(query) || desc.includes(query)) ? '' : 'none';
        });
    });
}
