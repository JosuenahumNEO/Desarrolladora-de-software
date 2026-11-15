<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de contacto — PortDevs Solutions</title>
    <link rel="stylesheet" href="/css/estilos-formulario.css">
</head>

<body>
    <section class="contenedor-formulario">
        <div class="title">
            <H1 class="H1">Solicitud de contacto</H1>
        </div>
        <form id="form-contacto">
            <div class="datos">
                <label>Nombre:</label>
                <div class="input-datos">
                    <input type="text" name="user" id="user" placeholder="Ingresa el nombre de tu empresa o persona"
                        required>
                </div>
            </div>

            <div class="datos">
                <label>Información de contacto (teléfono o correo):</label>
                <div class="input-datos">
                    <input type="text" name="contacto" id="contacto"
                        placeholder="Ingresa tu teléfono o correo de tu empresa o persona" required>
                </div>
            </div>

            <div class="datos">
                <label>Descripción del sistema o problema:</label>
                <div class="input-datos">
                    <textarea rows="4" required></textarea>
                </div>
            </div>

            <div class="datos">
                <label>¿Para qué fecha se necesita?</label>
                <div class="input-datos">
                    <input type="date" name="date" id="date" placeholder="" required>
                </div>
            </div>

            <div class="contenedor-boton">
                <button type="submit" class="btn-enviar">Enviar</button>
            </div>
        </form>
    </section>

    <!-- Modal / Ventana emergente // Dejare el script aqui de momento esperando el feedback :) -->
    <div class="modal-overlay" id="modal-overlay">
        <div class="modal-tarjeta">
            <button class="modal-cerrar-x" id="modal-cerrar-x">X</button>
            <p class="modal-mensaje">Interesante idea, pronto nos comunicaremos con usted. ¡Muchas gracias!</p>
            <button class="btn-volver" id="btn-volver">Volver</button>
        </div>
    </div>

   <script src="/js/solicitud.js" defer></script>

</body>

</html>
