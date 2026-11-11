<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Configuración - Accesibilidad</title>
  <link rel="icon" href="/img/icono_accesibilidad.png" type="image/png">
 
  <link rel="stylesheet" href="../../../public/css/base.css">
  <link rel="stylesheet" href="../../../public/css/accesibilidad.css">
</head>
<body>

<?php include __DIR__ . '/../partials/config-shell.php'; ?>

  <main id="main">
    <div class="pagina">
      <section class="main-content">

        <div class="barra-titulo">
          <a href="/?url=configuracion" class="btn-regresar" id="btnRegresar">← Regresar</a>
          <p class="titulo-pagina">Accesibilidad</p>
          <span></span>
        </div>

        <div class="accesibilidad-grid">

          <div class="control-card">
            <label class="card-label" for="rangeTamano">Tamaño de texto</label>
            <div class="slider-row">
              <input type="range" id="rangeTamano" min="75" max="150" step="5" value="100">
              <span class="size-indicator" id="valorTamano">100%</span>
            </div>
          </div>

          <div class="control-card">
            <label class="card-label" for="rangeContraste">Contraste</label>
            <div class="slider-row">
              <input type="range" id="rangeContraste" min="1" max="2" step="0.1" value="1">
              <span class="size-indicator bold-a" id="valorContraste">A</span>
            </div>
          </div>

          <div class="control-card font-preview-card">
            <div class="font-select-bar">
              <label for="selectFuente" class="font-select-label">Fuente actual:</label>
              <select id="selectFuente" class="font-dropdown">
                <option value="">Predeterminada (Arial)</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Verdana', sans-serif">Verdana</option>
                <option value="'Tahoma', sans-serif">Tahoma</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="'Lucida Console', monospace">Lucida Console</option>
                <option value="'Comic Sans MS', cursive, sans-serif">Comic Sans MS</option>
                <option value="'Impact', sans-serif">Impact</option>
                <option value="'Palatino Linotype', serif">Palatino Linotype</option>
                <option value="'Garamond', serif">Garamond</option>
                <option value="'Century Gothic', sans-serif">Century Gothic</option>
                <option value="'Franklin Gothic Medium', sans-serif">Franklin Gothic</option>
                <option value="'Brush Script MT', cursive">Brush Script</option>
              </select>
            </div>
            <div class="preview-box">
              <span class="preview-text-sample" id="textoMuestra">Ejemplo de Texto</span>
            </div>
          </div>

          <div class="control-card color-picker-card">
            <span class="card-label-center">color</span>
            <div class="palette-content">
              <div class="preview-large-a" id="previewLetraAa">Aa</div>
              <div class="color-dots-grid">
                <button type="button" class="dot" data-color="#8b5cf6" style="background:#8b5cf6;" aria-label="Violeta"></button>
                <button type="button" class="dot" data-color="#3b82f6" style="background:#3b82f6;" aria-label="Azul"></button>
                <button type="button" class="dot" data-color="#ec4899" style="background:#ec4899;" aria-label="Rosa"></button>
                <button type="button" class="dot" data-color="#ef4444" style="background:#ef4444;" aria-label="Rojo"></button>
                <button type="button" class="dot" data-color="#f59e0b" style="background:#f59e0b;" aria-label="Ámbar"></button>
                <button type="button" class="dot" data-color="#f97316" style="background:#f97316;" aria-label="Naranja"></button>
                <button type="button" class="dot" data-color="#0284c7" style="background:#0284c7;" aria-label="Azul cielo"></button>
                <button type="button" class="dot" data-color="#06b6d4" style="background:#06b6d4;" aria-label="Cian"></button>
                <button type="button" class="dot" data-color="#a855f7" style="background:#a855f7;" aria-label="Púrpura"></button>
                <button type="button" class="dot" data-color="#10b981" style="background:#10b981;" aria-label="Verde esmeralda"></button>
                <button type="button" class="dot" data-color="" style="background:#000000;" aria-label="Predeterminado (negro / claro según el modo)"></button>
                <button type="button" class="dot" data-color="#ea580c" style="background:#ea580c;" aria-label="Naranja oscuro"></button>
                <button type="button" class="dot" data-color="#475569" style="background:#475569;" aria-label="Gris"></button>
                <button type="button" class="dot" data-color="#78350f" style="background:#78350f;" aria-label="Café"></button>
                <button type="button" class="dot" data-color="#0d9488" style="background:#0d9488;" aria-label="Verde azulado"></button>
                <button type="button" class="dot" data-color="#eab308" style="background:#eab308;" aria-label="Amarillo"></button>
                <button type="button" class="dot" data-color="#9d174d" style="background:#9d174d;" aria-label="Frambuesa"></button>
                <button type="button" class="dot" data-color="#0891b2" style="background:#0891b2;" aria-label="Turquesa"></button>
                <button type="button" class="dot" data-color="#6b21a8" style="background:#6b21a8;" aria-label="Morado"></button>
                <button type="button" class="dot" data-color="#15803d" style="background:#15803d;" aria-label="Verde"></button>
                <button type="button" class="dot" data-color="#65a30d" style="background:#65a30d;" aria-label="Lima"></button>
              </div>
            </div>
            <div class="bottom-palette-dots">
              <button type="button" class="dot-lg black-dot" data-color="" aria-label="Predeterminado"></button>
              <button type="button" class="dot-lg white-dot" data-color="#ffffff" aria-label="Blanco"></button>
            </div>
          </div>

        </div>

        <img src="/img/icono_accesibilidad.png" alt="" class="floating-accessibility-icon">
      </section>
    </div>
  </main>

  <script src="/js/base.js"></script>
  <script src="/js/ajustes.js"></script>
  <script src="/js/accesibilidad.js"></script>
</body>
</html>