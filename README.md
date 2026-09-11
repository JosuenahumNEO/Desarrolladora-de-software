# Basic PHP MVC Skeleton

A basic, from-scratch MVC (Model-View-Controller) architecture built with plain PHP. This project demonstrates core architectural concepts such as the Front Controller pattern, routing, and PSR-4 autoloading without relying on external frameworks.

## Requirements

- PHP >= 8.0
- Composer

## Installation

1. Navigate to the project root directory.

2. Install dependencies and generate the PSR-4 autoloader:
   ```bash
   composer install
   composer dump-autoload
   ```

## Starting the Application

To start the built-in PHP development server, run the following command from the root of the project:

```bash
php -S localhost:8000 -t public
```

The application will be available at `http://localhost:8000`.

## Project Structure

- `public/`: Contains the entry point (`index.php`) and `.htaccess` for URL routing. This is the only directory exposed to the web server.
- `src/Core/`: Core application files, including the main Router (`App.php`) and Base Controller.
- `src/Controllers/`: Application controllers.
- `src/Models/`: Application models.
- `src/Views/`: Application views (HTML templates).
