<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($systemTitle ?? 'Título del Sistema') ?></title>
    <!-- Tipografía moderna -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* ==========================================================
           SISTEMA DE DISEÑO: TOKENS DE COLOR (MODO CLARO Y OSCURO)
           ========================================================== */
        :root[data-theme="light"] {
            /* MODO CLARO */
            --color-body: #F8FAFC;
            --color-h1: #0F172A;
            --color-text: #64748B;
            --color-btn-action: #10B981;
            --color-interactive: #2563EB;
            
            --surface-bg: #FFFFFF;
            --surface-border: #E2E8F0;
            --inner-bg: #F8FAFC;
            --inner-border: #E2E8F0;
            --placeholder-bg: #F1F5F9;
            --placeholder-border: #CBD5E1;
            --shadow-subtle: 0 4px 6px -1px rgba(15, 23, 42, 0.05);
        }

        :root[data-theme="dark"] {
            /* MODO OSCURO */
            --color-body: #979ea8;
            --color-h1: #ffffff;
            --color-text: #ffffff;
            --color-btn-action: #008a0e;
            --color-interactive: #91a2d9;
            
            --surface-bg: #1E293B;
            --surface-border: #334155;
            --inner-bg: #0F172A;
            --inner-border: #334155;
            --placeholder-bg: #1E293B;
            --placeholder-border: #475569;
            --shadow-subtle: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        /* ==========================================================
           RESET Y LAYOUT FULLSCREEN (PANTALLA COMPLETA)
           ========================================================== */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            height: 100%;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--color-body);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: background-color 0.25s ease, color 0.25s ease;
        }

        /* ==========================================================
           HEADER COMPLETO
           ========================================================== */
        .page-header {
            width: 100%;
            padding: 24px 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--surface-bg);
            border-bottom: 1px solid var(--surface-border);
            box-shadow: var(--shadow-subtle);
            transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .header-left-slot {
            display: flex;
            align-items: center;
            min-width: 180px;
        }

        .page-title {
            flex: 1;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--color-h1);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .header-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 16px;
            min-width: 180px;
        }

        /* Botón de alternancia de tema */
        .btn-theme-toggle {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--inner-bg);
            color: var(--color-h1);
            border: 1px solid var(--inner-border);
            padding: 8px 16px;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-theme-toggle:hover {
            transform: translateY(-1px);
        }

        /* Botón interactivo superior (Ingresar) */
        .btn-interactive {
            background-color: var(--color-interactive);
            color: #FFFFFF;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 700;
            padding: 9px 32px;
            border-radius: 9999px;
            transition: transform 0.2s ease, filter 0.2s ease;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-interactive:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }

        /* ==========================================================
           MAIN: CONTENEDOR CENTRAL DE LA PANTALLA
           ========================================================== */
        .page-main {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 48px;
        }

        .system-content-wrapper {
            width: 100%;
            max-width: 1300px;
            background-color: var(--surface-bg);
            border: 1px solid var(--surface-border);
            border-radius: 20px;
            padding: 48px;
            box-shadow: var(--shadow-subtle);
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 48px;
            align-items: center;
            transition: all 0.25s ease;
        }

        /* Columna de Información */
        .content-info-col {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .content-description {
            font-size: 1.2rem;
            line-height: 1.7;
            color: var(--color-text);
            font-weight: 500;
        }

        .content-features {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 8px;
        }

        .content-features li {
            font-size: 1.05rem;
            color: var(--color-text);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            line-height: 1.5;
        }

        .content-features li::before {
            content: "—";
            color: var(--color-interactive);
            font-weight: 800;
        }

        /* Columna del Slot de Imagen o Mockup */
        .content-media-slot {
            width: 100%;
            min-height: 340px;
            background-color: var(--placeholder-bg);
            border: 2px dashed var(--placeholder-border);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            padding: 30px;
            text-align: center;
            color: var(--color-text);
            transition: all 0.25s ease;
        }

        .content-media-slot img {
            max-width: 100%;
            max-height: 380px;
            border-radius: 12px;
            object-fit: cover;
        }

        .slot-icon {
            width: 56px;
            height: 56px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.5;
            opacity: 0.7;
        }

        .slot-label {
            font-size: 1.05rem;
            font-weight: 700;
        }

        .slot-hint {
            font-size: 0.85rem;
            opacity: 0.75;
        }

        /* ==========================================================
           FOOTER COMPLETO
           ========================================================== */
        .page-footer {
            width: 100%;
            padding: 24px 48px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: var(--surface-bg);
            border-top: 1px solid var(--surface-border);
            box-shadow: var(--shadow-subtle);
            transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .btn-action {
            background-color: var(--color-btn-action);
            color: #FFFFFF;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 700;
            padding: 9px 36px;
            border-radius: 9999px;
            transition: transform 0.2s ease, filter 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-action:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }

        /* ==========================================================
           RESPONSIVIDAD
           ========================================================== */
        @media (max-width: 992px) {
            .page-header, .page-footer {
                padding: 20px 24px;
            }

            .page-main {
                padding: 32px 24px;
            }

            .system-content-wrapper {
                grid-template-columns: 1fr;
                padding: 32px 24px;
                gap: 32px;
            }

            .page-title {
                font-size: 1.25rem;
            }

            .content-media-slot {
                min-height: 240px;
            }
        }

        @media (max-width: 640px) {
            .page-header {
                flex-direction: column;
                gap: 16px;
            }

            .header-left-slot, .header-actions {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>

    <!-- HEADER DE PANTALLA COMPLETA -->
    <header class="page-header">
        <div class="header-left-slot">
            <button type="button" class="btn-theme-toggle" id="themeToggleBtn" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
                <span id="themeText">Modo Oscuro</span>
            </button>
        </div>

        <h1 class="page-title"><?= htmlspecialchars($systemTitle ?? 'Título del Sistema') ?></h1>

        <div class="header-actions">
            <a href="<?= htmlspecialchars($actionUrl ?? '#') ?>" class="btn-interactive"><?= htmlspecialchars($actionText ?? 'Ingresar') ?></a>
        </div>
    </header>

    <!-- CUERPO PRINCIPAL DE PANTALLA COMPLETA -->
    <main class="page-main">
        <div class="system-content-wrapper">
            
            <!-- COLUMNA 1: DESCRIPCIÓN Y VIÑETAS DE CARACTERÍSTICAS -->
            <div class="content-info-col">
                <p class="content-description">
                    <?= htmlspecialchars($description ?? 'Descripción general del sistema. En este espacio se detalla el funcionamiento principal, propósito y beneficios para los usuarios.') ?>
                </p>

                <?php if (!empty($features)): ?>
                    <ul class="content-features">
                        <?php foreach ($features as $feature): ?>
                            <li><?= htmlspecialchars($feature) ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>

            <!-- COLUMNA 2: ESPACIO PARA IMAGEN O CAPTURA DEL SISTEMA -->
            <div class="content-media-slot">
                <?php if (!empty($imageUrl)): ?>
                    <img src="<?= htmlspecialchars($imageUrl) ?>" alt="<?= htmlspecialchars($systemTitle ?? 'Imagen del Sistema') ?>">
                <?php else: ?>
                    <svg class="slot-icon" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span class="slot-label">Espacio para Imagen o Captura del Sistema</span>
                    <span class="slot-hint">Inyectable mediante la variable $imageUrl</span>
                <?php endif; ?>
            </div>

        </div>
    </main>

    <!-- FOOTER DE PANTALLA COMPLETA -->
    <footer class="page-footer">
        <a href="<?= htmlspecialchars($backUrl ?? '#') ?>" class="btn-action"><?= htmlspecialchars($backText ?? 'Volver') ?></a>
    </footer>

    <!-- SCRIPT DE CAMBIO ENTRE MODO CLARO Y OSCURO -->
    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');
            
            if (newTheme === 'dark') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Modo Claro';
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Modo Oscuro';
            }
        }
    </script>
</body>
</html>
