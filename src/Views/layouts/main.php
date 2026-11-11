<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title ?? 'PortDevs Solutions') ?></title>
    <link rel="stylesheet" href="../../../public/css/plantilla.css">
    <?php if (!empty($extraCss)): ?>
        <?php foreach ((array)$extraCss as $css): ?>
            <link rel="stylesheet" href="<?= htmlspecialchars($css) ?>">
        <?php endforeach; ?>
    <?php endif; ?>
    <script src="/js/plantilla.js" defer></script>
    <script src="/js/ajustes.js" defer></script>
    <?php if (!empty($extraJs)): ?>
        <?php foreach ((array)$extraJs as $js): ?>
            <script src="<?= htmlspecialchars($js) ?>" defer></script>
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>
    <?php include __DIR__ . '/../partials/header.php'; ?>
    <?php include __DIR__ . '/../partials/sidebar.php'; ?>

    <main id="main">
        <?= $content ?? '' ?>
    </main>
</body>
</html>