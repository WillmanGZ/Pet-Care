# SPA - Centro de Cuidado de Mascotas 🐾

## Descripción General

Este proyecto es una Single Page Application (SPA) para un centro de cuidado de mascotas, donde los clientes pueden dejar sus animales para que sean atendidos mientras están por fuera de casa.  
La aplicación permite registrar dueños de mascotas, ingresar datos de los animales, gestionar estancias (reservas de cuidado), y tener un sistema de autenticación y control de acceso por roles.

La solución está construida con **HTML**, **CSS** y **JavaScript Vanilla**, consumiendo una API simulada mediante `json-server`.

## ✨ Características Principales

- **Gestión de Entidades**: Funcionalidades de CRUD (Crear, Leer, Actualizar, Eliminar) con `fetch()` para mascotas y estancias.
- **Roles de Usuario**: El sistema respeta la lógica de permisos basada en roles (`worker` y `customer`).
- **Autenticación y Sesión**: El control de sesión se maneja mediante `LocalStorage` bajo la clave `currentUser`. Al cerrar sesión, se limpia el `localStorage` y se redirige a la landing page.
- **Navegación SPA**: Las vistas cambian de manera fluida usando JavaScript sin recargar la página completa.
- **Validación de Rutas**: Las rutas mal ingresadas redireccionan automáticamente a una vista 404 (`404.html`).
- **Cálculo de Estancia**: Se calcula automáticamente el valor total a pagar por el cliente. El cálculo se realiza multiplicando el número de días de la estancia por el campo `valorDia`.

## 📂 Estructura de Datos (`database.json`)

La base de datos está dividida en cuatro colecciones principales:

- `roles`: Define los tipos de usuario: `"worker"` (trabajadores del centro) y `"customer"` (clientes o dueños de mascotas).
- `users`: Almacena la información de los dueños y trabajadores, con campos como `nombre`, `email`, `contrasena` y `rolId`.
- `pets`: Contiene los detalles de las mascotas, con campos como `nombre`, `peso`, `edad`, `raza` y `userId` (dueño, relación con `users`).
- `stays`: Registra las estancias, con campos como la fecha de `ingreso`, `salida`, `petId` (relación con `pets`) y `valorDia`.

## 🚀 Guía de Instalación y Uso

1. **Clona el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Instala las dependencias**  
   Asegúrate de tener Node.js instalado. Luego, instala `json-server` globalmente:

   ```bash
   npm install -g json-server
   ```

3. **Inicia el servidor de la API**  
   Abre tu terminal en el directorio raíz del proyecto y ejecuta:

   ```bash
   json-server --watch database.json --port 3000
   ```

   Esto levantará una API RESTful en `http://localhost:3000`.

4. **Abre el proyecto**  
   Simplemente abre el archivo `index.html` en tu navegador web. La aplicación se ejecutará y se conectará automáticamente a la API.

## 🤝 Contribuciones

Siéntete libre de abrir `issues` para reportar errores o sugerir mejoras. Las `pull requests` son bienvenidas.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más
