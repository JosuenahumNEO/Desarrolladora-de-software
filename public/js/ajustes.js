/* ajustes.js — se carga en main.php (todas las vistas), después de plantilla.js.
   Aplica las preferencias de accesibilidad y el avatar guardado, y expone helpers a las vistas. */
(() => {
  // Ajusta las rutas que no coincidan con tu router.
  const RUTAS = { login: '/?url=login' };
  const PREFS_DEFAULT = { tamano: 100, contraste: 1, fuente: '', color: null };

  const root = document.documentElement;
  const body = document.body;

  const leer = (k, def) => {
    try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); }
    catch { return def; }
  };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  function aplicarAccesibilidad(p) {
    root.style.fontSize = p.tamano ? p.tamano + '%' : '';
    root.style.setProperty('--filtro-contraste', p.contraste > 1 ? `contrast(${p.contraste})` : 'none');
    root.style.setProperty('--fuente-app', p.fuente || 'Arial, Helvetica, sans-serif');
    if (p.color) body.style.setProperty('--color-h1', p.color);
    else body.style.removeProperty('--color-h1');
  }

  function refrescarAvatar() {
    const foto = leer('perfil', {}).fotoPerfil;
    if (foto) document.querySelectorAll('.right .user').forEach(img => { img.src = foto; });
  }

  window.App = { RUTAS, PREFS_DEFAULT, leer, guardar, aplicarAccesibilidad, refrescarAvatar };

  aplicarAccesibilidad({ ...PREFS_DEFAULT, ...leer('ajustes:accesibilidad', {}) });
  refrescarAvatar();
})();