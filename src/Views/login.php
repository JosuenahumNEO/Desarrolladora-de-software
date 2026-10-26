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
    <title>Inicio de sesión — SOftware Solution</title>
    <meta name="description" content="Accedé a tu cuenta en SOftware Solution.">
    <link rel="stylesheet" href="/css/login-registro.css">
    <link rel="stylesheet" href="/css/login-animaciones.css">
</head>

<body>

    <main class="contenedor">

        <div class="control-modo">
            <button type="button" onclick="cambiarModo()" id="boton-modo">👁</button>
        </div>

        <h1>INICIO DE SESIÓN</h1>

        <?php if (!empty($error)): ?>
            <p class="mensaje-error" role="alert"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>

        <form method="POST" action="?url=auth/login" novalidate>

            <label for="correo">Correo electrónico</label>
            <input
                type="email"
                id="correo"
                name="correo"
                required
                autocomplete="email"
                value="<?= htmlspecialchars($_POST['correo'] ?? '') ?>"
            >

            <label for="contrasena">Contraseña</label>
            <input
                type="password"
                id="contrasena"
                name="contrasena"
                required
                autocomplete="current-password"
            >

            <button type="submit" class="boton-principal" id="btn-ingresar">
                INGRESAR
            </button>

        </form>

    </main>

    <script src="/js/login/login-registro.js"></script>

</body>
</html>
