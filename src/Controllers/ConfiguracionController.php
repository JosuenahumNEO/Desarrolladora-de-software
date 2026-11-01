<?php

namespace App\Controllers;

use App\Core\Controller;

class ConfiguracionController extends Controller
{
    private function checkAuth(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['usuario_id'])) {
            header('Location: /?url=auth/login');
            exit;
        }
    }

    public function index(): void
    {
        $this->checkAuth();
        $this->view('configuracion/index');
    }

    public function cuenta(): void
    {
        $this->checkAuth();
        $this->view('configuracion/cuenta');
    }

    public function idioma(): void
    {
        $this->checkAuth();
        $this->view('configuracion/idioma');
    }

    public function apariencia(): void
    {
        $this->checkAuth();
        $this->view('configuracion/apariencia');
    }

    public function accesibilidad(): void
    {
        $this->checkAuth();
        $this->view('configuracion/accesibilidad');
    }

    public function notificaciones(): void
    {
        $this->checkAuth();
        $this->view('configuracion/notificaciones');
    }

    public function seguridad(): void
    {
        $this->checkAuth();
        $this->view('configuracion/seguridad');
    }

    public function privacidad(): void
    {
        $this->checkAuth();
        $this->view('configuracion/privacidad');
    }

    public function datos(): void
    {
        $this->checkAuth();
        $this->view('configuracion/datos');
    }
}

