<?php

namespace App\Core;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;

    private function __construct() {}

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $host   = defined('DB_HOST')   ? DB_HOST   : 'localhost';
            $db     = defined('DB_NAME')   ? DB_NAME   : 'dev_software_db';
            $user   = defined('DB_USER')   ? DB_USER   : 'root';
            $pass   = defined('DB_PASS')   ? DB_PASS   : '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host={$host};dbname={$db};charset={$charset}";

            try {
                self::$instance = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
            } catch (PDOException $e) {
                // En producción: loguear sin exponer detalles
                die('Error de conexión a la base de datos.');
            }
        }

        return self::$instance;
    }
}
