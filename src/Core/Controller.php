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
        $phpPath  = '../src/Views/' . $view . '.php';
        $htmlPath = '../src/Views/' . $view . '.html';

        if (file_exists($phpPath)) {
            extract($data);
            require_once $phpPath;
        } elseif (file_exists($htmlPath)) {
            require_once $htmlPath;
        } else {
            die("La vista no existe.");
        }
    }
}
