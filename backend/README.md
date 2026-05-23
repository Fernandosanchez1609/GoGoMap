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

### 🚀 Inicialización de Datos Masiva (Data Seeding)

El proyecto cuenta con un sistema avanzado y resiliente de carga automática de datos geográficos (Open Data) para poblar la base de datos al arrancar, evitando inserciones manuales.

* **GeoJsonDataLoader:** El backend incluye un componente `CommandLineRunner` que escanea automáticamente la carpeta `src/main/resources/data/` en busca de múltiples archivos `ods*.geojson` en el arranque de la aplicación.
* **Extracción Inteligente:** El sistema detecta el número de ODS directamente desde el nombre del archivo mediante expresiones regulares y mapea propiedades con nombres inconsistentes de forma segura (gracias a anotaciones como `@JsonAlias`).
* **Actualización Condicional (Prevención de pérdida de datos):** El cargador crea una "huella digital" única combinando las coordenadas y el identificador ODS (`Latitud_Longitud_OdsId`). Compara los archivos físicos con la base de datos e **inserta únicamente los puntos nuevos**. Esto garantiza que no se sobrescriban ni se pierdan los datos históricos o modificaciones hechas previamente por los usuarios (ej. cambios de estado o autores de reportes).
* **Resiliencia y Tolerancia a Fallos:** El proceso cuenta con manejo de excepciones aislado por archivo. Si un documento está corrupto (ej. páginas de error camufladas como JSON), el sistema notifica el error por consola pero continúa procesando el resto de ODS con normalidad. También asigna títulos genéricos automáticamente a aquellos puntos de interés que no lo posean.

### 🌐 Endpoints de la API (MapPoints)

La comunicación con el frontend se realiza mediante DTOs para optimizar la carga de red y ocultar datos sensibles de auditoría.

* **`GET /api/v1/points`**
    * **Uso:** Carga inicial del mapa principal.
    * **Respuesta:** Retorna un array de `MapPointResponseDTO` optimizado (exclusivamente `id`, `title`, `latitude` y `longitude`).
* **`GET /api/v1/points/{id}`**
    * **Uso:** Vista de detalle al hacer clic en un pin del mapa.
    * **Respuesta:** Retorna un `MapPointDetailResponseDTO` con toda la información completa del punto (dirección, descripción, estado, identificador del ODS y autor del reporte).