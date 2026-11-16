<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuracion</title>
    <link rel="stylesheet" href="/css/configuracion.css">
    <link rel="stylesheet" href="/css/modal-usuario.css">
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
            <!--AQUI IRA FOTO DEL USUARIO NO ICO, luego cambiar-->
            <img src="/img/usuario.jpeg" alt="" class="user" id="enviar" style="cursor:pointer;">
        </div>

        <!-- MODAL DE USUARIO -->
        <div class="modal" id="modal">
            <div class="contenido">
                <button class="volver" id="volver" type="button" aria-label="Cerrar">X</button>
        
                <div class="imagen">
                    <img src="/img/usuario.jpeg" alt="Imagen de usuario" class="imagen-usuario">
                </div>
        
                <div class="datos">
                    <label class="etiqueta">Nombre:</label>
                    <span class="info"><?= htmlspecialchars($_SESSION['usuario_nombre'] ?? 'Usuario') ?></span>
                </div>
        
                <div class="datos">
                    <label class="etiqueta">Correo:</label>
                    <span class="info"><?= htmlspecialchars($_SESSION['usuario_correo'] ?? '') ?></span>
                </div>
        
                <div class="seccion">
                    <button class="log-out" id="log-out" type="button" onclick="window.location.href='/?url=auth/logout'">Cerrar sesión</button>
                    <button class="perfil" id="perfil" type="button" onclick="window.location.href='/?url=configuracion/cuenta'">Editar perfil</button>
                </div>
            </div>
        </div>

    </header>

    <!--Sidebar-->
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
                    <!-- No lleva algun data-accion porque el JS la maneja aparte (para el modo oscuro) -->
                    <button class="btn-sidebar" id="item-modo" role="switch" aria-checked="false">
                        <img id="icono-modo" src="/svg/moon-sat.svg" alt="">
                        <span class="texto">Modo oscuro</span>
                        <span class="switch">
                            <span class="slider"></span>
                        </span>
                    </button>
                </li>

                <!--Logout-->
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
        <p class="titulo-pagina">Configuración</p>

        <div class="cuadricula-flex">

            <!-- Columna izquierda -->
            <div class="columna">
                <button class="card2 cuenta" data-accion="cuenta">
                    <span class="titulo">Cuenta</span>
                    <img class="icono" src="/svg/user-solid-full.svg" alt="">
                </button>

                <button class="card1 apariencia" data-accion="apariencia">
                    <span class="titulo">Apariencia</span>
                    <img class="icono icono-grande" src="/svg/palette-solid-full.svg" alt="">
                </button>

                <button class="card2 privacidad" data-accion="privacidad">
                    <span class="titulo">Privacidad</span>
                    <img class="icono" src="/svg/eye-slash-solid-full.svg" alt="">
                </button>

                <button class="card2 soporte" data-accion="soporte">
                    <span class="titulo">Soporte</span>
                    <img class="icono" src="/svg/headset-help.svg" alt="">
                </button>
            </div>

            <!-- Columna derecha -->
            <div class="columna">
                <button class="card1 idioma" data-accion="idioma">
                    <span class="titulo">Idioma</span>
                    <img class="icono icono-grande" src="/svg/language-solid-full.svg" alt="">
                </button>

                <button class="card2 accesibilidad" data-accion="accesibilidad">
                    <span class="titulo">Accesibilidad</span>
                    <img class="icono" src="/svg/accessibility.svg" alt="">
                </button>

                <div class="card2 notificaciones" data-accion="notificaciones">
                    <span class="titulo">Notificaciones</span>

                    <!-- Interruptor y campana -->
                    <div class="acciones-notificaciones">
                        <label class="control-notificaciones" for="interruptor-notificaciones">
                            <input type="checkbox" id="interruptor-notificaciones" class="entrada-interruptor"
                                aria-label="Activar o silenciar notificaciones">
                            <span class="interruptor-visual">
                                <span class="circulo-interruptor"></span>
                            </span>
                        </label>
                        <img class="icono" src="/svg/bell-solid-full.svg" alt="">
                    </div>
                </div>
                
                <button class="card1 seguridad" data-accion="seguridad">
                    <span class="titulo">Seguridad</span>
                    <img class="icono icono-grande" src="/svg/user-shield-solid-full.svg" alt="">
                </button>
            </div>

            <!-- Barra completa de abajo -->
            <button class="card3 datos" data-accion="datos">
                <span class="titulo">Datos</span>
                <img class="icono" src="/svg/database-solid-full.svg" alt="">
            </button>

        </div>
    </main>

    <script src="/js/ajustes.js"></script>
    <script src="/js/configuracion.js"></script>
    <script src="/js/modal-usuario.js"></script>
</body>

</html>