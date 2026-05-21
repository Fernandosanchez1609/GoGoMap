## 🛠️ Stack Tecnológico (Backend)

Este proyecto utiliza las siguientes tecnologías y herramientas para el desarrollo del backend:

* **Lenguaje:** Java 21
* **Framework Principal:** Spring Boot (Starter Web, Validation)
* **Base de Datos:** MySQL
* **ORM y Acceso a Datos:** Spring Data JPA (Hibernate)
* **Seguridad:** Spring Security
* **Utilidades:** Lombok (para reducir el código repetitivo o *boilerplate*)
* **Herramientas de Desarrollo:** Spring Boot DevTools

### ⚙️ Requisitos previos del entorno
Para ejecutar este proyecto en local, asegúrate de tener configurado:
1.  **JDK 21** instalado en tu sistema y configurado en tu IDE (ej. IntelliJ IDEA con *Language Level* y *Target bytecode* en 21).
2.  **MySQL Server** en ejecución con una base de datos creada para el proyecto.
3.  **Maven** (integrado en el IDE o instalado localmente).

### 🚀 Inicialización de Datos (Data Seeding)

El proyecto cuenta con un sistema de carga automática para poblar la base de datos en el primer arranque, evitando inserciones manuales.

* **GeoJsonDataLoader:** El backend incluye un componente `CommandLineRunner` que se ejecuta al iniciar la aplicación. Este servicio localiza los archivos de datos en crudo (como `cargadores_malaga_4326.geojson`) ubicados en la carpeta `src/main/resources/data/`.
* **Comportamiento:** Si la tabla `map_points` está vacía, el sistema parsea el archivo GeoJSON utilizando Jackson y transforma las coordenadas y propiedades en entidades, guardándolas automáticamente en MySQL. Si la tabla ya contiene datos, la ingesta se omite de forma segura.

### 🌐 Endpoints de la API (MapPoints)

La comunicación con el frontend se realiza mediante DTOs para optimizar la carga de red y ocultar datos sensibles de auditoría.

* **`GET /api/v1/points`**
    * **Uso:** Carga inicial del mapa principal.
    * **Respuesta:** Retorna un array de `MapPointResponseDTO` optimizado (exclusivamente `id`, `title`, `latitude` y `longitude`).
* **`GET /api/v1/points/{id}`**
    * **Uso:** Vista de detalle al hacer clic en un pin del mapa.
    * **Respuesta:** Retorna un `MapPointDetailResponseDTO` con toda la información completa del punto (dirección, estado, identificador del ODS y autor del reporte).