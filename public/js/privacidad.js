/* =====================================================
   PRIVACIDAD
   - Interruptores de permisos (todos desactivados por defecto). Se guardan en localStorage
     ('ajustes:permisos'); aún no piden permisos reales al navegador.
   - Enlaces de información legal.
   base.js y ajustes.js ya están cargados (header, aside, modo oscuro).
   ===================================================== */
(() => {
  'use strict';

  const App = window.App;
  const CLAVE = 'ajustes:permisos';
  const permisos = App ? App.leer(CLAVE, {}) : {};

  document.querySelectorAll('.permiso-switch').forEach(boton => {
    const nombre = boton.dataset.permiso;
    boton.setAttribute('aria-checked', String(permisos[nombre] === true));

    boton.addEventListener('click', () => {
      const activo = boton.getAttribute('aria-checked') !== 'true';
      boton.setAttribute('aria-checked', String(activo));
      permisos[nombre] = activo;
      if (App) App.guardar(CLAVE, permisos);
      // TODO: con backend, guardar el permiso en el perfil del usuario
    });
  });

  const RUTAS_LEGALES = {
    'quienes-somos': '/?url=home/conocenos',
    'politica-privacidad': '/?url=legal/privacidad',
    'terminos': '/?url=legal/terminos'
  };

  document.querySelectorAll('.enlace-fila[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
      const ruta = RUTAS_LEGALES[boton.dataset.accion];
      if (ruta) window.location.href = ruta;
    });
  });
})();
