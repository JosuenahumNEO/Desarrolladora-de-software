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
     * GET  ?url=auth/registro — muestra el formulario de registro
     * POST ?url=auth/registro — procesa el registro de usuario (rol cliente)
     */
    public function registro(): void
    {
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
            $this->handleRegistro();
            return;
        }

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

    private function handleRegistro(): void
    {
        $nombre    = trim($_POST['nombre'] ?? '');
        $correo    = trim($_POST['correo'] ?? '');
        $password  = trim($_POST['contrasena'] ?? '');
        $confirmar = trim($_POST['confirmar'] ?? '');
        $terminos  = isset($_POST['terminos']);

        $old = [
            'nombre' => $nombre,
            'correo' => $correo,
        ];

        // Validaciones
        if ($nombre === '' || $correo === '' || $password === '' || $confirmar === '') {
            $this->view('auth/registro', [
                'error' => 'Por favor completa todos los campos requeridos.',
                'old'   => $old,
            ]);
            return;
        }

        if (!$terminos) {
            $this->view('auth/registro', [
                'error' => 'Debes aceptar los términos y condiciones para continuar.',
                'old'   => $old,
            ]);
            return;
        }

        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            $this->view('auth/registro', [
                'error' => 'Ingresa un correo electrónico válido.',
                'old'   => $old,
            ]);
            return;
        }

        if (strlen($password) < 8) {
            $this->view('auth/registro', [
                'error' => 'La contraseña debe tener al menos 8 caracteres.',
                'old'   => $old,
            ]);
            return;
        }

        if ($password !== $confirmar) {
            $this->view('auth/registro', [
                'error' => 'Las contraseñas no coinciden.',
                'old'   => $old,
            ]);
            return;
        }

        /** @var \App\Models\User $userModel */
        $userModel = $this->model('User');

        // Verificar si el correo ya está registrado
        if ($userModel->findByEmail($correo)) {
            $this->view('auth/registro', [
                'error' => 'El correo electrónico ya se encuentra registrado.',
                'old'   => $old,
            ]);
            return;
        }

        // Crear el usuario con id_rol = 3 (rol 'usuario' / cliente) según init.sql
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $nuevoId = $userModel->create([
            'id_rol'   => 3,
            'nombre'   => $nombre,
            'correo'   => $correo,
            'password' => $passwordHash,
            'estado'   => 'activo',
            'telefono' => null,
            'genero'   => null,
        ]);

        if (!$nuevoId) {
            $this->view('auth/registro', [
                'error' => 'Ocurrió un error al registrar la cuenta. Intenta de nuevo más tarde.',
                'old'   => $old,
            ]);
            return;
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Iniciar sesión y redirigir al panel del cliente
        $_SESSION['usuario_id']     = $nuevoId;
        $_SESSION['usuario_nombre']  = $nombre;
        $_SESSION['usuario_rol']     = 'usuario';

        header('Location: /?url=cliente/home');
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
