<?php

namespace App\Controllers;

use App\Core\Controller;

class AdminController extends Controller
{
    public function home(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['usuario_rol']) || $_SESSION['usuario_rol'] !== 'admin') {
            header('Location: /?url=auth/login');
            exit;
        }

        $this->view('admin/home');
    }
}
