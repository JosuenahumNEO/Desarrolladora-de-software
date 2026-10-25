/* =====================================================
   ADMIN / HOME — Lógica específica de la pantalla
   ===================================================== */

/* --- Sidebar hamburguesa --- */
const menuBtn  = document.getElementById('menu');
const sidebar  = document.getElementById('sidebar');
const mainEl   = document.getElementById('main');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    mainEl.classList.toggle('menu-toggle');
});

/* --- Modo oscuro (FA: cambia clases en lugar de src) --- */
const itemModo  = document.getElementById('item-modo');
const iconoModo = document.getElementById('icono-modo');

function aplicarModoOscuro(activo) {
    document.body.classList.toggle('modo-oscuro', activo);
    itemModo.setAttribute('aria-checked', String(activo));

    if (activo) {
        iconoModo.classList.remove('fa-moon');
        iconoModo.classList.add('fa-sun');
    } else {
        iconoModo.classList.remove('fa-sun');
        iconoModo.classList.add('fa-moon');
    }

    localStorage.setItem('modoOscuro', activo ? '1' : '0');
}

itemModo.addEventListener('click', () => {
    aplicarModoOscuro(!document.body.classList.contains('modo-oscuro'));
});

aplicarModoOscuro(localStorage.getItem('modoOscuro') === '1');

/* --- Navegación del sidebar --- */
document.querySelectorAll('[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
        const accion = boton.dataset.accion;

        if (accion === 'chat') {
            window.location.href = '/src/Views/chat.html';
        }

        if (accion === 'configuracion') {
            window.location.href = '/src/Views/configuracion.html';
        }

        if (accion === 'panel') {
            console.log('Panel de administrador — pendiente de conectar');
        }

        if (accion === 'logout') {
            window.location.href = '/src/Views/login.html';
        }
    });
});

/* --- Búsqueda en tiempo real --- */
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.sw-card');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        cards.forEach(card => {
            const name = card.querySelector('.sw-card__name')?.textContent.toLowerCase() ?? '';
            const desc = card.querySelector('.sw-card__desc')?.textContent.toLowerCase() ?? '';
            card.style.display = (name.includes(query) || desc.includes(query)) ? '' : 'none';
        });
    });
}

/* --- FAB: Agregar sistema --- */
const fabAdd = document.getElementById('fab-add');

if (fabAdd) {
    fabAdd.addEventListener('click', () => {
        console.log('Agregar nuevo sistema — pendiente de conectar');
    });
}
