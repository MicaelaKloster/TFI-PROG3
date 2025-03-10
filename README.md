# 🚗 Sistema de Gestión de Reclamos para Concesionaria de Automóviles

# 📌 Descripción
Este proyecto es una API REStful desarrollada en Node.js con Express y MySQL, que permite gestionar reclamos dentro de una concesionaria de automóviles.
Los usuarios pueden registrarse, iniciar sesión y realizar reclamos, mientras que los administradores y empleados pueden gestionar oficinas, reclamos y repuestos.

# 🚀 Tecnologías Utilizadas
* Backend: Node.js + Express
* Base de Datos: MySQL + MySQL Workbench
* Autenticación: JWT + Passport
* Almacenamiento en caché: Redis
* Manejo de archivos: Multer
* Envío de correos: Nodemailer + Handlebars
* Generación de informes: Puppeteer + PDFKit
* Validación de datos: Joi

# 📁 Estructura del Proyecto:
backend/

│-- config/                # Configuración (Passport, Multer, etc.)

│-- controllers/           # Controladores (manejo de las solicitudes HTTP)

│-- database/              # Acceso a la base de datos (consultas y procedimientos)

│-- middleware/            # Middleware para autenticación, validaciones, etc.

│-- routes/                # Rutas de la API

│-- services/              # Lógica de negocio y conexión con la base de datos

│-- utiles/                # Plantillas de email e informes

│-- uploads/               # Almacenamiento de imágenes

│-- .env                   # Variables de entorno (no incluir en Git)

│-- index.js               # Archivo principal para iniciar el servidor

│-- package.json           # Dependencias y configuración del proyecto

# 🛠 Instalación y Configuración
1️⃣ Clonar el repositorio

2️⃣ Instalar dependencias

3️⃣ Configurar variables de entorno:

Crea un archivo .env en la raíz del proyecto y configura lo siguiente:

PORT=3000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=tu_contraseña

DB_NAME=nombre_database_proyecto

JWT_SECRET=tu_clave_secreta

REDIS_HOST=127.0.0.1

REDIS_PORT=6379

CORREO=tu_email@gmail.com

CLAVE=tu_contraseña

4️⃣ Iniciar el servidor


# 🔑 Autenticación y Roles
El sistema cuenta con tres tipos de usuarios:
1- Administrador (idTipoUsuario  = 1):
* Puede gestionar usuarios, oficinas, reclamos, repuestos y estadísticas.

2- Empleado (idTipoUsuario = 2):
* Puede atender reclamos y gestionar repuestos en su oficina asignada.

3- Cliente (idTipoUsuario = 3):
* Puede registrar reclamos y actualizar su información personal.


Cada usuario debe autenticarse mediante JWT antes de acceder a las rutas protegidas.

# 📌 Principales Funcionalidades
✅ Autenticación y Seguridad:
* Registro, login y logout con JWT.
* Middleware de autorización por tipo de usuario.

✅ Gestión de Usuarios:
* CRUD para clientes, empleados y administradores.

✅ Gestión de Reclamos:
* Creación y cancelación de reclamos.
* Asignación de reclamos a oficinas y empleados.
* Paginación en la lista de reclamos.
* Envío de notificaciones por email sobre cambios en el estado del reclamo.
* Historial de cambios de estado.

✅ Gestión de Oficinas:
* CRUD de oficinas.
* Asignación de empleados a oficinas.

✅ Gestión de Repuestos:
* CRUD de repuestos.
* Asociación de repuestos a reclamos.
* Listado de repuestos utilizados en reclamos.
* Identificación del repuesto más utilizado.

✅ Informes y Estadísticas:
* Generación de informes en PDF y CSV.
* Estadísticas de reclamos y usuarios por oficinas.
* Listado de reclamos más frecuentes.

# 🧑‍💻 Pruebas en Postman
Para probar la API en Postman, sigue estos pasos:
1. Inicia sesión con un usuario y obtén el token JWT.
2. Usa ese token en las rutas protegidas, agregándolo en Headers -> Authorization como Bearer [TOKEN].
3. Realiza las pruebas de los diferentes endpoints según el rol del usuario.

# 📜 Licencia
Este proyecto es de código abierto y puede ser usado con fines educativos.

# Autor
Micaela Kloster Quintana.
