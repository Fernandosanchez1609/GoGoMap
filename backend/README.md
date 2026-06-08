# GoGoMap Backend API

<div align="center">

**API RESTful de Alto Rendimiento para Localización de Puntos ODS**

[![Java](https://img.shields.io/badge/Java-21-orange?logo=java)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.14-green?logo=spring-boot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue?logo=mysql)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Inicio Rápido](#-guía-de-inicio-rápido) • [Endpoints](#-endpoints-de-api) • [Arquitectura](#-arquitectura) • [Desarrollo](#-guía-de-desarrollo) • [Deploy](#-deployment)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos](#-requisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Endpoints de API](#-endpoints-de-api)
- [Autenticación](#-autenticación)
- [Manejo de Errores](#-manejo-de-errores)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Deployment](#-deployment)

---

## 📖 Descripción

Backend API de GoGoMap desarrollado con **Spring Boot 3** y arquitectura en capas. Gestiona:

- 🗺️ **Gestión de Puntos**: Localización y información de puntos de interés ODS
- 👥 **Autenticación**: Registro, login y manejo de sesiones con JWT
- ❤️ **Favoritos**: Gestión de puntos favoritos por usuario
- 🎮 **Gamificación**: Sistema de karma, logros, ruleta diaria y recompensas
- 📊 **Ranking**: Clasificación de usuarios por karma points
- 🔐 **Autorización**: Control granular de acceso mediante Spring Security

### Principios Arquitectónicos

- **Clean Architecture**: Separación clara de responsabilidades
- **DTO Pattern**: Mapeo entre entidades y DTOs con MapStruct
- **Exception Handling**: Manejo global de errores con ResponseEntity
- **Security First**: JWT, BCrypt y OAuth2 Resource Server
- **Database**: MySQL 8 con Hibernate ORM y migrations

---

## 🛠️ Stack Tecnológico

| Capa | Componente | Versión |
|:-----|:-----------|:--------|
| **Core** | Java | 21 |
| **Framework** | Spring Boot | 3.5.14 |
| **Web** | Spring Web MVC | 3.5.14 |
| **Seguridad** | Spring Security | 3.5.14 |
| | OAuth2 Resource Server | 3.5.14 |
| **Datos** | Spring Data JPA | 3.5.14 |
| | Hibernate | 6.4+ |
| **Base de Datos** | MySQL Connector Java | 8.0+ |
| **Mapeo** | MapStruct | 1.5.5.Final |
| **Utilidades** | Lombok | 1.18+ |
| | Spring Boot DevTools | 3.5.14 |
| **Build** | Maven | 3.8+ |

---

## 📋 Requisitos

### Requisitos Previos del Sistema

- ✅ **Java Development Kit (JDK)** 21 o superior
  ```bash
  java -version  # Verifica tu versión actual
  ```
- ✅ **MySQL Server** 8.0 o superior con puerto 3306 disponible
  ```bash
  mysql --version  # Verifica tu versión
  ```
- ✅ **Maven** 3.8.0 o superior
  ```bash
  mvn --version  # Verifica tu instalación
  ```
- ✅ **Git** (opcional, para clonar el repo)

---

## 🚀 Instalación y Configuración

### Paso 1: Preparar la Base de Datos

Abre tu cliente MySQL o consola y ejecuta:

```sql
CREATE DATABASE gogomap_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

SHOW DATABASES;  -- Verifica que se creó correctamente
```

**Alternativa con Docker** (opcional):

```bash
docker run --name gogomap_mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=gogomap_db \
  -p 3306:3306 \
  -d mysql:8.0
```

### Paso 2: Configurar Variables de Entorno

Las variables de entorno **deben establecerse antes de ejecutar** el backend. Pueden configurarse de varias formas:

#### Opción A: Variables del Sistema (Windows)
```powershell
[System.Environment]::SetEnvironmentVariable("DB_URL", "jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC", "User")
[System.Environment]::SetEnvironmentVariable("DB_USERNAME", "root", "User")
[System.Environment]::SetEnvironmentVariable("DB_PASSWORD", "tu_password", "User")
[System.Environment]::SetEnvironmentVariable("JWT_SECRET", "tu_clave_de_32_caracteres_minimo", "User")
[System.Environment]::SetEnvironmentVariable("JWT_EXPIRATION_MINUTES", "1440", "User")
```

#### Opción B: Variables del Sistema (Linux/macOS)
```bash
export DB_URL="jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC"
export DB_USERNAME="root"
export DB_PASSWORD="tu_password"
export JWT_SECRET="tu_clave_de_32_caracteres_minimo"
export JWT_EXPIRATION_MINUTES="1440"
```

#### Opción C: Configuración en IDE (IntelliJ IDEA)
1. Run → Edit Configurations
2. Environment variables → Añade tus variables
3. Aplica y ejecuta

#### Opción D: application.properties (SOLO desarrollo local)
Edita `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_password
app.jwt.secret=tu_clave_de_32_caracteres_minimo
app.jwt.expiration-minutes=1440
```

### Referencia de Variables de Entorno

| Variable | Descripción | Ejemplo | Requerida |
|:---------|:-----------|:---------|:----------|
| `DB_URL` | URL de conexión MySQL | `jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC` | ✅ |
| `DB_USERNAME` | Usuario MySQL | `root` | ✅ |
| `DB_PASSWORD` | Contraseña MySQL | `contraseña_segura` | ✅ |
| `JWT_SECRET` | Clave para firmar tokens (min. 32 caracteres) | `clave_super_secreta_minimo_32_caracteres` | ✅ |
| `JWT_EXPIRATION_MINUTES` | Duración de tokens en minutos | `1440` (24 horas) | ⚠️ (Default: 1440) |

### Paso 3: Descargar Dependencias

```bash
cd backend
mvn clean install
```

Este comando:
- ✅ Descarga todas las dependencias Maven
- ✅ Compila el código
- ✅ Ejecuta tests (si los hay)

### Paso 4: Ejecutar la Aplicación

#### Opción A: Con Maven (Recomendado)
```bash
mvn spring-boot:run
```

#### Opción B: Con el Wrapper incluido
```bash
./mvnw spring-boot:run        # Linux/macOS
mvnw.cmd spring-boot:run      # Windows
```

#### Opción C: Compilar y ejecutar JAR
```bash
mvn clean package
java -jar target/backend-GoGoMap-0.0.1-SNAPSHOT.jar
```

### Verificación de Inicio Correcto

Si ves en la consola:

```
o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path ''
o.s.b.StartupInfoLogger              : Started BackendGoGoMapApplication in X.XXX seconds
```

✅ **El servidor está corriendo en `http://localhost:8080`**

---

## 📁 Estructura del Proyecto

```
backend/
├── src/main/java/com/esplai/backendgogomap/
│   ├── BackendGoGoMapApplication.java     # Clase principal Spring Boot
│   │
│   ├── auth/                              # Módulo de Autenticación
│   │   ├── controller/                    # AuthController
│   │   ├── dto/                           # DTOs de autenticación
│   │   ├── service/                       # Lógica de JWT y seguridad
│   │   └── exception/                     # Excepciones de auth
│   │
│   ├── controllers/                       # Controladores REST
│   │   ├── MapPointController.java        # Endpoints de puntos
│   │   └── UserController.java            # Endpoints de usuarios
│   │
│   ├── services/                          # Lógica de Negocio
│   │   ├── MapPointService.java
│   │   ├── UserService.java
│   │   ├── WheelSpinService.java
│   │   ├── FavoriteService.java
│   │   └── AchievementService.java
│   │
│   ├── repositories/                      # Acceso a Datos (JPA)
│   │   ├── MapPointRepository.java
│   │   ├── UserRepository.java
│   │   ├── FavoriteRepository.java
│   │   └── WheelSpinRepository.java
│   │
│   ├── models/                            # Entidades JPA
│   │   ├── User.java
│   │   ├── MapPoint.java
│   │   ├── Favorite.java
│   │   ├── WheelSpin.java
│   │   ├── Achievement.java
│   │   └── Reward.java
│   │
│   ├── mappers/                           # MapStruct Mappers
│   │   ├── UserMapper.java
│   │   ├── MapPointMapper.java
│   │   └── WheelSpinMapper.java
│   │
│   ├── exceptions/                        # Gestión de Errores
│   │   ├── GlobalExceptionHandler.java
│   │   ├── ResourceNotFoundException.java
│   │   └── UnauthorizedException.java
│   │
│   └── config/                            # Configuración
│       ├── SecurityConfig.java            # Spring Security
│       ├── JwtConfig.java                 # JWT Configuration
│       └── CorsConfig.java                # CORS
│
├── src/main/resources/
│   ├── application.properties              # Configuración de la app
│   └── data/                               # Datasets GeoJSON (17 ODS)
│       ├── ods1_centros_sociales.geojson
│       ├── ods2_comedores_sociales.geojson
│       └── ... (15 archivos más de ODS)
│
├── pom.xml                                 # Configuración Maven
├── mvnw / mvnw.cmd                         # Maven Wrapper
└── README.md                               # Este archivo
```

---

## 🔌 Endpoints de API

### Base URL
```
http://localhost:8080/api/v1
```

### Autenticación

#### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura",
  "nombre": "Juan",
  "apellidos": "García López"
}
```

**Response: 201 Created**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "nombre": "Juan",
    "apellidos": "García López"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura"
}
```

**Response: 200 OK**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "nombre": "Juan",
    "apellidos": "García López"
  }
}
```

### Puntos de Interés

#### Obtener todos los puntos
```http
GET /points
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "nombre": "Centro Social La Triana",
    "descripcion": "Centro de recursos comunitarios",
    "odsNumber": 1,
    "latitude": 36.7194,
    "longitude": -4.4194,
    "direccion": "Calle Manuel Irujo, 41, Málaga"
  }
]
```

#### Obtener detalle de un punto
```http
GET /points/{id}
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "id": 1,
  "nombre": "Centro Social La Triana",
  "descripcion": "Centro de recursos comunitarios",
  "odsNumber": 1,
  "latitude": 36.7194,
  "longitude": -4.4194,
  "direccion": "Calle Manuel Irujo, 41, Málaga",
  "horario": "09:00-17:00",
  "telefono": "+34 952 221 234"
}
```

### Usuarios

#### Obtener perfil actual
```http
GET /users/me
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "nombre": "Juan",
  "apellidos": "García López",
  "karmaPoints": 350,
  "nivel": 5,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Actualizar perfil
