<?php

namespace App\Core;

abstract class Controller
{
    public function model($model)
    {
        $modelClass = "\\App\\Models\\" . $model;
        return new $modelClass();
    }

    public function view($view, $data = [])
    {
        if (file_exists('../src/Views/' . $view . '.php')) {
            extract($data);
            require_once '../src/Views/' . $view . '.php';
        } else {
            die("La vista no existe.");
        }
    }
}
