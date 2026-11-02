<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Panel de Super Administrador — gestión global de sistemas, admins y usuarios.">
    <title>Super Admin — Software Solutions</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/super_admin/home.css">
</head>

<body>

    <!-- ============ HEADER ============ -->
    <header>
        <div class="left">
            <div class="menu-container">
                <div class="menu" id="menu">
                    <i class="fa-solid fa-bars" aria-hidden="true"></i>
                </div>
            </div>
            <div class="brand">
                <i class="fa-solid fa-cube logo-icon" aria-hidden="true"></i>
                <span class="name">Software Solutions</span>
            </div>
        </div>

        <div class="right">
            <span class="role-badge">Super Admin</span>
            <i class="fa-solid fa-circle-user user" aria-label="Usuario super administrador"></i>
        </div>
    </header>

    <!-- ============ SIDEBAR ============ -->
    <div class="sidebar" id="sidebar">
        <nav aria-label="Navegación principal">
            <ul>
                <li>
                    <button class="btn-sidebar selected" data-accion="inicio" aria-current="page">
                        <i class="fa-solid fa-house" aria-hidden="true"></i>
                        <span class="texto">Inicio</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="sistemas">
                        <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
                        <span class="texto">Sistemas</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="admins">
                        <i class="fa-solid fa-user-shield" aria-hidden="true"></i>
                        <span class="texto">Administradores</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="usuarios">
                        <i class="fa-solid fa-users" aria-hidden="true"></i>
                        <span class="texto">Usuarios</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="chat">
                        <i class="fa-solid fa-comment-dots" aria-hidden="true"></i>
                        <span class="texto">Chat</span>
                    </button>
                </li>
                <li>
                    <button class="btn-sidebar" data-accion="configuracion">
                        <i class="fa-solid fa-gear" aria-hidden="true"></i>
                        <span class="texto">Configuración</span>
                    </button>
                </li>

                <!-- Modo oscuro -->
                <li>
                    <button class="btn-sidebar" id="item-modo" role="switch" aria-checked="false">
                        <i class="fa-solid fa-moon" id="icono-modo" aria-hidden="true"></i>
                        <span class="texto">Modo oscuro</span>
                        <span class="switch">
                            <span class="slider"></span>
                        </span>
                    </button>
                </li>

                <!-- Logout al fondo -->
                <li class="down">
                    <button class="btn-sidebar red-jhon" data-accion="logout">
                        <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                        <span class="texto">Log out</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>

    <!-- ============ MAIN ============ -->
    <main id="main">

        <!-- === SECCIÓN 1: Stats de gestión === -->
        <section class="stats-section" aria-label="Resumen del sistema">
            <h1 class="titulo-pagina">Panel de control</h1>

            <div class="stats-grid">
                <div class="stat-card" id="stat-sistemas">
                    <div class="stat-card__icon-wrap stat-card__icon-wrap--teal">
                        <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
                    </div>
                    <div class="stat-card__data">
                        <span class="stat-card__number" id="num-sistemas">4</span>
                        <span class="stat-card__label">Sistemas activos</span>
                    </div>
                </div>

                <div class="stat-card" id="stat-admins">
                    <div class="stat-card__icon-wrap stat-card__icon-wrap--purple">
                        <i class="fa-solid fa-user-shield" aria-hidden="true"></i>
                    </div>
                    <div class="stat-card__data">
                        <span class="stat-card__number" id="num-admins">3</span>
                        <span class="stat-card__label">Administradores</span>
                    </div>
                </div>

                <div class="stat-card" id="stat-usuarios">
                    <div class="stat-card__icon-wrap stat-card__icon-wrap--blue">
                        <i class="fa-solid fa-users" aria-hidden="true"></i>
                    </div>
                    <div class="stat-card__data">
                        <span class="stat-card__number" id="num-usuarios">128</span>
                        <span class="stat-card__label">Usuarios registrados</span>
                    </div>
                </div>

                <div class="stat-card" id="stat-solicitudes">
                    <div class="stat-card__icon-wrap stat-card__icon-wrap--orange">
                        <i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
                    </div>
                    <div class="stat-card__data">
                        <span class="stat-card__number" id="num-solicitudes">7</span>
                        <span class="stat-card__label">Solicitudes pendientes</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- === SECCIÓN 2: Accesos rápidos de gestión === -->
        <section class="quick-section" aria-label="Gestión rápida">
            <h2 class="section-heading">Gestión rápida</h2>

            <div class="quick-grid">
                <button class="quick-card" id="qc-nuevo-admin" data-accion="nuevo-admin">
                    <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
                    <span>Nuevo administrador</span>
                </button>
                <button class="quick-card" id="qc-nuevo-sistema" data-accion="nuevo-sistema">
                    <i class="fa-solid fa-plus-circle" aria-hidden="true"></i>
                    <span>Nuevo sistema</span>
                </button>
                <button class="quick-card" id="qc-ver-solicitudes" data-accion="solicitudes">
                    <i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
                    <span>Ver solicitudes</span>
                </button>
                <button class="quick-card" id="qc-reportes" data-accion="reportes">
                    <i class="fa-solid fa-chart-bar" aria-hidden="true"></i>
                    <span>Reportes</span>
                </button>
            </div>
        </section>

        <!-- === SECCIÓN 3: Catálogo de sistemas === -->
        <section class="sw-section" aria-label="Catálogo de sistemas">
            <div class="section-header">
                <h2 class="section-heading">Descubre nuestros sistemas</h2>
                <div class="search-wrap">
                    <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
                    <input id="search-input" type="search" class="search-input" placeholder="Buscar sistema…"
                        aria-label="Buscar sistema">
                </div>
            </div>

            <div class="sw-grid" role="list">

                <!-- Tarjeta 1 -->
                <article class="sw-card" id="card-1" role="listitem">
                    <div class="sw-card__media sw-card__media--teal">
                        <i class="fa-solid fa-users-gear sw-card__icon" aria-hidden="true"></i>
                    </div>
                    <div class="sw-card__body">
                        <h3 class="sw-card__name">Sistema de Gestión</h3>
                        <p class="sw-card__desc">Administra recursos y usuarios de forma centralizada con reportes en tiempo real.</p>
                        <div class="sw-card__actions">
                            <a href="#" class="sw-card__btn" aria-label="Ver más sobre Sistema de Gestión">VER +</a>
                            <button class="sw-card__edit" aria-label="Editar Sistema de Gestión">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Tarjeta 2 -->
                <article class="sw-card" id="card-2" role="listitem">
                    <div class="sw-card__media sw-card__media--purple">
                        <i class="fa-solid fa-globe sw-card__icon" aria-hidden="true"></i>
                    </div>
                    <div class="sw-card__body">
                        <h3 class="sw-card__name">Portal de Clientes</h3>
                        <p class="sw-card__desc">Acceso seguro para clientes con seguimiento de solicitudes y comunicación directa.</p>
                        <div class="sw-card__actions">
                            <a href="#" class="sw-card__btn" aria-label="Ver más sobre Portal de Clientes">VER +</a>
                            <button class="sw-card__edit" aria-label="Editar Portal de Clientes">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Tarjeta 3 -->
                <article class="sw-card" id="card-3" role="listitem">
                    <div class="sw-card__media sw-card__media--blue">
                        <i class="fa-solid fa-chart-line sw-card__icon" aria-hidden="true"></i>
                    </div>
                    <div class="sw-card__body">
                        <h3 class="sw-card__name">Analítica Avanzada</h3>
                        <p class="sw-card__desc">Dashboards interactivos con métricas clave para tomar decisiones basadas en datos.</p>
                        <div class="sw-card__actions">
                            <a href="#" class="sw-card__btn" aria-label="Ver más sobre Analítica Avanzada">VER +</a>
                            <button class="sw-card__edit" aria-label="Editar Analítica Avanzada">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Tarjeta 4 -->
                <article class="sw-card" id="card-4" role="listitem">
                    <div class="sw-card__media sw-card__media--orange">
                        <i class="fa-solid fa-robot sw-card__icon" aria-hidden="true"></i>
                    </div>
                    <div class="sw-card__body">
                        <h3 class="sw-card__name">Automatización</h3>
                        <p class="sw-card__desc">Flujos de trabajo automatizados que reducen tiempos y eliminan tareas repetitivas.</p>
                        <div class="sw-card__actions">
                            <a href="#" class="sw-card__btn" aria-label="Ver más sobre Automatización">VER +</a>
                            <button class="sw-card__edit" aria-label="Editar Automatización">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>

            </div>
        </section>

    </main>

    <!-- FAB -->
    <button class="fab" id="fab-add" aria-label="Agregar nuevo sistema">
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
    </button>

    <script src="/js/super_admin/home.js"></script>

</body>

</html>

