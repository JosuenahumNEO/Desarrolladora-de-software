<?php

namespace App\Controllers;

use App\Core\Controller;

class HomeController extends Controller
{
    public function index($name = 'Mundo')
    {
        $this->view('home/index', ['name' => $name]);
    }

    public function login(): void
    {
        header('Location: /?url=auth/login');
        exit;
    }

    public function conocenos(): void
    {
        $this->view('home/conocenos');
    }

    public function solicitud(): void
    {
        $this->view('home/solicitud');
    }

    public function sistema(): void
    {
        $this->view('home/sistema', [
            'systemTitle' => 'Nombre del Sistema',
            'actionText' => 'Ingresar',
            'actionUrl' => '#ingresar',
            'backText' => 'Volver',
            'backUrl' => '/?url=home',
            'description' => 'Descripción general del sistema. Aquí se detallan los objetivos principales, funcionalidades destacadas y el valor que aporta a los usuarios.',
            'features' => [
                'Gestión y administración centralizada.',
                'Visualización de métricas en tiempo real.',
                'Acceso directo desde cualquier navegador web.'
            ],
            'imageUrl' => ''
        ]);
    }
}
