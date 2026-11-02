<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Configuración - Datos</title>
  <link rel="icon" href="/img/ojo.png" type="image/png">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/datos.css">
</head>
<body>

<?php include __DIR__ . '/../partials/config-shell.php'; ?>

  <main id="main">
    <div class="pagina">
      <section class="main-content">

        <div class="barra-titulo">
          <a href="/?url=configuracion" class="btn-regresar" id="btnRegresar">← Regresar</a>
          <p class="titulo-pagina">Datos</p>
          <span></span>
        </div>

        <div class="datos-container">

          <div class="datos-section">
            <div class="row-download">
              <span class="label-title">Datos personales</span>
              <button type="button" class="btn-gray-action" id="btnSolicitarDescarga">Solicitar descarga de datos personales</button>
            </div>

            <p class="status-msg text-red hidden" id="msgPreparando" role="status">Estamos preparando los datos, un momento (Este proceso tarda de 3 a 10 min.)</p>
            <p class="status-msg text-green hidden" id="msgListo" role="status">¡Listo! Te hemos enviado un correo</p>
          </div>

          <hr class="divider">

          <div class="datos-section">
            <div class="row-delete-trigger">
              <button type="button" class="btn-red-action" id="btnAbrirEliminacion" aria-expanded="false" aria-controls="cardEliminacion">Solicitar eliminacion de la cuenta</button>
              <img src="/img/advertencia.png" alt="Advertencia" class="warning-ico" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
              <span class="warning-emoji" style="display:none;">⚠️</span>
            </div>

            <div class="delete-card hidden" id="cardEliminacion">
              <div class="form-row">
                <label for="inputPasswordEliminar">Escribir contraseña</label>
                <div class="input-with-icon">
                  <input type="password" id="inputPasswordEliminar" placeholder="Escribir contraseña actual" autocomplete="current-password">
                  <button type="button" class="icon-btn" id="togglePassEliminar" aria-label="Mostrar u ocultar contraseña">
                    <img src="/img/ojo.png" alt="" class="ico-sm" id="imgOjoEliminar">
                  </button>
                </div>
              </div>

              <p class="delete-warning-text">
                Tu cuenta se eliminará en 15 días, anterior a esto podrás cancelar la solicitud de eliminación de cuenta y conservar tus datos.
              </p>

              <button type="button" class="btn-red-solid" id="btnSolicitudDefinitiva">Solicitar eliminacion definitiva de la cuenta</button>
            </div>
          </div>

        </div>
      </section>
    </div>

    <!-- Fuera de .pagina: ese contenedor puede tener filter (contraste) y eso rompe position:fixed -->
    <div class="modal-overlay hidden" id="modalConfirmacionFinal" role="dialog" aria-modal="true" aria-labelledby="textoModalEliminar">
      <div class="modal-box">
        <p class="modal-text" id="textoModalEliminar">Esta accion es irreversible, se perderán tus datos y no se podrán recuperar ¿Estás seguro?</p>
        <button type="button" class="btn-red-solid" id="btnAccionFinalEliminar">Eliminar cuenta</button>
        <button type="button" class="btn-gray-action" id="btnCancelarEliminar">Cancelar</button>
      </div>
    </div>
  </main>

  <script src="/js/base.js"></script>
  <script src="/js/ajustes.js"></script>
  <script src="/js/datos.js"></script>
</body>
</html>