<?php

namespace App\Controllers;

use App\Core\Controller;

class AuthController extends Controller
{
    /**
     * GET  ?url=auth/login  — muestra el formulario
     * POST ?url=auth/login  — procesa las credenciales
     */
    public function login(): void
    {
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
            $this->handleLogin();
            return;
        }

        $this->view('auth/login');
    }

    /**
     * GET ?url=auth/registro — muestra el formulario de registro
     */
    public function registro(): void
    {
        $this->view('auth/registro');
    }

    // -------------------------------------------------------------------------

    private function handleLogin(): void
    {
        $correo    = trim($_POST['correo']    ?? '');
        $password  = trim($_POST['contrasena'] ?? '');

        // Validación básica
        if ($correo === '' || $password === '') {
            $this->view('auth/login', ['error' => 'Por favor completá todos los campos.']);
            return;
        }

        /** @var \App\Models\User $userModel */
        $userModel = $this->model('User');
        $usuario   = $userModel->findByEmail($correo);

        // Verificar existencia y contraseña
        if (!$usuario || !password_verify($password, $usuario['password'])) {
            $this->view('auth/login', ['error' => 'Correo o contraseña incorrectos.']);
            return;
        }

        // Verificar estado de la cuenta
        if ($usuario['estado'] !== 'activo') {
            $this->view('auth/login', ['error' => 'Tu cuenta está inactiva. Contactá al administrador.']);
            return;
        }

        $_SESSION['usuario_id']     = $usuario['id_usuario'];
        $_SESSION['usuario_nombre']  = $usuario['nombre'];
        $_SESSION['usuario_rol']     = $usuario['rol'];

        // Redirigir según rol — usa ?url= para que el router de App.php lo maneje
        $destino = match ($usuario['rol']) {
            'superadmin' => '/?url=superadmin/home',
            'admin'      => '/?url=admin/home',
            default      => '/?url=cliente/home',
        };

        header('Location: ' . $destino);
        exit;
    }

    /**
     * Cierra la sesión y redirige al login.
     */
    public function logout(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy();
        header('Location: /?url=auth/login');
        exit;
    }
}