```http
PUT /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "apellidos": "García López"
}
```

#### Obtener ranking de usuarios
```http
GET /users/ranking
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
[
  {
    "rank": 1,
    "userId": 5,
    "nombre": "María",
    "karmaPoints": 2850,
    "nivel": 15
  },
  {
    "rank": 2,
    "userId": 1,
    "nombre": "Juan",
    "karmaPoints": 350,
    "nivel": 5
  }
]
```

### Favoritos

#### Añadir a favoritos
```http
POST /users/me/favorites/{pointId}
Authorization: Bearer {token}
```

**Response: 201 Created**
```json
{
  "success": true,
  "message": "Punto añadido a favoritos"
}
```

#### Obtener favoritos
```http
GET /users/me/favorites
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "nombre": "Centro Social La Triana",
    "odsNumber": 1,
    "latitude": 36.7194,
    "longitude": -4.4194
  }
]
```

#### Eliminar de favoritos
```http
DELETE /users/me/favorites/{pointId}
Authorization: Bearer {token}
```

**Response: 204 No Content**

### Ruleta Diaria

#### Obtener estado de la ruleta
```http
GET /users/me/wheel-spin/status
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "hasSpunToday": false,
  "nextSpinAt": "2024-12-09T00:00:00Z"
}
```

#### Girar la ruleta
```http
POST /users/me/wheel-spin
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "slotIndex": 5,
  "multiplier": "X5",
  "karmaEarned": 50,
  "totalKarma": 400,
  "message": "¡Excelente! Ganaste 250 puntos karma"
}
```

