🌍 GoGoMap - Backend API
API RESTful desarrollada para el proyecto GoGoMap, encargada de gestionar los puntos de interés geolocalizados (ODS) y la autenticación de usuarios. Diseñada bajo principios de Clean Code, separación por capas (DTOs) y alta resiliencia en la ingesta de datos.

🛠️ Stack Tecnológico
Lenguaje: Java 21

Framework Core: Spring Boot 3

Base de Datos: MySQL & Spring Data JPA (Hibernate)

Seguridad: Spring Security + OAuth2 Resource Server (JWT)

Mapeo de Objetos: MapStruct

Utilidades: Lombok, Spring Boot DevTools

🛡️ Seguridad y Arquitectura
Autenticación Stateless: Gestión de sesiones mediante JWT (HS256).

Protección de Credenciales: Encriptación robusta mediante BCrypt con inyección gestionada por Spring.

Aislamiento de Dominio: Uso estricto de DTOs para evitar la exposición de entidades y asegurar la integridad de la API.

CORS Optimizado: Configuración granular para integración segura con entornos de frontend (Vite/React/Angular), incluyendo soporte para cabeceras de autorización y caché pre-flight (maxAge).

Seguridad Basada en Roles: Protección de endpoints mediante SecurityFilterChain y JwtAuthenticationConverter para la gestión dinámica de permisos.

⚙️ Configuración
Asegúrate de configurar src/main/resources/application.properties con las siguientes claves:

Properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/gogomap_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update

# Seguridad JWT
JWT_SECRET=tu_clave_secreta_de_al_menos_32_caracteres
JWT_EXPIRATION_MINUTES=1440
🌐 Endpoints Principales
Autenticación (/api/auth)
POST /api/auth/register (Público): Registro de usuario con encriptación.

POST /api/auth/login (Público): Autenticación y generación de token JWT.

Usuarios (/api/v1/users)
GET /api/v1/users/me (Protegido): Perfil del usuario autenticado vía JWT.

Puntos del Mapa (/api/v1/points)
GET /api/v1/points (Público): Listado optimizado. Incluye ods (nombre) y odsNumber (ID numérico) para filtrado eficiente en el frontend.

GET /api/v1/points/{id} (Público): Detalle completo del punto.

🌱 Inicialización de Datos (Data Seeding)
Sistema resiliente de carga masiva de GeoJSON:

Mapeo ODS: Integración avanzada en el Enum Ods con conversión bidireccional (fromNumber) para facilitar la carga desde datos externos.

Safe-Insert: Identificación única por coordenada para evitar duplicados.

Tolerancia a fallos: Procesamiento aislado por archivo para garantizar la integridad de la base de datos.