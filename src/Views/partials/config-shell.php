<?php
/*
 * Header + aside compartidos por las vistas de Configuración y el Chat que usan base.css / base.js
 * (Accesibilidad, Cuenta, Datos, Seguridad, Privacidad, Conversación...).
 * Los botones con data-accion los maneja public/js/base.js.
 *
 * Antes de incluirlo, la vista puede definir qué botón del aside queda marcado:
 *   $activeNav = 'chat';   // 'menu' | 'chat' | 'configuracion' (por defecto)
 */
$activeNav = $activeNav ?? 'configuracion';

$itemsNav = [
    'menu'          => ['Menú',          'border-all-solid-full.svg'],
    'chat'          => ['Chat',          'comment-dots-regular-full.svg'],
    'configuracion' => ['Configuración', 'gear-solid-full.svg'],
];
?>
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
            <img src="/img/usuario.jpeg" alt="Usuario" class="user">
        </div>
    </header>

    <!--Aside-->
    <div class="sidebar" id="sidebar">
        <nav>
            <ul>
                <?php foreach ($itemsNav as $accion => [$texto, $icono]): ?>
                <li>
                    <button class="btn-sidebar<?= $activeNav === $accion ? ' selected' : '' ?>" data-accion="<?= $accion ?>"<?= $activeNav === $accion ? ' aria-current="page"' : '' ?>>
                        <img src="/svg/<?= $icono ?>" alt="">
                        <span class="texto"><?= $texto ?></span>
                    </button>
                </li>
                <?php endforeach; ?>
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
