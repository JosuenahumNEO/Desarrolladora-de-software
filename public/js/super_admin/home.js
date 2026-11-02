/* =====================================================
   SUPER ADMIN / HOME — Lógica de la pantalla
   ===================================================== */

/* --- Sidebar hamburguesa --- */
const menuBtn = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const mainEl  = document.getElementById('main');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    mainEl.classList.toggle('menu-toggle');
});

/* --- Modo oscuro --- */
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
            window.location.href = '/?url=chat';
        }
        if (accion === 'configuracion') {
            window.location.href = '/?url=configuracion';
        }
        if (accion === 'logout') {
            window.location.href = '/?url=auth/logout';
        }

        // Pendientes de conectar con sus vistas correspondientes
        if (accion === 'sistemas') {
            console.log('Gestión de sistemas — pendiente');
        }
        if (accion === 'admins') {
            console.log('Gestión de admins — pendiente');
        }
        if (accion === 'usuarios') {
            console.log('Gestión de usuarios — pendiente');
        }
        if (accion === 'nuevo-admin') {
            console.log('Nuevo admin — pendiente');
        }
        if (accion === 'nuevo-sistema') {
            console.log('Nuevo sistema — pendiente');
        }
        if (accion === 'solicitudes') {
            console.log('Ver solicitudes — pendiente');
        }
        if (accion === 'reportes') {
            console.log('Reportes — pendiente');
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

