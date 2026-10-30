<div class="modal" id="modal">
    <div class="contenido">
        <button class="volver" id="volver" type="button" aria-label="Cerrar">X</button>

        <div class="imagen">
            <img src="/public/img/usuario.jpeg" alt="Imagen de usuario" class="imagen-usuario">
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

