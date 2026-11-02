/* accesibilidad.js
   Usa los helpers de ajustes.js (window.App): las preferencias se guardan en localStorage
   ('ajustes:accesibilidad') y ajustes.js las aplica en todas las vistas que lo cargan.
   El modo oscuro y la navegación del sidebar los maneja base.js. */
(() => {
  const rangeTamano = document.getElementById('rangeTamano');
  const rangeContraste = document.getElementById('rangeContraste');
  const selectFuente = document.getElementById('selectFuente');
  const textoMuestra = document.getElementById('textoMuestra');
  const previewLetraAa = document.getElementById('previewLetraAa');
  const valorTamano = document.getElementById('valorTamano');
  const valorContraste = document.getElementById('valorContraste');
  const puntos = document.querySelectorAll('.dot, .dot-lg');

  const App = window.App;
  const PREFS_DEFAULT = App ? App.PREFS_DEFAULT : { tamano: 100, contraste: 1, fuente: '', color: null };
  let prefs = { ...PREFS_DEFAULT, ...(App ? App.leer('ajustes:accesibilidad', {}) : {}) };

  function pintarControles() {
    rangeTamano.value = prefs.tamano;
    rangeContraste.value = prefs.contraste;
    selectFuente.value = prefs.fuente || '';
    if (selectFuente.value !== (prefs.fuente || '')) selectFuente.value = ''; // fuente guardada que ya no existe

    valorTamano.textContent = prefs.tamano + '%';
    // La "A" del contraste crece con el nivel para dar una pista visual
    valorContraste.style.opacity = String(0.45 + (prefs.contraste - 1) * 0.55);

    const fuente = prefs.fuente || 'Arial, Helvetica, sans-serif';
    textoMuestra.style.fontFamily = fuente;
    previewLetraAa.style.fontFamily = fuente;
    previewLetraAa.style.color = prefs.color || '';

    puntos.forEach(p => p.classList.remove('selected-dot'));
    const color = prefs.color || '';
    const elegido = Array.from(puntos).find(p => (p.dataset.color || '') === color);
    if (elegido) elegido.classList.add('selected-dot');
  }

  function guardarYAplicar() {
    if (!App) return;
    App.guardar('ajustes:accesibilidad', prefs);
    App.aplicarAccesibilidad(prefs);
  }

  rangeTamano.addEventListener('input', e => {
    prefs.tamano = Number(e.target.value);
    guardarYAplicar();
    pintarControles();
  });

  rangeContraste.addEventListener('input', e => {
    prefs.contraste = Number(e.target.value);
    guardarYAplicar();
    pintarControles();
  });

  selectFuente.addEventListener('change', e => {
    prefs.fuente = e.target.value;
    guardarYAplicar();
    pintarControles();
  });

  puntos.forEach(punto => {
    punto.addEventListener('click', () => {
      // data-color vacío = color predeterminado (negro en claro, blanco en oscuro)
      prefs.color = punto.dataset.color || null;
      guardarYAplicar();
      pintarControles();
    });
  });

  pintarControles();
})();
