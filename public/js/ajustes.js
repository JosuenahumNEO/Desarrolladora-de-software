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

  /* Tamaño de texto: escala SOLO las letras, no el layout.
     Antes se cambiaba el font-size de <html>, y como casi todo el diseño está en rem
     (header, sidebar, paddings, iconos) se agrandaba toda la pantalla.
     Aquí se guarda el tamaño original de cada elemento con texto y se multiplica por la escala. */
  const SIN_TEXTO = /^(SCRIPT|STYLE|IMG|SVG|PATH|BR|HR)$/;
  const CONTROLES = /^(INPUT|SELECT|TEXTAREA|BUTTON|OPTION)$/;
  let escalaTexto = 1;
  let pendiente = false;

  function elementosConTexto() {
    return Array.from(document.body.querySelectorAll('*')).filter(el => {
      if (SIN_TEXTO.test(el.tagName.toUpperCase())) return false;
      return CONTROLES.test(el.tagName) ||
        Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim() !== '');
    });
  }

  function escalarTexto() {
    pendiente = false;
    const els = elementosConTexto();
    // Primero se leen todos los tamaños originales y luego se escribe, para que un hijo en em
    // no lea el tamaño ya escalado de su padre.
    els.forEach(el => {
      if (el.dataset.fsBase === undefined) {
        el.dataset.fsBase = String(parseFloat(getComputedStyle(el).fontSize));
      }
    });
    els.forEach(el => {
      el.style.fontSize = escalaTexto === 1 ? '' : (parseFloat(el.dataset.fsBase) * escalaTexto) + 'px';
    });
  }

  function programarEscala() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(escalarTexto);
  }

  // Elementos que se agregan después (avisos, modales) también se escalan
  new MutationObserver(() => { if (escalaTexto !== 1) programarEscala(); })
    .observe(document.body, { childList: true, subtree: true });

  function aplicarAccesibilidad(p) {
    root.style.fontSize = '';
    escalaTexto = (p.tamano || 100) / 100;
    programarEscala();
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