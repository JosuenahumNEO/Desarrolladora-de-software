<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Configuración de Cuenta</title>
  <link rel="icon" href="/img/usuario.jpeg" type="image/png">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/cuenta.css">
</head>
<body>

<?php include __DIR__ . '/../partials/config-shell.php'; ?>

  <main id="main">
    <div class="pagina">
      <section class="main-content" id="vistaCuenta">

        <div class="barra-titulo">
          <a href="/?url=configuracion" class="btn-regresar" id="btnRegresar">← Regresar</a>
          <p class="titulo-pagina">Cuenta</p>
          <span></span>
        </div>

        <div class="account-grid">
          <div class="form-section">
            <div class="form-row">
              <label for="inputNombre">nombre</label>
              <input type="text" id="inputNombre" value="josue nahum" maxlength="60" autocomplete="name">
            </div>

            <div class="form-row">
              <label>correo</label>
              <span class="static-text" id="textoCorreo">correo@gmail.com</span>
            </div>

            <div class="form-row">
              <label for="mainPasswordInput">contraseña actual</label>
              <div class="password-display">
                <input type="password" id="mainPasswordInput" value="contraseña123" readonly>
                <button type="button" class="icon-btn" id="toggleMainPass" title="Mostrar/Ocultar" aria-label="Mostrar u ocultar contraseña">
                  <img src="/img/ojo.png" alt="" class="ico-sm" id="imgOjoMain">
                </button>
                <button type="button" class="btn-secondary" id="btnAbrirModalPass">cambiar contraseña</button>
              </div>
            </div>

            <div class="password-card hidden" id="modalPassword">
              <div class="form-row">
                <label for="inputPassActual">contraseña actual</label>
                <div class="input-with-icon">
                  <input type="password" id="inputPassActual" autocomplete="current-password">
                  <button type="button" class="icon-btn" id="toggleModalPass" aria-label="Mostrar u ocultar contraseña">
                    <img src="/img/ojo.png" alt="" class="ico-sm" id="imgOjoModal">
                  </button>
                </div>
              </div>

              <div class="form-row">
                <label for="inputNuevaPass">nueva contraseña</label>
                <div class="input-with-icon">
                  <input type="password" id="inputNuevaPass" placeholder="Escribe nueva contraseña" autocomplete="new-password">
                  <button type="button" class="icon-btn" id="toggleNuevaPass" aria-label="Mostrar u ocultar la nueva contraseña">
                    <img src="/img/ojo.png" alt="" class="ico-sm" id="imgOjoNueva">
                  </button>
                </div>
              </div>

              <div class="validation-list">
                <p id="reqLength" class="invalid">8 caracteres</p>
                <p id="reqUpper" class="invalid">1 Mayúscula</p>
                <p id="reqLower" class="invalid">1 Minuscula</p>
              </div>

              <div class="card-actions">
                <button type="button" class="btn-cancel-light" id="btnDescartarPass">Descartar cambios</button>
                <button type="button" class="btn-confirm-green" id="btnConfirmarPass">Confirmar cambio</button>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <div class="avatar-wrapper">
              <img src="/img/usuario.png" alt="Foto de perfil" id="imgPerfilActual">

              <button type="button" class="edit-avatar-btn" id="btnElegirImagen" title="Elegir imagen" aria-label="Cambiar foto de perfil">
                <img src="/img/lapiz.png" alt="" class="ico-sm">
              </button>

              <input type="file" id="fileInput" accept="image/*" hidden>
            </div>

            <img src="/img/usuario.png" alt="" class="bg-user-silhouette">
          </div>
        </div>

        <div class="bottom-actions">
          <button type="button" class="btn-danger" id="btnDescartarGeneral">Descartar</button>
          <button type="button" class="btn-success" id="btnGuardarGeneral">Guardar cambios</button>
        </div>
      </section>
    </div>

    <!-- Los modales van fuera de .pagina: ese contenedor puede tener filter (contraste) y eso rompe position:fixed -->
    <section class="cropper-modal hidden" id="vistaAjustarFoto" role="dialog" aria-modal="true" aria-labelledby="tituloCrop">
      <div class="cropper-container">
        <h2 id="tituloCrop">Ajusta tu nueva foto de perfil</h2>

        <div class="crop-workspace" id="cropWorkspace">
          <img src="" alt="Previsualización" id="imgPreviewCrop" draggable="false">
          <div class="crop-circle-guide" id="cropGuide"></div>
        </div>
        <p class="crop-hint">Arrastra la imagen con el mouse o el dedo para acomodarla dentro del círculo</p>

        <div class="cropper-actions">
          <button type="button" class="btn-danger-lg" id="btnCancelarFoto">Cancelar</button>
          <button type="button" class="btn-primary-lg" id="btnOtraImagen">Elegir otra imagen</button>
          <button type="button" class="btn-accept-lg" id="btnAceptarFoto">Aceptar</button>
        </div>
      </div>
    </section>
  </main>

  <script src="/js/base.js"></script>
  <script src="/js/ajustes.js"></script>
  <script src="/js/cuenta.js"></script>
</body>
</html>