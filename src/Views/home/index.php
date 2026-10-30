<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desarrolladora de Software — PortDevs Solutions</title>
  <link rel="stylesheet" href="/css/diseno.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <header class="header">
    <div class="logo-container">
      <img src="/svg/cube-hole.svg" alt="Logo de la empresa" class="logo-img" style="width:36px;height:36px;">
      <span style="font-weight:700;margin-left:8px;font-size:1.1rem;">PortDevs Solutions</span>
    </div>
    <a href="/?url=auth/login" class="btn-ingresar" style="text-decoration:none;display:inline-flex;align-items:center;">Ingresar</a>
  </header>

  <main>
    <section class="hero-section animate-on-scroll">
      <h1 class="main-title">Desarrolladora de software | tu próxima solución</h1>

      <div class="cards-container flex-cards">
        <div class="card card-small">
          <h3>Sistema de capacitación multiempresarial</h3>
          <a href="/?url=home/sistema" class="btn-ver-mas" style="text-decoration:none;display:inline-block;text-align:center;">VER MÁS</a>
        </div>

        <div class="card card-featured">
          <h3>Sistema de venta de inmuebles</h3>
          <a href="/?url=home/sistema" class="btn-ver-mas" style="text-decoration:none;display:inline-block;text-align:center;">VER MÁS</a>
        </div>

        <div class="card card-small">
          <h3>Sistema de control escolar</h3>
          <a href="/?url=home/sistema" class="btn-ver-mas" style="text-decoration:none;display:inline-block;text-align:center;">VER MÁS</a>
        </div>
      </div>

      <div class="center-btn">
        <a href="#trabajar" class="btn-black scroll-btn" style="text-decoration:none;">Conocer más sistemas</a>
      </div>
    </section>

    <section id="trabajar" class="feature-section animate-on-scroll">
      <h2 class="section-title">¿Sabes cómo es trabajar con nosotros?</h2>

      <div class="cards-container grid-cards">
        <div class="card feature-card">
          <h3>Atención rápida</h3>
          <p>No esperes más de 24 horas para que un desarrollador lea y conteste tu petición, estamos al pendiente en todo momento del cliente.</p>
        </div>

        <div class="card feature-card card-tall">
          <h3>Software personalizado</h3>
          <p>Tu soporte no se detiene al comprar el software, los desarrolladores están disponibles para hacer cambios exclusivos para tu copia.</p>
        </div>

        <div class="card feature-card">
          <h3>Calidad</h3>
          <p>Garantizamos un software de calidad donde la seguridad de tu información es nuestra prioridad.</p>
        </div>
      </div>
    </section>

    <section class="cta-section animate-on-scroll">
      <h2 class="section-title large-title">Desarrollamos tu idea más compleja</h2>
      <div class="center-btn">
        <a href="/?url=home/solicitud" class="btn-black scroll-btn" style="text-decoration:none;">Contáctanos</a>
      </div>
    </section>
  </main>

  <footer id="contacto" class="footer">
    <div class="footer-content">
      <div class="contact-info">
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp icon"></i>
          <span>3141430259</span>
        </div>
        <div class="contact-item">
          <i class="fa-regular fa-envelope icon"></i>
          <span>empresa@gmail.com</span>
        </div>
        <div class="contact-item">
          <i class="fa-solid fa-headset icon"></i>
          <span>33 123 4567 89</span>
        </div>
      </div>

      <div class="copyright">
        <p>&copy; Todos los derechos reservados. <?= date('Y') ?></p>
        <p style="margin-top:6px;">
          <a href="/?url=legal/terminos" style="color:inherit;margin-right:12px;">Términos y condiciones</a>
          <a href="/?url=legal/privacidad" style="color:inherit;">Política de privacidad</a>
        </p>
      </div>
    </div>
  </footer>

  <script src="/js/script.js"></script>
</body>
</html>