### Logros y Recompensas

#### Obtener logros
```http
GET /users/me/achievements
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "nombre": "Primer Paso",
    "descripcion": "Marca tu primer favorito",
    "unlockedAt": "2024-01-20T15:30:00Z"
  }
]
```

#### Obtener recompensas disponibles
```http
GET /users/me/rewards
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "nombre": "Badge Sostenible",
    "descripcion": "Distintivo de usuario comprometido",
    "cost": 500,
    "available": true
  }
]
```

#### Comprar recompensa
```http
POST /users/me/rewards/{rewardId}/buy
Authorization: Bearer {token}
```

**Response: 200 OK**
```json
{
  "success": true,
  "message": "Recompensa adquirida",
  "karmaRemaining": 150
}
```

---

## 🔐 Autenticación

### Flujo de Autenticación con JWT

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │ 1. POST /auth/login
       ├─────────────────────────────────────┐
       │                                     ▼
       │                          ┌──────────────────┐
       │                          │ AuthController  │
       │                          └────────┬─────────┘
       │                                   │ 2. Validar credenciales
       │                                   ▼
       │                          ┌──────────────────┐
       │                          │ AuthService      │
       │                          │ JWT Generation   │
       │                          └────────┬─────────┘
       │                                   │ 3. Generar token
       │  ◀─────────────────────────────────┤
       │ Token + RefreshToken               │
       │
       │ 4. Guardar token localmente
       │
       │ 5. GET /users/me
       │ Authorization: Bearer {token}
       ├─────────────────────────────────────┐
       │                                     ▼
       │                          ┌──────────────────┐
       │                          │ JWT Filter       │
       │                          │ Validación       │
       │                          └────────┬─────────┘
       │                                   │ 6. Verificar y decodificar
       │                                   ▼
       │                          ┌──────────────────┐
       │                          │ UserController   │
       │                          │ getPrincipal()   │
       │                          └────────┬─────────┘
       │                                   │ 7. Retornar user data
       │  ◀─────────────────────────────────┤
       │ User Profile                       │
