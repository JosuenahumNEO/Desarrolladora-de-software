<?php
// Iniciar sesión si no está activa (para leer posibles mensajes de error)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de sesión — PortDevs Solutions</title>
    <meta name="description" content="Accede a tu cuenta en PortDevs Solutions.">

    <!-- Aplica el modo guardado ANTES de pintar la página (evita el parpadeo claro -> oscuro) -->
    <script>
        (function () {
            try {
                if (localStorage.getItem('modoOscuro') === '1') {
                    document.documentElement.classList.add('modo-oscuro');
                }
            } catch (e) { /* sin localStorage: se queda en modo claro */ }
        })();
    </script>

    <link rel="stylesheet" href="/css/login.css">
</head>

<body>

    <div class="tarjeta-login">

        <!-- ===== Panel de marca (se reduce a una franja en celular) ===== -->
        <aside class="panel-marca">
            <div class="panel-logo">
                <!-- RUTA: si tu servidor sirve /public como raíz, queda /svg/...; si no, /public/svg/... -->
                <img src="/svg/cube-hole.svg" alt="" class="panel-logo-img">
                <span>PortDevs Solutions</span>
            </div>

            <p class="panel-texto">
                Desarrollamos software a tu medida y te acompañamos después de la compra.
            </p>

            <ul class="panel-lista">
                <li>
                    <span class="icono-item" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                    </span>
                    <span>Respuesta en menos de 24 horas</span>
                </li>
                <li>
                    <span class="icono-item" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a4 4 0 0 1-4 2h-2"/></svg>
                    </span>
                    <span>Soporte directo de los desarrolladores</span>
                </li>
                <li>
                    <span class="icono-item" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>
                    </span>
                    <span>Tu información, siempre protegida</span>
                </li>
            </ul>

            <img src="/svg/cube-hole.svg" alt="" class="panel-fondo" aria-hidden="true">
        </aside>

        <!-- ===== Formulario ===== -->
        <main class="contenedor">

            <div class="control-modo">
                <button type="button" onclick="cambiarModo()" id="boton-modo"
                    aria-pressed="false" aria-label="Cambiar a modo oscuro" title="Cambiar modo">
                    <svg class="icono-luna" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
                    <svg class="icono-sol" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
                </button>
            </div>

            <h1>Iniciar sesión</h1>
            <p class="subtitulo">Ingresa con tu correo y tu contraseña.</p>

            <?php if (!empty($error)): ?>
                <!-- El JS lo convierte en toast; si el JS falla, se queda visible como alerta -->
                <p class="mensaje-error" role="alert"><?= htmlspecialchars($error) ?></p>
            <?php endif; ?>

            <form method="POST" action="?url=auth/login" novalidate>

                <label for="correo">Correo electrónico</label>
                <div class="campo">
                    <span class="icono-campo" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                    </span>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        required
                        autocomplete="email"
                        placeholder="correo@ejemplo.com"
                        value="<?= htmlspecialchars($_POST['correo'] ?? '') ?>"
                    >
                </div>

                <label for="contrasena">Contraseña</label>
                <div class="campo campo-password">
                    <span class="icono-campo" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                    </span>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        required
                        autocomplete="current-password"
                        placeholder="Tu contraseña"
                    >
                    <button type="button" class="ver-contrasena" id="ver-contrasena"
                        aria-pressed="false" aria-label="Mostrar contraseña">
                        <svg class="ojo-abierto" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                        <svg class="ojo-tachado" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>
                    </button>
                </div>

                <button type="submit" class="boton-principal" id="btn-ingresar">
                    <span>INGRESAR</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </button>

                <p class="enlace">
                    ¿No tienes una cuenta?
                    <!-- RUTA: ajusta al registro real (en el login.html estático es registro.html) -->
                    <a href="?url=auth/registro">Crea una cuenta</a>
                </p>

            </form>

        </main>
    </div>

    <script src="/js/login/login.js"></script>

</body>
</html>