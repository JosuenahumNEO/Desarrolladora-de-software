<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Crea tu cuenta en Software Solutions — Plataforma integral de gestión y soluciones de software.">
    <title>Registro — Software Solutions</title>

    <!-- Tipografía Inter & Iconos Font Awesome (mismo stack que los paneles Home) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Hoja de estilos del registro -->
    <link rel="stylesheet" href="/css/registro.css">
</head>

<body>

    <main class="contenedor">

        <!-- Barra superior: Marca y selector de tema -->
        <div class="top-bar">
            <a href="/?url=home" class="brand" title="Software Solutions">
                <div class="brand__logo" aria-hidden="true">
                    <i class="fa-solid fa-cube"></i>
                </div>
                <span class="brand__name">Software Solutions</span>
            </a>

            <button type="button" class="boton-modo" id="boton-modo" aria-label="Cambiar entre modo claro y oscuro" title="Cambiar modo de visualización">
                <i class="fa-solid fa-moon" id="icono-modo" aria-hidden="true"></i>
            </button>
        </div>

        <!-- Encabezado del Registro -->
        <header class="header-registro">
            <span class="badge-rol">
                <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Nueva Cuenta
            </span>
            <h1>Crea tu cuenta</h1>
            <p>Ingresa tus datos para comenzar a explorar y gestionar nuestros sistemas.</p>
        </header>

        <!-- Formulario de Registro -->
        <form id="form-registro" novalidate>

            <!-- Campo: Nombre o Razón Social -->
            <div class="form-group">
                <label for="nombre">Nombre (persona o empresa)</label>
                <div class="input-wrapper">
                    <i class="fa-regular fa-user input-icon" aria-hidden="true"></i>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Ej. Innova Tech / María Gómez" 
                        required 
                        autocomplete="name"
                    >
                </div>
            </div>

            <!-- Campo: Correo Electrónico -->
            <div class="form-group">
                <label for="correo">Correo electrónico</label>
                <div class="input-wrapper">
                    <i class="fa-regular fa-envelope input-icon" aria-hidden="true"></i>
                    <input 
                        type="email" 
                        id="correo" 
                        name="correo" 
                        placeholder="ejemplo@empresa.com" 
                        required 
                        autocomplete="email"
                    >
                </div>
            </div>

            <!-- Campo: Contraseña -->
            <div class="form-group">
                <label for="contrasena">Contraseña</label>
                <div class="input-wrapper">
                    <i class="fa-solid fa-lock input-icon" aria-hidden="true"></i>
                    <input 
                        type="password" 
                        id="contrasena" 
                        name="contrasena" 
                        placeholder="Mínimo 8 caracteres" 
                        required 
                        autocomplete="new-password"
                    >
                    <button 
                        type="button" 
                        class="btn-toggle-pass" 
                        data-target="contrasena" 
                        aria-label="Mostrar u ocultar contraseña"
                    >
                        <i class="fa-regular fa-eye" aria-hidden="true"></i>
                    </button>
                </div>
                <!-- Barra de seguridad de contraseña -->
                <div class="password-meter" aria-live="polite">
                    <div class="meter-track">
                        <div class="meter-bar" id="meter-bar"></div>
                    </div>
                    <span class="meter-label" id="meter-label">Seguridad</span>
                </div>
            </div>

            <!-- Campo: Confirmar Contraseña -->
            <div class="form-group">
                <label for="confirmar">Repetir contraseña</label>
                <div class="input-wrapper">
                    <i class="fa-solid fa-shield-halved input-icon" aria-hidden="true"></i>
                    <input 
                        type="password" 
                        id="confirmar" 
                        name="confirmar" 
                        placeholder="Repite tu contraseña" 
                        required 
                        autocomplete="new-password"
                    >
                    <button 
                        type="button" 
                        class="btn-toggle-pass" 
                        data-target="confirmar" 
                        aria-label="Mostrar u ocultar confirmación de contraseña"
                    >
                        <i class="fa-regular fa-eye" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <!-- Checkbox de Términos y Condiciones -->
            <label class="terms-group" for="terminos">
                <input type="checkbox" id="terminos" name="terminos" required>
                <span>Acepto los <a href="terminos_condiciones.html" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a> y la <a href="politica_privacidad.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a></span>
            </label>

            <!-- Botón de Envío -->
            <button type="submit" class="boton-principal" id="btn-registrarse">
                <span>Registrarse</span>
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>

            <!-- Redirección a Inicio de Sesión -->
            <p class="enlace">
                ¿Ya tienes una cuenta?
                <a href="/?url=auth/login">Inicia sesión</a>
            </p>

        </form>

    </main>

    <!-- Lógica de interfaz (Modo oscuro compatible con Homes, visibilidad de contraseña y validaciones) -->
    <script src="/js/registro.js"></script>

</body>

</html>

