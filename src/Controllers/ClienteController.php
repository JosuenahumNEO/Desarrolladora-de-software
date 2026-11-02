<?php

namespace App\Controllers;

use App\Core\Controller;

class ClienteController extends Controller
{
    public function home(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['usuario_rol']) || $_SESSION['usuario_rol'] !== 'usuario') {
            header('Location: /?url=auth/login');
            exit;
        }

        $this->view('cliente/home');
    }
}
