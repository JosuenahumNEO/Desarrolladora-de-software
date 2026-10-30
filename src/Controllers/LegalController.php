<?php

namespace App\Controllers;

use App\Core\Controller;

class LegalController extends Controller
{
    public function terminos(): void
    {
        $this->view('legal/terminos_condiciones');
    }

    public function privacidad(): void
    {
        $this->view('legal/politica_privacidad');
    }
}

