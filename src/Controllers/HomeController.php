<?php

namespace App\Controllers;

use App\Core\Controller;

class HomeController extends Controller
{
    /**
     * Datos de cada sistema que se muestra en el catálogo de la página principal.
     * Para agregar un sistema nuevo, añade una entrada con su clave (slug).
     */
    private const SISTEMAS = [
        'capacitacion' => [
            'systemTitle' => 'Sistema de capacitación multiempresarial',
            'description' => 'Plataforma para que varias empresas gestionen la capacitación de su personal desde un mismo sistema, con cursos, seguimiento de avance y reportes por empresa.',
            'features' => [
                'Administración de cursos y materiales por empresa.',
                'Seguimiento del avance y calificaciones de cada participante.',
                'Acceso desde cualquier navegador web.',
            ],
        ],
        'inmuebles' => [
            'systemTitle' => 'Sistema de venta de inmuebles',
            'description' => 'Sistema para publicar, dar seguimiento y cerrar operaciones de venta de propiedades, centralizando clientes, citas y documentos.',
            'features' => [
                'Catálogo de propiedades con búsqueda y filtros.',
                'Registro de clientes, citas y seguimiento de prospectos.',
                'Control de documentos y estatus de cada operación.',
            ],
        ],
        'escolar' => [
            'systemTitle' => 'Sistema de control escolar',
            'description' => 'Sistema para administrar alumnos, grupos, calificaciones y pagos de una institución educativa.',
            'features' => [
                'Gestión de alumnos, grupos y horarios.',
                'Captura de calificaciones y boletas.',
                'Consulta en línea para alumnos y padres de familia.',
            ],
        ],
    ];

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

    public function sistema(string $slug = 'capacitacion'): void
    {
        $sistema = self::SISTEMAS[$slug] ?? self::SISTEMAS['capacitacion'];

        $this->view('home/sistema', $sistema + [
            'actionText' => 'Ingresar',
            'actionUrl'  => '/?url=auth/login',
            'backText'   => 'Volver',
            'backUrl'    => '/?url=home',
            'imageUrl'   => '',
        ]);
    }
}
