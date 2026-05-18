# 🌿 GoGoMap — Frontend

> **No. 1 in Spain for passing karma** 🌍  
> Aplicación web y móvil para localizar puntos relacionados con los Objetivos de Desarrollo Sostenible (ODS) en la ciudad de Málaga.

---

## 📋 Índice

- [Descripción](#descripción)
- [Pantallas](#pantallas)
- [Design System](#design-system)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Tecnologías](#tecnologías)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Descripción

GoGoMap permite a los ciudadanos de Málaga descubrir puntos de interés vinculados a los 17 ODS de Naciones Unidas. A partir de la geolocalización del usuario, la app muestra los puntos más cercanos según el ODS seleccionado y genera una ruta para llegar a ellos.

**Funcionalidades principales:**

- Geolocalización del usuario en tiempo real
- Mapa interactivo con puntos ODS categorizados
- Filtrado por tipo de ODS
- Detalle de cada punto con distancia, estado y galería de imágenes
- Generación de ruta hasta el punto seleccionado
- Sistema de favoritos
- Perfil de usuario con Eco Points (gamificación)
- Registro e inicio de sesión

---
![alt text](<Captura de pantalla 2026-05-18 190001.png>)
## Pantallas

El proyecto cuenta con las siguientes vistas implementadas:

### 🔐 Login (`/login`)
Pantalla de bienvenida con formulario de acceso. Incluye campos de usuario y contraseña, enlace a registro y acceso al soporte. El tagline principal es **"No. 1 in Spain for passing karma :)"**.

### 🗺️ Mapa principal (`/map`)
Vista central de la aplicación. Muestra el mapa de Málaga con los puntos ODS geolocalizados. Incluye:
- Barra superior con logo, iconos de búsqueda y perfil
- Filtros rápidos de ODS en fila horizontal (con iconos por objetivo)
- Panel inferior con la lista de **"Puntos cercanos"**
- Navegación inferior: Mapa / Favoritos / Perfil

### 📍 Detalle de punto (`/point/:id`)
Modal o vista de detalle al seleccionar un punto ODS. Muestra:
- Nombre y categoría ODS (ej. *ODS 1 — Cargador de coche*)
- Dirección (ej. *Avda. Andalucía, 5*)
- Estado: **Funcionando** / No disponible
- Distancia en metros
- Galería de imágenes del punto
- Botones de acción: **Reportar** y **Ruta**

### 📝 Registro (`/register`)
Formulario de creación de cuenta con los campos: nombre, apellidos, nombre de usuario, email, contraseña y confirmación de contraseña. Botón de **Enviar** y enlace de vuelta al login. Branding GoGoMap en cabecera.

### 👤 Perfil de usuario (`/profile`)
Vista del perfil del usuario autenticado. Incluye:
- Avatar con inicial del nombre
- Nombre completo y fecha de registro (ej. *Miembro desde Enero 2024*)
- Contador de **Eco Points** con impacto total (ej. *50 Eco Points*)
- Nombre completo y email
- Botón de **Cerrar Sesión**

### ⭐ Favoritos (`/favorites`)
Lista de puntos guardados por el usuario, con pestañas de filtrado (ej. *Todos / Puntos Agua / ...*). Cada item muestra imagen en miniatura, nombre del punto, dirección y categoría ODS.

### ❌ Error 404 (`/*`)
Página de error para rutas no encontradas. Mensaje: **"¡UPS! PÁGINA NO ENCONTRADA — Parece que este punto no está en el mapa."** con botón de **Volver al mapa**.

### ⚠️ Error general (`/error`)
Página de error genérico. Mensaje: **"¡HUBO UN ERROR! — Parece que algo salió mal. Inténtalo de nuevo."** con botones de **Reintentar** y **Volver**.

---

## Design System

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#2B5E2B` (verde oscuro) | Color principal, botones CTA, énfasis |
| `secondary` | `#1F1F2E` (negro/gris oscuro) | Fondos oscuros, texto sobre claro |
| `body` | `#F5F5F5` (blanco roto) | Fondo general de la app |
| `accent` | `#C4185C` (magenta/rosa) | Acciones secundarias, alertas, Eco Points |
| `neutral` | `#2D2D2D` (gris oscuro) | Texto principal, iconos |

### Tipografía

El proyecto utiliza una única familia tipográfica sans-serif en tres pesos:

| Peso | Uso |
|---|---|
| **Regular** | Texto de cuerpo, etiquetas, descripciones |
| **Medium** | Subtítulos, nombres de puntos, metadatos |
| **Bold** | Títulos, botones, contadores, valores destacados |

El tamaño base es de **16px** con escala modular para headings.

### Componentes principales

#### Botones

```
[Primary]   Fondo verde oscuro (#2B5E2B), texto blanco, border-radius redondeado
[Secondary] Borde verde oscuro, fondo transparente, texto verde
[Danger]    Fondo magenta/rosa (#C4185C), texto blanco — usado en Cerrar Sesión
[Ghost]     Sin borde ni fondo, solo texto — usado en acciones terciarias
```

#### Iconos de ODS

Cada ODS se representa con su icono oficial de Naciones Unidas en español. Los iconos se muestran en la barra de filtros del mapa y en las tarjetas de detalle.

Para descargar los iconos oficiales en español:
👉 [https://www.un.org/sustainabledevelopment/es/news/communications-material/](https://www.un.org/sustainabledevelopment/es/news/communications-material/)

> ⚠️ El uso de los iconos ODS requiere incluir el siguiente texto en la app:  
> *"El contenido de esta publicación no ha sido aprobado por las Naciones Unidas y no refleja las opiniones de las Naciones Unidas ni de sus funcionarios o Estados Miembros"*

#### Tarjeta de punto ODS

```
┌─────────────────────────────┐
│  [Imagen]  Nombre del punto │
│            ODS · Dirección  │
│            Estado · Distancia│
└─────────────────────────────┘
```

#### Badge de Eco Points

Componente de gamificación que muestra el impacto acumulado del usuario. Fondo verde oscuro, texto blanco, con icono de hoja.

```
┌──────────────────────────┐
│  TOTAL IMPACTO           │
│  🌿 50 Eco Points        │
└──────────────────────────┘
```

#### Navegación inferior (móvil)

Barra fija en la parte inferior con tres secciones:

```
[🗺️ Mapa]   [❤️ Favoritos]   [👤 Perfil]
```

---

## Estructura del proyecto

```
gogomap-frontend/
│
├── public/
│   ├── assets/
│   │   ├── icons/           # Iconos ODS oficiales en español (SVG)
│   │   └── images/          # Imágenes estáticas y logo
│   └── index.html
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Map/             # Componente de mapa interactivo
│   │   ├── ODSFilter/       # Barra de filtros por ODS
│   │   ├── PointCard/       # Tarjeta de punto ODS
│   │   ├── PointDetail/     # Modal de detalle de punto
│   │   ├── EcoPoints/       # Badge de gamificación
│   │   ├── Navbar/          # Navegación inferior
│   │   └── ui/              # Botones, inputs, badges genéricos
│   │
│   ├── pages/               # Vistas principales
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Map.jsx
│   │   ├── Favorites.jsx
│   │   ├── Profile.jsx
│   │   ├── Error404.jsx
│   │   └── ErrorGeneral.jsx
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useGeolocation.js
│   │   └── useNearbyPoints.js
│   │
│   ├── services/            # Llamadas a API
│   │   ├── api.js           # Configuración base (Axios / Fetch)
│   │   ├── auth.js          # Login, registro, sesión
│   │   └── points.js        # Puntos ODS, favoritos, rutas
│   │
│   ├── store/               # Estado global
│   ├── styles/              # Variables CSS / Tailwind config
│   │   └── tokens.css       # Design tokens (colores, tipografía)
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-org/gogomap-frontend.git
cd gogomap-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las claves de API del mapa y del backend

# 4. Arrancar en modo desarrollo
npm run dev
```

### Variables de entorno necesarias

```env
VITE_API_BASE_URL=https://api.gogomap.es
VITE_MAP_API_KEY=tu_clave_de_mapa
VITE_AYUNTAMIENTO_API_URL=https://datosabiertos.malaga.eu/api
```

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | React / Vue (por definir) |
| Estilos | Tailwind CSS o CSS Modules |
| Mapa | Leaflet.js / Mapbox GL / Google Maps API |
| Rutas | React Router v6 |
| Estado global | Zustand / Pinia |
| HTTP | Axios |
| Geolocalización | Web Geolocation API |
| Iconos | Iconos ODS oficiales ONU (español) |

---

## Contribución

1. Haz un fork del repositorio
2. Crea tu rama: `git checkout -b feature/nombre-de-la-feature`
3. Haz commit de tus cambios: `git commit -m 'feat: descripción del cambio'`
4. Sube la rama: `git push origin feature/nombre-de-la-feature`
5. Abre un Pull Request hacia `main`

Seguimos la convención de commits [Conventional Commits](https://www.conventionalcommits.org/es/).

---

## Licencia

© 2024 GoGoMap · Environmental Responsibility  
Proyecto académico desarrollado en la ciudad de Málaga.

---

> *El contenido de esta aplicación no ha sido aprobado por las Naciones Unidas y no refleja las opiniones de las Naciones Unidas ni de sus funcionarios o Estados Miembros.*  
> Iconos ODS: [Naciones Unidas — Materiales de comunicación](https://www.un.org/sustainabledevelopment/es/news/communications-material/)