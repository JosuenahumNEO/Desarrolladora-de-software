<?php

namespace App\Core;

class App
{
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct()
    {
        $url = $this->parseUrl();

        $controllersDir = dirname(__DIR__) . '/Controllers/';
        if (isset($url[0]) && file_exists($controllersDir . ucfirst($url[0]) . 'Controller.php')) {
            $this->controller = ucfirst($url[0]) . 'Controller';
            unset($url[0]);
        }

        $controllerClass = "\\App\\Controllers\\" . $this->controller;
        $this->controller = new $controllerClass;

        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        } else {
            // Determine the default method for the resolved controller
            if (method_exists($this->controller, 'index')) {
                $this->method = 'index';
            } elseif (method_exists($this->controller, 'home')) {
                $this->method = 'home';
            } elseif (method_exists($this->controller, 'login')) {
                $this->method = 'login';
            }
        }

        $this->params = $url ? array_values($url) : [];

        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseUrl()
    {
        if (isset($_GET['url'])) {
            return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
        }
        return ['home'];
    }
}
