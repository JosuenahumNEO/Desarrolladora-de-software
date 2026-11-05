<?php

namespace App\Controllers;

use App\Core\Controller;

class ChatController extends Controller
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
        $this->view('chat/index');
    }

    public function conversacion(): void
    {
        $this->checkAuth();
        $this->view('chat/conversacion');
    }
}

