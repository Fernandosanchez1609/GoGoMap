# 🌍 GoGoMap - Backend API

API RESTful de alto rendimiento desarrollada para el proyecto **GoGoMap**. Está encargada de gestionar los puntos de interés geolocalizados (centrados en los Objetivos de Desarrollo Sostenible - ODS) en la ciudad de Málaga, la autenticación segura de usuarios y la gestión de favoritos.

Diseñada bajo principios de **Clean Architecture**, separación por capas (DTO Pattern) y un manejo de errores global unificado.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
| :--- | :--- |
| **Core** | Java 21, Spring Boot 3 |
| **Base de Datos** | MySQL 8+, Spring Data JPA (Hibernate) |
| **Seguridad** | Spring Security, OAuth2 Resource Server (JWT), BCrypt |
| **Mapeo de Objetos** | MapStruct |
| **Utilidades** | Lombok, Spring Boot DevTools, Maven |

---

## 🚀 Guía de Inicio Rápido (Setup)

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Requisitos Previos

- **Java 21** instalado en tu sistema.
- **MySQL** (versión 8.0 o superior) corriendo en el puerto `3306`.
- **Maven** (o usar el Wrapper `./mvnw` incluido en el proyecto).

### 2. Preparar la Base de Datos

Abre tu cliente de MySQL (Workbench, DBeaver, etc.) o la terminal y ejecuta:

```sql
CREATE DATABASE gogomap_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Variables de Entorno y Secretos

El proyecto está securizado y no expone contraseñas en el código. Debes configurar las siguientes variables de entorno en tu sistema o en la configuración de ejecución de tu IDE (ej. IntelliJ IDEA):

| Variable | Descripción | Valor de ejemplo |
| :--- | :--- | :--- |
| `DB_URL` | Ruta de conexión a MySQL | `jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC` |
| `DB_USERNAME` | Tu usuario de MySQL | `root` |
| `DB_PASSWORD` | Tu contraseña de MySQL | `tu_password_segura` |
| `JWT_SECRET` | Clave para firmar tokens (Mínimo 32 caracteres) | `mi_clave_super_secreta_para_gogomap_2026` |
| `JWT_EXPIRATION_MINUTES` | Tiempo de vida del token en minutos | `1440` (24 horas) |

> **Nota:** Si no configuras estas variables en local, Spring Boot usará valores por defecto definidos en `application.properties` para evitar que la app explote durante el desarrollo rápido.

### 4. Arrancar la Aplicación

Desde la raíz del proyecto, ejecuta:

```bash
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`.

---

## 🏗️ Arquitectura y Entidades Principales

El dominio de la aplicación se divide principalmente en dos grandes bloques:

- **Usuarios (`User`):** Gestiona la identidad, el sistema de Karma, y mantiene una relación de "Favoritos" (Many-to-Many) con los puntos del mapa.
- **Puntos de Mapa (`MapPoint`):** Almacena las coordenadas (Lat/Lon), dirección y metadatos de los puntos de interés, categorizados mediante un avanzado sistema de Enum bidireccional para los ODS.

---

## 🛡️ Seguridad y Manejo de Errores

- **Autenticación Stateless:** Gestión de sesiones mediante JWT (HS256) validado a través de `JwtAuthenticationConverter`.
- **CORS Optimizado:** Configuración granular para integración segura con el Frontend (Vite/React/Angular), permitiendo cabeceras `Authorization` y optimizando las peticiones pre-flight.
- **Manejo Global de Excepciones (`@RestControllerAdvice`):** La API **NUNCA** devuelve trazas de Java. Todos los errores (`400`, `401`, `404`, `409`, `500`) son interceptados y devueltos en un formato JSON estándar predecible para el frontend:

```json
{
    "timestamp": "2026-05-26T19:52:56.007",
    "status": 404,
    "error": "Not Found",
    "message": "Punto de Mapa no encontrado con identificador: '99999'",
    "path": "/api/v1/users/me/favorites/99999"
}
```

---

## 🌐 Referencia de Endpoints (API)

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Crea un usuario. Lanza `409` si el email ya existe. | Público |
| `POST` | `/api/auth/login` | Valida credenciales y devuelve el Token JWT. | Público |

### 👤 Usuarios y Favoritos (`/api/v1/users`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/me` | Obtiene el perfil completo del usuario autenticado. | Protegido |
| `GET` | `/api/v1/users/me/favorites` | Lista los puntos guardados en favoritos. | Protegido |
| `POST` | `/api/v1/users/me/favorites/{id}` | Añade un MapPoint a la lista de favoritos. | Protegido |
| `DELETE` | `/api/v1/users/me/favorites/{id}` | Elimina un MapPoint de los favoritos. | Protegido |

### 📍 Puntos del Mapa (`/api/v1/points`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/points` | Listado general. Incluye categoría ODS para filtrado. | Público |
| `GET` | `/api/v1/points/{id}` | Detalle completo de un punto específico. | Público |

---

## 🌱 Inicialización de Datos (Data Seeding)

Para poblar la base de datos de Málaga con datos reales sin esfuerzo, el backend cuenta con un sistema de carga masiva en el arranque:

- **Procesamiento de GeoJSON:** Escanea dinámicamente `src/main/resources/data/` buscando archivos de la Junta de Andalucía / Ayuntamiento.
- **Mapeo Inteligente:** Utiliza el Enum `Ods` (`fromNumber`) para traducir categorías externas.
- **Safe-Insert & Tolerancia a fallos:** Identifica duplicados por coordenadas. Si un archivo está corrupto, lo salta, lo reporta en los logs y continúa con el resto de la carga asegurando la alta disponibilidad del servicio.