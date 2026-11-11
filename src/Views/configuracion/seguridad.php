<?php $activeNav = 'configuracion'; ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración - Seguridad</title>
   
    <link rel="stylesheet" href="../../../public/css/base.css">
    <link rel="stylesheet" href="../../../public/css/vista-config.css">
    <link rel="stylesheet" href="../../../public/css/seguridad.css">
</head>

<body>

<?php include __DIR__ . '/../partials/config-shell.php'; ?>

    <main id="main">
        <div class="pagina">
            <section class="main-content">

                <div class="barra-titulo">
                    <a href="/?url=configuracion" class="btn-regresar" id="btnRegresar">← Regresar</a>
                    <p class="titulo-pagina">Seguridad</p>
                    <span></span>
                </div>

                <p class="subtitulo-vista">Administra tu contraseña, tus datos de contacto y la verificación en dos pasos.</p>

                <div class="layout">

                    <div class="columna-principal">

                        <!-- ===== Tarjeta: datos de la cuenta ===== -->
                        <section class="tarjeta" aria-labelledby="titulo-cuenta">
                            <h2 class="tarjeta-titulo" id="titulo-cuenta">Datos de tu cuenta</h2>

                            <!-- Contraseña actual -->
                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/lock-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="etiqueta">Contraseña actual</span>
                                    <span class="valor-con-icono">
                                        <span class="valor" id="valor-contrasena">••••••••••••</span>
                                        <button type="button" class="btn-ojo" id="ojo-contrasena" aria-pressed="false" aria-label="Mostrar contraseña">
                                            <img src="/svg/eye-slash-solid-full.svg" alt="">
                                        </button>
                                    </span>
                                </div>
                                <button type="button" class="btn-gris" data-accion="cambiar-contrasena">Cambiar contraseña</button>
                            </div>

                            <!-- Correo -->
                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/envelope-regular-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="etiqueta">Correo</span>
                                    <span class="valor" id="valor-correo">correo@gmail.com</span>
                                </div>
                            </div>

                            <!-- Teléfono -->
                            <div class="dato">
                                <span class="dato-icono" aria-hidden="true">
                                    <img src="/svg/mobile-screen-solid-full.svg" alt="">
                                </span>
                                <div class="dato-texto">
                                    <span class="etiqueta">Número de teléfono</span>
                                    <span class="valor" id="valor-telefono">+52 314-1234-123</span>
                                </div>
                            </div>
                        </section>

                        <!-- ===== Tarjeta: autenticación en dos pasos ===== -->
                        <section class="tarjeta" aria-labelledby="titulo-2fa">
                            <div class="tarjeta-cabecera">
                                <span class="dato-icono icono-verde" aria-hidden="true">
                                    <img src="/svg/shield-check.svg" alt="">
                                </span>
                                <div class="cabecera-texto">
                                    <h2 class="tarjeta-titulo sin-margen" id="titulo-2fa">
                                        Autenticación en dos pasos
                                        <span class="pastilla" id="estado-2fa" data-activo="false">Desactivada</span>
                                    </h2>
                                    <p class="descripcion" id="descripcion-2fa">Confirma tu identidad con tu contraseña actual. Te enviaremos un código por correo.</p>
                                </div>
                            </div>

                            <!-- Enter o el botón Continuar envían el formulario -->
                            <form class="form-2fa" id="form-2fa" novalidate>
                                <label class="sr-only" for="input-contrasena-2fa">Contraseña actual</label>
                                <input class="campo" type="password" id="input-contrasena-2fa"
                                    placeholder="Escribir contraseña actual" autocomplete="current-password" enterkeyhint="go">
                                <button type="button" class="btn-ojo" data-ojo="input-contrasena-2fa" aria-pressed="false" aria-label="Mostrar contraseña">
                                    <img src="/svg/eye-slash-solid-full.svg" alt="">
                                </button>
                                <button type="submit" class="btn-continuar" id="btn-2fa">Continuar</button>
                                <p class="error" id="error-2fa" role="alert"></p>
                            </form>
                        </section>
                    </div>

                    <!-- Panel decorativo (escudo del diseño) -->
                    <aside class="panel-decorativo" aria-hidden="true">
                        <img src="/svg/user-shield-solid-full.svg" alt="">
                        <p>Tu información está protegida</p>
                    </aside>
                </div>
            </section>
        </div>

        <!-- Ventanas del flujo (fuera de .pagina: ese contenedor puede tener filter y rompe position:fixed) -->
        <div class="modal-fondo" id="modal-fondo" hidden>

            <!-- Paso 1: código por correo -->
            <section class="modal-card" id="paso-codigo" role="dialog" aria-modal="true" aria-labelledby="titulo-codigo" hidden>
                <p class="modal-titulo" id="titulo-codigo">Se enviará un código por correo.</p>

                <!-- DEMO: sin servidor de correo el código se muestra aquí. Borrar este párrafo al conectar el backend. -->
                <p class="aviso-demo" id="aviso-demo"></p>

                <form id="form-codigo" novalidate>
                    <div class="modal-fila">
                        <label for="input-codigo">Escribir código</label>
                        <input class="campo" type="text" id="input-codigo" inputmode="numeric"
                            maxlength="11" placeholder="xxx-xxx-xxx" autocomplete="one-time-code">
                    </div>
                    <p class="error" id="error-codigo" role="alert"></p>
                    <div class="modal-fila">
                        <span>¿No lo recibiste?</span>
                        <button type="button" class="btn-azul" id="btn-reenviar">Reenviar código</button>
                    </div>
                </form>

                <button type="button" class="btn-salir" data-cerrar>Salir</button>
            </section>

            <!-- Paso 2: verificado + añadir teléfono -->
            <section class="modal-card modal-ok" id="paso-verificado" role="dialog" aria-modal="true" aria-labelledby="titulo-verificado" hidden>
                <p class="modal-titulo" id="titulo-verificado">Verificado. La autenticación en dos pasos está activada.</p>

                <form id="form-telefono" novalidate>
                    <div class="modal-fila">
                        <label for="select-lada">Añadir número de teléfono</label>
                        <span class="telefono-campos">
                            <select class="campo selector-lada" id="select-lada" aria-label="Lada del país">
                                <option value="+52">🇲🇽 +52</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+57">🇨🇴 +57</option>
                                <option value="+54">🇦🇷 +54</option>
                                <option value="+34">🇪🇸 +34</option>
                            </select>
                            <input class="campo" type="tel" id="input-telefono" inputmode="tel"
                                autocomplete="tel-national" aria-label="Número de teléfono">
                        </span>
                    </div>
                    <p class="error" id="error-telefono" role="alert"></p>
                    <button type="submit" class="btn-guardar">Guardar cambios</button>
                </form>

                <button type="button" class="btn-salir" data-cerrar>Salir</button>
            </section>

            <!-- Cambiar contraseña -->
            <section class="modal-card" id="paso-contrasena" role="dialog" aria-modal="true" aria-labelledby="titulo-contrasena" hidden>
                <p class="modal-titulo" id="titulo-contrasena">Cambiar contraseña</p>

                <form id="form-contrasena" novalidate>
                    <div class="campo-fila">
                        <label for="input-pass-actual">Contraseña actual</label>
                        <span class="campo-ojo">
                            <input class="campo" type="password" id="input-pass-actual" autocomplete="current-password">
                            <button type="button" class="btn-ojo" data-ojo="input-pass-actual" aria-pressed="false" aria-label="Mostrar contraseña">
                                <img src="/svg/eye-slash-solid-full.svg" alt="">
                            </button>
                        </span>
                    </div>

                    <div class="campo-fila">
                        <label for="input-pass-nueva">Nueva contraseña</label>
                        <span class="campo-ojo">
                            <input class="campo" type="password" id="input-pass-nueva" autocomplete="new-password">
                            <button type="button" class="btn-ojo" data-ojo="input-pass-nueva" aria-pressed="false" aria-label="Mostrar contraseña">
                                <img src="/svg/eye-slash-solid-full.svg" alt="">
                            </button>
                        </span>
                    </div>

                    <div class="campo-fila">
                        <label for="input-pass-confirmar">Confirmar contraseña</label>
                        <span class="campo-ojo">
                            <input class="campo" type="password" id="input-pass-confirmar" autocomplete="new-password">
                            <button type="button" class="btn-ojo" data-ojo="input-pass-confirmar" aria-pressed="false" aria-label="Mostrar contraseña">
                                <img src="/svg/eye-slash-solid-full.svg" alt="">
                            </button>
                        </span>
                    </div>

                    <ul class="requisitos" aria-label="Requisitos de la nueva contraseña">
                        <li id="req-largo" class="invalid">8 caracteres</li>
                        <li id="req-mayus" class="invalid">1 mayúscula</li>
                        <li id="req-minus" class="invalid">1 minúscula</li>
                    </ul>

                    <p class="error" id="error-contrasena" role="alert"></p>
                    <button type="submit" class="btn-guardar">Guardar contraseña</button>
                </form>

                <button type="button" class="btn-salir" data-cerrar>Cancelar</button>
            </section>
        </div>
    </main>

    <script src="/js/base.js"></script>
    <script src="/js/ajustes.js"></script>
    <script src="/js/seguridad.js"></script>
</body>

</html>