```

### Tokens

- **Access Token**: Duración configurable (default: 24 horas)
- **Refresh Token**: Duración extendida para renovación
- **Algoritmo**: HS256 (HMAC with SHA-256)
- **Claims**: `sub` (userId), `iat`, `exp`, `email`

### Seguridad

- ✅ Contraseñas hasheadas con **BCrypt**
- ✅ Tokens firmados con clave privada
- ✅ CORS configurado
- ✅ CSRF protection (automático en Spring Security)

---

## ⚠️ Manejo de Errores

### Códigos de Estado HTTP

| Código | Significado |
|:-------|:-----------|
| **200** | OK - Solicitud exitosa |
| **201** | Created - Recurso creado |
| **204** | No Content - Éxito sin contenido |
| **400** | Bad Request - Datos inválidos |
| **401** | Unauthorized - Falta autenticación |
| **403** | Forbidden - No autorizado para este recurso |
| **404** | Not Found - Recurso no encontrado |
| **409** | Conflict - El recurso ya existe |
| **500** | Internal Server Error - Error del servidor |

### Formato de Errores

```json
{
  "status": 400,
  "message": "Validación fallida",
  "errors": [
    {
      "field": "email",
      "message": "El email ya está registrado"
    }
  ],
  "timestamp": "2024-12-08T12:34:56Z"
}
```

---

## 🛠️ Guía de Desarrollo

### Crear un Nuevo Endpoint

1. **Crear DTO** (`auth/dto/MiRequestDTO.java`):
```java
public record MiRequestDTO(
    String campo1,
    Integer campo2
) {}
```

2. **Crear Entidad** (`models/MiEntidad.java`):
```java
@Entity
@Table(name = "mi_tabla")
public class MiEntidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // campos...
}
```

3. **Crear Repository** (`repositories/MiRepository.java`):
```java
@Repository
public interface MiRepository extends JpaRepository<MiEntidad, Long> {
    Optional<MiEntidad> findByNombre(String nombre);
}
```

4. **Crear Service** (`services/MiService.java`):
```java
@Service
@RequiredArgsConstructor
public class MiService {
    private final MiRepository repository;
    
