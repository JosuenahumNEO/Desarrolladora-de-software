<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="/css/chat.css">
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
                    <button class="btn-sidebar selected" data-accion="chat" aria-current="page">
                        <img src="/svg/comment-dots-regular-full.svg" alt="">
                        <span class="texto">Chat</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="configuracion">
                        <img src="/svg/gear-solid-full.svg" alt="">
                        <span class="texto">Configuracion</span>
                    </button>
                </li>
                <li>
                    <!-- No lleva data-accion porque el JS la maneja aparte (modo oscuro) -->
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
        <p class="titulo-pagina">Chat</p>

        <!-- Lista de conversaciones.
             data-id = id de la conversación (para que backend lo use después).
             La clase "no-leido" en el <button> muestra el puntito azul. -->
        <section class="lista-chats" id="lista-chats" aria-label="Conversaciones">

            <button class="chat-item no-leido" data-accion="abrir-chat" data-id="1">
                <img class="chat-avatar" src="/svg/cube-hole.svg" alt="">
                <span class="chat-info">
                    <span class="chat-nombre">Nahúm (desarrollador)</span>
                    <span class="chat-preview">buenas tardes carlos, vimos tu solicitud de interes de software y es una base de datos</span>
                </span>
                <span class="chat-punto" aria-label="Mensaje sin leer"></span>
            </button>

            <button class="chat-item no-leido" data-accion="abrir-chat" data-id="2">
                <img class="chat-avatar" src="/img/usuario.png" alt="">
                <span class="chat-info">
                    <span class="chat-nombre">Oyoque (desarrollador)</span>
                    <span class="chat-preview">claro, podemos cotizar el sistema en una reunion virtual, que te parece el 9/11</span>
                </span>
                <span class="chat-punto" aria-label="Mensaje sin leer"></span>
            </button>

        </section>

        <!-- Boton abajo a la derecha -->
        <div class="acciones-chat">
            <button class="btn-contactar" data-accion="contactar-desarrolladores">
                Contactar desarrolladores
            </button>
        </div>
    </main>

    <script src="/js/base.js"></script>
    <script src="/js/ajustes.js"></script>
    <script src="/js/chat.js"></script>
    <script src="/js/modal-usuario.js"></script>
</body>

</html>
