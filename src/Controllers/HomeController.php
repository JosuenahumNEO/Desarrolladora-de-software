<?php

namespace App\Controllers;

use App\Core\Controller;

class HomeController extends Controller
{
    public function index($name = 'Mundo')
    {
        $user = $this->model('User');
        $user->name = $name;

        $this->view('home', ['name' => $user->name]);
    }

    public function login()
    {
        $this->view('login');
    }

    public function sistema()
    {
        $this->view('sistema', [
            'systemTitle' => 'Nombre del Sistema',
            'actionText' => 'Ingresar',
            'actionUrl' => '#ingresar',
            'backText' => 'Volver',
            'backUrl' => 'index.php?url=home',
            'description' => 'Descripción general del sistema. Aquí se detallan los objetivos principales, funcionalidades destacadas y el valor que aporta a los usuarios.',
            'features' => [
                'Gestión y administración centralizada.',
                'Visualización de métricas en tiempo real.',
                'Acceso directo desde cualquier navegador web.'
            ],
            'imageUrl' => '' // Se deja vacío para mostrar el slot/placeholder del esqueleto, o se puede pasar una URL
        ]);
    }
}

