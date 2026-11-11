<?php $activeNav = 'configuracion'; ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <title>Configuración - Privacidad</title>
    <link rel="stylesheet" href="../../../public/css/base.css">
    <link rel="stylesheet" href="../../../public/css/vista-config.css">
    <link rel="stylesheet" href="../../../public/css/tarjetas.css">
    <link rel="stylesheet" href="../../../public/css/privacidad.css">
</head>

<body>

<?php include __DIR__ . '/../partials/config-shell.php'; ?>

    <main id="main">
        <div class="pagina">
            <section class="main-content">

                <div class="barra-titulo">
                    <a href="/?url=configuracion" class="btn-regresar" id="btnRegresar">← Regresar</a>
                    <p class="titulo-pagina">Privacidad</p>
                    <span></span>
                </div>

                <p class="subtitulo-vista">Decide a qué puede acceder la aplicación y consulta nuestra información legal.</p>

                <div class="layout">

                    <div class="columna-principal">

                        <!-- ===== Tarjeta: permisos (todos desactivados por defecto) ===== -->
                        <section class="tarjeta" aria-labelledby="titulo-permisos">
                            <div class="tarjeta-encabezado">
                                <h2 class="tarjeta-titulo" id="titulo-permisos">Permisos</h2>
                                <span class="pastilla-roja">Desactivadas por defecto</span>
                            </div>

                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/camera-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="valor">Cámara</span>
                                    <span class="etiqueta">Usar la cámara de tu dispositivo</span>
                                </div>
                                <button type="button" class="permiso-switch" role="switch" aria-checked="false"
                                    aria-label="Cámara" data-permiso="camara">
                                    <span class="switch"><span class="slider"></span></span>
                                </button>
                            </div>

                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/microphone-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="valor">Audio</span>
                                    <span class="etiqueta">Usar el micrófono</span>
                                </div>
                                <button type="button" class="permiso-switch" role="switch" aria-checked="false"
                                    aria-label="Audio" data-permiso="audio">
                                    <span class="switch"><span class="slider"></span></span>
                                </button>
                            </div>

                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/bell-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="valor">Notificaciones</span>
                                    <span class="etiqueta">Recibir avisos de la aplicación</span>
                                </div>
                                <button type="button" class="permiso-switch" role="switch" aria-checked="false"
                                    aria-label="Notificaciones" data-permiso="notificaciones">
                                    <span class="switch"><span class="slider"></span></span>
                                </button>
                            </div>

                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/phone-volume-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="valor">Teléfono</span>
                                    <span class="etiqueta">Acceso a las funciones de llamada</span>
                                </div>
                                <button type="button" class="permiso-switch" role="switch" aria-checked="false"
                                    aria-label="Teléfono" data-permiso="telefono">
                                    <span class="switch"><span class="slider"></span></span>
                                </button>
                            </div>

                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/message-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="valor">Mensajes (SMS)</span>
                                    <span class="etiqueta">Enviar y recibir mensajes de texto</span>
                                </div>
                                <button type="button" class="permiso-switch" role="switch" aria-checked="false"
                                    aria-label="Mensajes (SMS)" data-permiso="sms">
                                    <span class="switch"><span class="slider"></span></span>
                                </button>
                            </div>
                        </section>

                        <!-- ===== Tarjeta: información legal ===== -->
                        <section class="tarjeta" aria-labelledby="titulo-legal">
                            <h2 class="tarjeta-titulo sin-margen" id="titulo-legal">Información legal</h2>

                            <nav class="enlaces" aria-label="Información legal">
                                <button type="button" class="enlace-fila" data-accion="quienes-somos">
                                    <span>¿Quiénes somos?</span>
                                    <img src="/svg/angle-right-solid-full.svg" alt="" aria-hidden="true">
                                </button>
                                <button type="button" class="enlace-fila" data-accion="politica-privacidad">
                                    <span>Política de privacidad</span>
                                   <img src="/svg/angle-right-solid-full.svg" alt="" aria-hidden="true">
                                </button>
                                <button type="button" class="enlace-fila" data-accion="terminos">
                                    <span>Términos y Condiciones</span>
                                    <img src="/svg/angle-right-solid-full.svg" alt="" aria-hidden="true">
                                </button>
                            </nav>
                        </section>
                    </div>

                    <!-- Panel decorativo (ojo tachado del diseño) -->
                    <aside class="panel-decorativo panel-amarillo" aria-hidden="true">
                        <img src="/svg/eye-slash-solid-full.svg" alt="">
                        <p>Tú decides qué compartir</p>
                    </aside>
                </div>
            </section>
        </div>
    </main>

    <script src="/js/base.js"></script>
    <script src="/js/ajustes.js"></script>
    <script src="/js/privacidad.js"></script>
</body>

</html>
