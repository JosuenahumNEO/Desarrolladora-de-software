<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class User
{
    public string $name = '';

    /**
     * Busca un usuario por correo y retorna sus datos junto con el nombre del rol.
     * Retorna false si no existe.
     */
    public function findByEmail(string $email): array|false
    {
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare(
            'SELECT u.id_usuario, u.nombre, u.correo, u.password, u.estado,
                    r.nombre AS rol
             FROM   usuario u
             INNER JOIN rol r ON r.id_rol = u.id_rol
             WHERE  u.correo = :correo
             LIMIT  1'
        );

        $stmt->execute([':correo' => $email]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
