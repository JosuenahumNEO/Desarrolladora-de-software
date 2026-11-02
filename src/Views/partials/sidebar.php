<div class="sidebar" id="sidebar">
    <nav>
        <ul>
            <li>
                <button class="btn-sidebar <?= ($activeNav ?? '') === 'menu' ? 'selected' : '' ?>" data-accion="menu" <?= ($activeNav ?? '') === 'menu' ? 'aria-current="page"' : '' ?>>
                    <img src="/public/svg/border-all-solid-full.svg" alt="" aria-hidden="true">
                    <span class="texto">Menú</span>
                </button>
            </li>
            <li>
                <button class="btn-sidebar <?= ($activeNav ?? '') === 'chat' ? 'selected' : '' ?>" data-accion="chat" <?= ($activeNav ?? '') === 'chat' ? 'aria-current="page"' : '' ?>>
                    <img src="/public/svg/comment-dots-regular-full.svg" alt="" aria-hidden="true">
                    <span class="texto">Chat</span>
                </button>
            </li>
            <li>
                <button class="btn-sidebar <?= ($activeNav ?? '') === 'configuracion' ? 'selected' : '' ?>" data-accion="configuracion" <?= ($activeNav ?? '') === 'configuracion' ? 'aria-current="page"' : '' ?>>
                    <img src="/public/svg/gear-solid-full.svg" alt="" aria-hidden="true">
                    <span class="texto">Configuración</span>
                </button>
            </li>
            <li>
                <button class="btn-sidebar" id="item-modo" role="switch" aria-checked="false">
                    <img id="icono-modo" src="/public/svg/moon-sat.svg" alt="" aria-hidden="true">
                    <span class="texto">Modo oscuro</span>
                    <span class="switch">
                        <span class="slider"></span>
                    </span>
                </button>
            </li>
            <li class="down">
                <button class="btn-sidebar red-jhon" data-accion="logout">
                    <img src="/public/svg/right-from-bracket-solid-full.svg" alt="" aria-hidden="true">
                    <span class="texto">Cerrar Sesión</span>
                </button>
            </li>
        </ul>
    </nav>
</div>

