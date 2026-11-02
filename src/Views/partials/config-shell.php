<?php
/*
 * Header + sidebar compartidos por las vistas de Configuración que usan base.css / base.js
 * (Accesibilidad, Cuenta, Datos). Los botones con data-accion los maneja public/js/base.js.
 */
?>
    <!--header-->
    <header>
        <div class="left">
            <div class="menu-container">
                <div class="menu" id="menu">
                    <img src="/svg/keyframes.svg" alt="Abrir o cerrar el menú" id="keyframes2">
                </div>
            </div>
            <div class="brand">
                <img src="/svg/cube-hole.svg" alt="" class="logo">
                <span class="name"> PortDevs Solutions</span>
            </div>
        </div>

        <div class="right">
            <img src="/img/usuario.jpeg" alt="Usuario" class="user">
        </div>
    </header>

    <!--Sidebar-->
    <div class="sidebar" id="sidebar">
        <nav>
            <ul>
                <li>
                    <button class="btn-sidebar" data-accion="menu">
                        <img src="/svg/border-all-solid-full.svg" alt="">
                        <span class="texto">Menú</span>
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
                        <span class="texto">Configuración</span>
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
                        <span class="texto">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>