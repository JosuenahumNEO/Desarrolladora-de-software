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

    /**
     * Registra un nuevo usuario en la base de datos.
     *
     * @param array{
     *     id_rol?: int,
     *     nombre: string,
     *     correo: string,
     *     password: string,
     *     estado?: string,
     *     telefono?: ?string,
     *     genero?: ?string
     * } $data
     * @return int|false ID del usuario insertado o false en caso de error.
     */
    public function create(array $data): int|false
    {
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare(
            'INSERT INTO usuario (id_rol, nombre, correo, password, estado, telefono, genero)
             VALUES (:id_rol, :nombre, :correo, :password, :estado, :telefono, :genero)'
        );

        $success = $stmt->execute([
            ':id_rol'   => $data['id_rol'] ?? 3,
            ':nombre'   => $data['nombre'],
            ':correo'   => $data['correo'],
            ':password' => $data['password'],
            ':estado'   => $data['estado'] ?? 'activo',
            ':telefono' => $data['telefono'] ?? null,
            ':genero'   => $data['genero'] ?? null,
        ]);

        return $success ? (int) $pdo->lastInsertId() : false;
    }
}
