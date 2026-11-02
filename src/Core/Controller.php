<?php

namespace App\Core;

abstract class Controller
{
    public function model(string $model): object
    {
        $modelClass = "\\App\\Models\\" . $model;
        return new $modelClass();
    }

    public function view(string $view, array $data = []): void
    {
        $viewsDir = dirname(__DIR__) . '/Views/';

        $candidates = [
            $viewsDir . $view . '.php',
            $viewsDir . $view . '.html',
        ];

        // If view has no slash, search inside module subdirectories
        if (!str_contains($view, '/')) {
            $modules = ['auth', 'home', 'configuracion', 'chat', 'legal', 'admin', 'cliente', 'super_admin'];
            foreach ($modules as $module) {
                $candidates[] = $viewsDir . $module . '/' . $view . '.php';
                $candidates[] = $viewsDir . $module . '/' . $view . '.html';
            }

            if ($view === 'home') {
                $candidates[] = $viewsDir . 'home/index.php';
            }
        }

        foreach ($candidates as $filePath) {
            if (file_exists($filePath)) {
                extract($data);
                require_once $filePath;
                return;
            }
        }

        die("La vista '{$view}' no existe.");
    }
}
