<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/config.php';

session_start();

use App\Core\App;

$app = new App();
