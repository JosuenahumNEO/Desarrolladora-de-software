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
}