    public MiEntidad crearObjeto(MiRequestDTO dto) {
        // Lógica de negocio
    }
}
```

5. **Crear Controller** (`controllers/MiController.java`):
```java
@RestController
@RequestMapping("/api/v1/mi-recurso")
@RequiredArgsConstructor
public class MiController {
    private final MiService service;
    
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MiResponseDTO> crear(
        @Valid @RequestBody MiRequestDTO dto,
        @AuthenticationPrincipal UserDetails user
    ) {
        return ResponseEntity.ok(service.crearObjeto(dto));
    }
}
```

### Convenciones de Código

- **Nomenclatura**: camelCase para variables, UPPER_CASE para constantes
- **JavaDoc**: Documentar métodos públicos
- **Anotaciones**: Usar `@RequiredArgsConstructor` de Lombok
- **Transacciones**: `@Transactional` en servicios que modifican datos
- **Validación**: Usar `@Valid` y Bean Validation (`@NotNull`, etc.)

### Testing (Recomendado)

```java
@SpringBootTest
class MiServiceTest {
    @MockBean
    private MiRepository repository;
    
    @InjectMocks
    private MiService service;
    
    @Test
    void testCrearObjeto() {
        // Arrange
        MiRequestDTO dto = new MiRequestDTO("valor1", 42);
        
        // Act
        MiEntidad resultado = service.crearObjeto(dto);
        
        // Assert
        assertNotNull(resultado);
    }
}
```

---

## 📦 Deployment

### Build de Producción

```bash
mvn clean package -DskipTests
```

Esto genera: `target/backend-GoGoMap-0.0.1-SNAPSHOT.jar`

### Ejecución en Producción

```bash
java -jar backend-GoGoMap-0.0.1-SNAPSHOT.jar \
  -Dspring.profiles.active=prod \
  -Dspring.datasource.url=jdbc:mysql://prod-db:3306/gogomap_db \
  -Dspring.datasource.username=${DB_USER} \
  -Dspring.datasource.password=${DB_PASS}
```

### Docker (Opcional)

```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/backend-GoGoMap-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t gogomaps-backend .
docker run -e DB_URL=... -e DB_USERNAME=... -e DB_PASSWORD=... -e JWT_SECRET=... -p 8080:8080 gogomaps-backend
```

---

## 📚 Referencias

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MapStruct Documentation](https://mapstruct.org/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 🐛 Troubleshooting

### El servidor no inicia
- ✅ Verifica que MySQL está corriendo
- ✅ Comprueba que las variables de entorno están configuradas
- ✅ Revisa los logs para mensajes de error

### Error de conexión a BD
```
Connection refused: connect
```
- ✅ Asegúrate que MySQL está activo: `mysql -u root -p`
- ✅ Verifica la URL de conexión en `DB_URL`

### JWT Token inválido
- ✅ Regenera el token iniciando sesión nuevamente
- ✅ Verifica que `JWT_SECRET` es el mismo en desarrollo y producción

---

<div align="center">

**Desarrollado con ❤️ por el equipo de GoGoMap**

[↑ Volver arriba](#gogomaps-backend-api)

</div>

> **Nota:** Si no configuras estas variables en local, Spring Boot usará valores por defecto definidos en `application.properties` para evitar que la app explote durante el desarrollo rápido.

### 4. Arrancar la Aplicación

Desde la raíz del proyecto, ejecuta:

```bash
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`.

---

## 📘 Swagger / OpenAPI

Para consultar y probar la API de forma interactiva, tienes disponible la documentación de **Swagger**.

### Botón de acceso rápido

[![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=000000)](http://localhost:8080/swagger-ui/index.html)

### ¿Cómo se usa?

- Abre Swagger en tu navegador desde `http://localhost:8080/swagger-ui/index.html`.
- Revisa los endpoints disponibles, sus parámetros y las respuestas documentadas.
- Si quieres probar rutas protegidas, primero haz login en `/api/auth/login` para obtener el token JWT.
- Después pulsa en **Authorize** y pega el token con el formato `Bearer <tu_token>` para ejecutar peticiones autenticadas.
- Swagger también te permite ver los códigos de error y el modelo de respuesta `ApiErrorResponse` cuando algo falla.

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