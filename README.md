# Esqueleto Básico PHP MVC

Una arquitectura MVC (Modelo-Vista-Controlador) básica construida desde cero con PHP nativo. Este proyecto demuestra conceptos arquitectónicos básicos como el patrón Front Controller, enrutamiento y carga automática (autoloading) PSR-4 sin depender de frameworks externos.

## Requisitos

- PHP >= 8.0
- Composer

## Instalación

1. Navega al directorio raíz del proyecto.

2. Instala las dependencias y genera el autoloader PSR-4:
   ```bash
   composer install
   composer dump-autoload
   ```

## Iniciar la Aplicación

Para iniciar el servidor de desarrollo interno de PHP, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
php -S localhost:8000 -t public
```

La aplicación estará disponible en `http://localhost:8000`.

## Estructura del Proyecto

- `public/`: Contiene el punto de entrada (`index.php`) y `.htaccess` para el enrutamiento de URLs. Este es el único directorio expuesto al servidor web.
- `src/Core/`: Archivos principales de la aplicación, incluyendo el enrutador principal (`App.php`) y el Controlador Base.
- `src/Controllers/`: Controladores de la aplicación.
- `src/Models/`: Modelos de la aplicación.
- `src/Views/`: Vistas de la aplicación (plantillas HTML).
