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

3. Configura las variables de entorno a partir de la plantilla de ejemplo:
   ```bash
   # En Linux / macOS / Git Bash:
   cp .env.example .env

   # En Windows PowerShell:
   Copy-Item .env.example .env
   ```
   Abre el archivo `.env` y define las credenciales de conexión a tu base de datos (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`), así como las configuraciones generales del sistema.

4. Importa la estructura inicial de la base de datos (opcional si aún no está creada):
   Ejecuta el script SQL ubicado en `database/init.sql` en tu gestor de MySQL o MariaDB.

## Iniciar la Aplicación

Para iniciar el servidor de desarrollo interno de PHP, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
php -S localhost:8000 -t public
```

La aplicación estará disponible en `http://localhost:8000`.

## Estructura del Proyecto

- `.env.example`: Plantilla de variables de entorno para configuración local (el archivo `.env` resultante está protegido por `.gitignore`).
- `database/`: Scripts SQL de inicialización de la base de datos (`init.sql`).
- `public/`: Contiene el punto de entrada (`index.php`) y `.htaccess` para el enrutamiento de URLs. Este es el único directorio expuesto al servidor web.
- `src/Core/`: Archivos principales de la aplicación, incluyendo el enrutador principal (`App.php`) y el Controlador Base.
- `src/Controllers/`: Controladores de la aplicación.
- `src/Models/`: Modelos de la aplicación.
- `src/Views/`: Vistas de la aplicación (plantillas HTML).