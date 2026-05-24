🌍 GoGoMap - Backend API
API RESTful desarrollada para el proyecto GoGoMap, encargada de gestionar los puntos de interés geolocalizados (ODS) y la autenticación de usuarios. Diseñada bajo principios de Clean Code, separación por capas (DTOs) y alta resiliencia en la ingesta de datos.

🛠️ Stack Tecnológico
Lenguaje: Java 21

Framework Core: Spring Boot 3

Base de Datos: MySQL & Spring Data JPA (Hibernate)

Seguridad: Spring Security + OAuth2 Resource Server (JWT)

Mapeo de Objetos: MapStruct (conversión robusta Entidad ↔ DTO)

Utilidades: Lombok, Spring Boot DevTools

🛡️ Seguridad y Arquitectura Destacada
El backend implementa estándares modernos de seguridad y buenas prácticas de arquitectura:

Autenticación Stateless: Gestión de sesiones mediante JWT (JSON Web Tokens) firmados criptográficamente (HS256).

Protección de Credenciales: Contraseñas encriptadas en base de datos utilizando el algoritmo BCrypt.

Aislamiento de Dominio: Uso estricto de DTOs (LoginRequest, MapPointResponseDTO, etc.) para evitar la exposición de entidades de base de datos e información sensible al frontend.

CORS Optimizado: Configuración nativa para integración segura con el frontend, incluyendo caché maxAge para peticiones pre-flight (OPTIONS), mejorando el rendimiento de red.

⚙️ Configuración y Variables de Entorno
Antes de arrancar, asegúrate de tener:

JDK 21 instalado y configurado.

MySQL Server en ejecución.

Crear un archivo application.properties (o configurar variables de entorno) en src/main/resources/ con las siguientes claves:

Properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/gogomap_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update

# Seguridad JWT
JWT_SECRET=tu_clave_secreta_de_al_menos_32_caracteres_para_hs256
JWT_EXPIRATION_MINUTES=1440
🚀 Cómo arrancar el backend en local
Clona el repositorio.

Crea la base de datos gogomap_db en tu servidor MySQL local.

Abre el proyecto en tu IDE (IntelliJ IDEA recomendado).

Refresca las dependencias de Maven.

Ejecuta la clase principal BackendGoGoMapApplication.java.

El servidor estará escuchando en http://localhost:8080.

🌐 Endpoints de la API
La API separa claramente los recursos públicos de los protegidos mediante control de roles y tokens Bearer.

Autenticación y Usuarios (/api/auth & /api/users)
POST /api/auth/register (Público): Registra un nuevo usuario encriptando su contraseña.

POST /api/auth/login (Público): Valida credenciales y devuelve el token JWT.

GET /api/users/me (Protegido): Retorna el perfil completo del usuario autenticado actual.

Puntos del Mapa (/api/v1/points)
GET / (Público): Carga inicial del mapa. Retorna un array optimizado de MapPointResponseDTO (exclusivamente id, title, latitude y longitude).

GET /{id} (Público): Vista de detalle. Retorna un MapPointDetailResponseDTO con información extendida (dirección, descripción, estado, ODS, y autor).

(Futuro) POST /, PUT /{id}, DELETE /{id} (Protegidos): Requieren token JWT válido para gestionar puntos en el mapa.

🌱 Inicialización de Datos Masiva (Data Seeding)
El proyecto cuenta con un sistema avanzado y resiliente de carga automática de datos geográficos (Open Data) para poblar la base de datos al arrancar.

GeoJsonDataLoader: Un componente escanea automáticamente src/main/resources/data/ en busca de archivos ods*.geojson en el arranque de la aplicación.

Extracción Inteligente: Detecta el número de ODS desde el nombre del archivo mediante Regex y mapea propiedades con nombres inconsistentes de forma segura (@JsonAlias).

Actualización Condicional (Safe-Insert): Crea una huella digital única (Latitud_Longitud_OdsId) e inserta únicamente los puntos nuevos. Esto garantiza que no se sobrescriban modificaciones hechas previamente por los usuarios en la base de datos.

Tolerancia a Fallos: Manejo de excepciones aislado por archivo. Si un documento está corrupto, notifica el error pero continúa procesando el resto de ODS, asignando títulos genéricos automáticos si faltan propiedades.