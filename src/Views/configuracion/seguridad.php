<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguridad</title>
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/seguridad.css">
</head>

<body>

    <!--header-->
    <header>
        <div class="left">
            <div class="menu-container">
                <div class="menu" id="menu">
                    <img src="/svg/keyframes.svg" alt="" id="keyframes2">
                </div>
            </div>
            <div class="brand">
                <img src="/svg/cube-hole.svg" alt="" class="logo">
                <span class="name"> PortDevs Solutions</span>
            </div>
        </div>

        <div class="right">
            <img src="/img/usuario.jpeg" alt="" class="user">
        </div>
    </header>

    <!--Sidebar (copiado de Configuracion)-->
    <div class="sidebar" id="sidebar">
        <nav>
            <ul>
                <li>
                    <button class="btn-sidebar" data-accion="menu">
                        <img src="/svg/border-all-solid-full.svg" alt="">
                        <span class="texto">Menu</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="chat">
                        <img src="/svg/comment-dots-regular-full.svg" alt="">
                        <span class="texto">Chat</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar selected" data-accion="configuracion" aria-current="page">
                        <img src="/svg/gear-solid-full.svg" alt="">
                        <span class="texto">Configuracion</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" id="item-modo" role="switch" aria-checked="false">
                        <img id="icono-modo" src="/svg/moon-sat.svg" alt="">
                        <span class="texto">Modo oscuro</span>
                        <span class="switch">
                            <span class="slider"></span>
                        </span>
                    </button>
                </li>
                <li class="down">
                    <button class="btn-sidebar red-jhon" data-accion="logout">
                        <img src="/svg/right-from-bracket-solid-full.svg" alt="">
                        <span class="texto">LogOut</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>

    <main id="main">
        <div class="encabezado-pagina">
            <p class="titulo-pagina">Seguridad</p>
            <p class="subtitulo-pagina">Administra tu contraseña, tus datos de contacto y la verificación en dos pasos.</p>
        </div>

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
                        <div>
                            <h2 class="tarjeta-titulo sin-margen" id="titulo-2fa">Autenticación en dos pasos</h2>
                            <p class="descripcion">Confirma tu identidad con tu contraseña actual. Te enviaremos un código por correo.</p>
                        </div>
                    </div>

                    <!-- Enter o el botón Continuar envían el formulario -->
                    <form class="form-2fa" id="form-2fa" novalidate>
                        <label class="sr-only" for="input-contrasena-2fa">Contraseña actual</label>
                        <input class="campo" type="password" id="input-contrasena-2fa"
                            placeholder="Escribir contraseña actual" autocomplete="current-password" enterkeyhint="go">
                        <button type="button" class="btn-ojo" id="ojo-2fa" aria-pressed="false" aria-label="Mostrar contraseña">
                            <img src="/svg/eye-slash-solid-full.svg" alt="">
                        </button>
                        <button type="submit" class="btn-continuar">Continuar</button>
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

        <!-- Ventanas del flujo de verificación -->
        <div class="modal-fondo" id="modal-fondo" hidden>

            <!-- Paso 1: código por correo -->
            <section class="modal-card" id="paso-codigo" role="dialog" aria-modal="true" aria-labelledby="titulo-codigo" hidden>
                <p class="modal-titulo" id="titulo-codigo">Se enviará un código por correo.</p>

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
                <p class="modal-titulo" id="titulo-verificado">Verificado</p>

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
        </div>
    </main>

    <script src="/js/base.js"></script>
    <script src="/js/seguridad.js"></script>
</body>

</html>
