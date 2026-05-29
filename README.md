# 🌿 GoGoMap — Frontend

> **No. 1 in Spain for passing karma** 🌍  
> Aplicación web y móvil para localizar puntos relacionados con los Objetivos de Desarrollo Sostenible (ODS) en la ciudad de Málaga.

---

## 📋 Índice

- [Descripción](#descripción)
- [Landing Page](#landing-page)
- [Páginas de error](#páginas-de-error)
- [Pantallas](#pantallas)
- [Design System](#design-system)
- [API Endpoints](#api-endpoints)
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
- Detalle de cada punto con distancia y estado
- Generación de ruta hasta el punto seleccionado
- Sistema de favoritos
- Perfil de usuario con Karma Points (gamificación)
- Registro e inicio de sesión

---

## Landing Page

La landing page es la pantalla de presentación de GoGoMap. Es lo primero que ve el usuario al acceder a la aplicación (`/landing`) y tiene como objetivo explicar las funcionalidades de la app y dirigir al usuario hacia el acceso.

### Ruta

```
/landing → GoGomapOnboarding
```

### Estructura de componentes

```
src/components/onboarding/
  GoGomapOnboarding.tsx     ← Componente raíz, ensambla todos los bloques
  components/
    Navbar.tsx              ← Barra de navegación fija con scroll effect
    Hero.tsx                ← Sección principal con CTA
    Features.tsx            ← 4 tarjetas de funcionalidades
    OdsShowcase.tsx         ← Chips con iconos oficiales ODS
    HowItWorks.tsx          ← 3 pasos de uso con CTA
    KarmaCallout.tsx        ← Sección de gamificación con CTA
    Footer.tsx              ← Pie de página con links
    Button.tsx              ← Componente de botón reutilizable
```

### Secciones

| Sección | Componente | Descripción |
|---|---|---|
| Navbar | `Navbar.tsx` | Fija en la parte superior, transparente al cargar y semiopaca al hacer scroll. Incluye logo y botón de acceso |
| Hero | `Hero.tsx` | Titular, subtítulo, badge con tagline, dos botones CTA y foto de Málaga con halo verde |
| Funcionalidades | `Features.tsx` | Cuatro tarjetas glassmorphism explicando las funciones principales de la app |
| ODS | `OdsShowcase.tsx` | Fila horizontal con los iconos oficiales de los 6 ODS más relevantes para Málaga |
| Cómo funciona | `HowItWorks.tsx` | Tres pasos conectados por una línea vertical explicando el flujo de uso |
| Karma | `KarmaCallout.tsx` | Tarjeta destacada con ejemplo de perfil de usuario, barra de progreso y Eco Points |
| Footer | `Footer.tsx` | Links de navegación interna y copyright |

### Diseño

- **Fondo:** degradado verde animado `from-[#1B6D24] via-[#6DBD6A] to-[#A3F69C]` con blobs, rejilla y partículas flotantes
- **Estilo de tarjetas:** glassmorphism (`bg-white/10 backdrop-blur-md border border-white/10`)
- **Botón primario:** glow verde (`bg-emerald-600` con `shadow` verde exterior)
- **Botón secundario:** glassmorphism (`bg-white/10 backdrop-blur-md border border-white/20`)
- **Iconos:** Lucide React
- **Tipografía:** Inter

### Componente Button

El componente `Button.tsx` es reutilizable en toda la landing. Acepta las siguientes props:

```tsx
interface ButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}
```

Uso:
```tsx
<Button label="Entrar a la App" href="/login" variant="primary" icon={<Leaf className="w-4 h-4" />} />
<Button label="¿Cómo funciona?" href="#how-it-works" variant="secondary" />
```

### Convención de estilos

La landing aplica un patrón de **extracción de clases** fuera del JSX, denominado **extraTailwind**. Todas las clases de Tailwind se definen como constantes con nombres descriptivos antes del componente, manteniendo el JSX limpio y legible:

```tsx
// ✅ Correcto
const section = "relative px-6 py-8 flex flex-col items-center gap-8"

export default function MiComponente() {
  return <section className={section}>...</section>
}

// ❌ Incorrecto
export default function MiComponente() {
  return <section className="relative px-6 py-8 flex flex-col items-center gap-8">...</section>
}
```

> ⚠️ Este patrón **extraTailwind** se aplica en todos los componentes del proyecto, no solo en la landing.

### Iconos ODS

Los iconos se cargan dinámicamente desde `public/assets/ods/` usando el formato oficial de Naciones Unidas:

```
S-WEB-Goal-01.png
S-WEB-Goal-06.png
...
```

La función helper `odsImg` construye la ruta automáticamente:

```tsx
function odsImg(num: number): string {
  const padded = String(num).padStart(2, '0')
  return `/assets/ods/S-WEB-Goal-${padded}.png`
}
```

---

## Páginas de error

El proyecto cuenta con dos páginas de error independientes que comparten el mismo estilo visual que el resto de la app (fondo `#F5F5EE`, colores verdes, tipografía oscura sobre fondo claro).

### Rutas

| Ruta | Componente raíz | Descripción |
|---|---|---|
| `/error` | `ErrorPage.tsx` | Error genérico con botones Reintentar y Volver |
| `/*` | `Error404Page.tsx` | Error 404 con botón Volver al Mapa |

### Estructura de componentes

```
src/components/error/
  ErrorPage.tsx           ← Componente raíz de error general, ensambla todos los bloques
  ErrorHeader.tsx         ← Cabecera con logo centrado, compartida entre ambas páginas
  ErrorImage.tsx          ← Imagen ilustrativa del error general
  ErrorImage404.tsx       ← Imagen ilustrativa del error 404
  ErrorText.tsx           ← Título en mayúsculas y subtítulo descriptivo
  ErrorActions.tsx        ← Botones Reintentar (recarga la página) y Volver (navigate(-1))
  ErrorActions404.tsx     ← Botón Volver al Mapa con icono SVG propio
  ErrorFooter.tsx         ← Footer simplificado, solo texto GoGoMap y copyright
```

### Imágenes

Las imágenes ilustrativas de cada página de error se encuentran en:

```
public/assets/errorImages/
  errorGeneral.png        ← Imagen para la página de error general
```

### Diseño

- **Fondo:** `#F5F5EE` — crema claro, consistente con `Register.tsx` y `Login.tsx`
- **Botones:** fondo `green-800`, texto blanco, `rounded-full` — consistente con el resto de la app
- **Enlace Volver:** texto `green-700` con subrayado
- **Header:** logo centrado con altura `py-1`, igual que el Navbar de la landing
- **Footer:** borde superior `gray-300`, texto GoGoMap en `green-800` y copyright en `gray-400`

### Iconos

- **Reintentar:** icono `RefreshCw` de Lucide React
- **Volver al Mapa:** icono SVG propio `/assets/icons/mapa.svg` con filtro CSS `invert` para mostrarlo en blanco sobre el botón verde

### Convención de estilos

Igual que en el resto del proyecto, todas las páginas de error aplican el patrón **extraTailwind**:

```tsx
// Estilos
const container = "w-full mt-8 flex flex-col items-center text-center gap-3"
const title = "text-3xl font-black text-gray-900"

export default function ErrorText() {
  return (
    <div className={container}>
      <h1 className={title}>¡HUBO UN ERROR!</h1>
    </div>
  )
}
```

---

## Pantallas

El proyecto cuenta con las siguientes vistas implementadas:

### 🔐 Login (`/login`)
Pantalla de bienvenida con formulario de acceso. Incluye campos de usuario y contraseña, enlace a registro y acceso al soporte.

### 🗺️ Mapa principal (`/map`)
Vista central de la aplicación. Muestra el mapa de Málaga con los puntos ODS geolocalizados. Incluye:
- Barra superior con logo, iconos de búsqueda y perfil
- Filtros rápidos de ODS en fila horizontal (con iconos por objetivo)
- Panel inferior con la lista de **"Puntos cercanos"**
- Navegación inferior: Mapa / Favoritos / Perfil

### 📍 Detalle de punto (`/point/:id`)
Modal o vista de detalle al seleccionar un punto ODS. Ejemplo:
- Nombre y categoría ODS (ej. *ODS 1 — Cargador de coche*)
- Dirección (ej. *Avda. Andalucía, 5*)
- Estado: **Funcionando** / No disponible
- Distancia en metros
- Botones de acción: **Reportar** y **Ruta**

### 📝 Registro (`/register`)
Formulario de creación de cuenta con los campos: nombre, apellidos, nombre de usuario, email, contraseña y confirmación de contraseña. Botón de **Enviar** y enlace de vuelta al login. Branding GoGoMap en cabecera.

### 👤 Perfil de usuario (`/profile`)
Vista del perfil del usuario autenticado. Incluye:
- Avatar con inicial del nombre
- Nombre completo y fecha de registro (ej. *Miembro desde Enero 2024*)
- Contador de **Karma Points** con impacto total (ej. *50 Karma Points*)
- Nombre completo y email
- Botón de **Cerrar Sesión**

### ⭐ Favoritos (`/favorites`)
Lista de puntos ODS guardados por el usuario, filtrable por ODS. Cada tarjeta muestra el icono oficial del ODS correspondiente, nombre del punto, dirección, estado y distancia. Incluye barra de filtrado horizontal con los 17 chips ODS, reutilizada desde el componente del mapa.

### ❌ Error 404 (`/*`)
Página de error para rutas no encontradas. Mensaje: **"¡UPS! PÁGINA NO ENCONTRADA — Parece que este punto no está en el mapa."** con botón de **Volver al mapa**.

### ⚠️ Error general (`/error`)
Página de error genérico. Mensaje: **"¡HUBO UN ERROR! — Parece que algo salió mal. Inténtalo de nuevo."** con botones de **Reintentar** y **Volver**.

---

## ⭐ Pantalla de Favoritos

### Ruta

```
/favorites → FavoritesPage
```

### Estructura de componentes

```
src/pages/Favorites/
  FavoritesPage.tsx                   ← Componente raíz, gestiona el estado del filtro
  data/
    favorites.mock.ts                 ← Datos mock hasta integración con API real
  components/
    FavoritesHeader.tsx               ← Cabecera con logo e icono de ajustes
    FavoritesTitle.tsx                ← Título "Favoritos" independiente
    FavoritesList.tsx                 ← Lista filtrada de tarjetas
    FavoriteCard.tsx                  ← Tarjeta individual de cada favorito
```

### Componentes reutilizados

| Componente | Ruta original | Uso en Favoritos |
|---|---|---|
| `Filter` | `src/components/Maps/Filter.tsx` | Filtrado de tarjetas por ODS (mismo componente que el mapa) |
| `Footer` | `src/components/Footer/Footer.tsx` | Barra de navegación inferior fija |

### Estructura de datos

El tipo `FavoritePlace` define la forma de cada favorito:

```ts
export interface FavoritePlace {
  id: number
  name: string
  address: string
  status: "Abierto" | "Cerrado" | "Gratis"
  distance: string
  ods: number        // número de ODS (1–17)
  odsName: string    // nombre oficial del ODS
}
```

### Flujo de datos

```
FavoritesPage (estado: selectedOds)
  ├── Filter         ← recibe selected y onSelect
  ├── FavoritesTitle
  └── FavoritesList  ← recibe selectedOds, filtra FAVORITES_MOCK internamente
        └── FavoriteCard × n
```

El estado `selectedOds` vive en `FavoritesPage` y se pasa hacia abajo a `Filter` y `FavoritesList`. Esto sigue el patrón **props down**: el padre coordina, los hijos solo reciben y renderizan.

### Diseño

- **Fondo:** `#F5F5EE` — crema claro, consistente con el resto de la app
- **Tarjetas:** fondo blanco, `rounded-2xl`, `shadow-sm`
- **Icono ODS:** imagen oficial de Naciones Unidas (`S-WEB-Goal-XX.png`), tamaño `80×80px`
- **Nombre del ODS:** texto `green-600`, peso `semibold`
- **Estado Abierto:** badge `bg-green-100 text-green-700`
- **Estado Cerrado:** badge `bg-gray-200 text-gray-500`
- **Estado Gratis:** badge `bg-gray-100 text-gray-600`
- **Estrella de favorito:** `★` en `text-yellow-400`, esquina superior derecha de cada tarjeta
- **Footer fijo:** envuelto en `fixed bottom-0` para que no se desplace con el scroll

### Notas de implementación

**Ocultación del logo en el Filter:**  
El componente `Filter` incluye internamente el logo de GoGoMap. Para ocultarlo en Favoritos sin modificar el código original, se envuelve en un contenedor con `overflow-hidden` y un margen negativo que desplaza el componente hacia arriba, dejando el logo fuera del área visible:

```tsx
const filterWrapper = "w-full overflow-hidden"
const filterOffset  = "-mt-[84px]"
```

**Footer fijo:**  
El `Footer` original no tiene posicionamiento fijo. Se soluciona envolviéndolo sin tocar su código:

```tsx
const footerWrapper = "fixed bottom-0 left-0 w-full z-50"
```

### Pendiente

- Sustituir `FAVORITES_MOCK` por llamada real a `GET /api/v1/users/me/favorites`
- Implementar acción de la estrella para llamar a `DELETE /api/v1/points/{id}/favorite`
- Añadir navegación al `Footer` mediante `useNavigate` (pendiente de implementación por el equipo)

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
│  🌿 50 Karma Points     │
└──────────────────────────┘
```

#### Navegación inferior (móvil)

Barra fija en la parte inferior con tres secciones:

```
[🗺️ Mapa]   [❤️ Favoritos]   [👤 Perfil]
```

---

## API Endpoints

Base URL: `https://api.gogomap.es/api/v1`

> ⚠️ La **Landing Page** (1) es actualmente estática. Se conectará a un endpoint dinámico en una versión futura.

---

### 🔐 Autenticación

#### Registro de usuario
```
POST /api/v1/auth/register
```

**Request DTO**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response DTO**
```json
{
  "userId": "string",
  "username": "string"
}
```

---

#### Login
```
POST /api/v1/auth/login
```

**Request DTO**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response DTO**
```json
{
  "token": "string"
}
```

> El token recibido debe incluirse en las cabeceras de las peticiones autenticadas como `Authorization: Bearer <token>`.

---

### 🗺️ Mapa

#### Cargar mapa principal con filtros ODS
```
GET /api/v1/map
```
Devuelve los datos necesarios para renderizar el mapa principal con los botones de filtrado por ODS.

---

### 📍 Puntos ODS

#### Detalle de un punto
```
GET /api/v1/points/{id}
```
Devuelve toda la información completa del punto seleccionado (nombre, categoría ODS, dirección, estado, imágenes, distancia, etc.).

---

### 👤 Perfil de usuario

#### Datos del usuario activo
```
GET /api/v1/users/me/
```
Devuelve todos los datos y estadísticas del usuario autenticado (nombre, email, Eco Points, fecha de registro, etc.).

---

### ⭐ Favoritos

#### Listar favoritos del usuario
```
GET /api/v1/users/me/favorites
```
Devuelve la lista de puntos ODS guardados por el usuario, con información mínima de cada uno.

---

#### Añadir punto a favoritos
```
POST /api/v1/points/{id}/favorite
```
Vincula un punto ODS al perfil del usuario.
Devuelve `201 CREATED`.

---

#### Eliminar punto de favoritos
```
DELETE /api/v1/points/{id}/favorite
```
Elimina la vinculación entre el punto y el usuario.
Devuelve `204 No Content`.

---

### 📋 Resumen de endpoints

| Método | Endpoint | Vista | Auth |
|--------|----------|-------|------|
| `POST` | `/api/v1/auth/register` | Registro | ❌ |
| `POST` | `/api/v1/auth/login` | Login | ❌ |
| `GET` | `/api/v1/map` | Mapa principal | ✅ |
| `GET` | `/api/v1/points/{id}` | Detalle de punto | ✅ |
| `GET` | `/api/v1/users/me/` | Perfil | ✅ |
| `GET` | `/api/v1/users/me/favorites` | Favoritos | ✅ |
| `POST` | `/api/v1/points/{id}/favorite` | Favoritos | ✅ |
| `DELETE` | `/api/v1/points/{id}/favorite` | Favoritos | ✅ |

---

## Estructura del proyecto

```
gogomap-frontend/
│
├── public/
│   ├── assets/
│   │   ├── ods/                  # Iconos ODS oficiales en español (PNG)
│   │   ├── fotos/                # Fotografías de Málaga
│   │   ├── errorImages/          # Imágenes ilustrativas de páginas de error
│   │   │   └── errorGeneral.png
│   │   ├── icons/                # Iconos SVG propios de la app
│   │   │   └── mapa.svg
│   │   └── Logo.png              # Logo oficial de GoGoMap
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── onboarding/           # Landing page
│   │   │   ├── GoGomapOnboarding.tsx
│   │   │   └── components/
│   │   │       ├── Navbar.tsx
│   │   │       ├── Hero.tsx
│   │   │       ├── Features.tsx
│   │   │       ├── OdsShowcase.tsx
│   │   │       ├── HowItWorks.tsx
│   │   │       ├── KarmaCallout.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Button.tsx
│   │   ├── error/                # Páginas de error
│   │   │   ├── ErrorPage.tsx
│   │   │   ├── ErrorHeader.tsx
│   │   │   ├── ErrorImage.tsx
│   │   │   ├── ErrorImage404.tsx
│   │   │   ├── ErrorText.tsx
│   │   │   ├── ErrorActions.tsx
│   │   │   ├── ErrorActions404.tsx
│   │   │   └── ErrorFooter.tsx
│   │   ├── Maps/                 # Componentes del mapa
│   │   │   └── Filter.tsx        ← Filtro de chips ODS (reutilizado en Favoritos)
│   │   ├── Footer/
│   │   │   └── Footer.tsx        ← Barra de navegación inferior (reutilizada en Favoritos)
│   │   └── ui/                   # Botones, inputs, badges genéricos
│   │
│   ├── pages/
│   │   ├── Map/
│   │   │   └── MapPage.tsx
│   │   ├── Favorites/
│   │   │   ├── FavoritesPage.tsx           ← Componente raíz
│   │   │   ├── data/
│   │   │   │   └── favorites.mock.ts       ← Datos mock (pendiente integración API)
│   │   │   └── components/
│   │   │       ├── FavoritesHeader.tsx     ← Cabecera con logo e icono ajustes
│   │   │       ├── FavoritesTitle.tsx      ← Título de sección
│   │   │       ├── FavoritesList.tsx       ← Lista con filtrado por ODS
│   │   │       └── FavoriteCard.tsx        ← Tarjeta individual de favorito
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useGeolocation.js
│   │   └── useNearbyPoints.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── points.js
│   │
│   ├── store/
│   ├── styles/
│   │   └── tokens.css
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
| Framework | React + TypeScript |
| Estilos | Tailwind CSS |
| Iconos | Lucide React |
| Mapa | Leaflet.js / Mapbox GL / Google Maps API |
| Rutas | React Router v6 |
| Estado global | Zustand |
| HTTP | Axios |
| Geolocalización | Web Geolocation API |
| Iconos ODS | Naciones Unidas (español) |

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

© 2026 GoGoMap · Environmental Responsibility  
Proyecto académico desarrollado en la ciudad de Málaga.

---

> *El contenido de esta aplicación no ha sido aprobado por las Naciones Unidas y no refleja las opiniones de las Naciones Unidas ni de sus funcionarios o Estados Miembros.*  
> Iconos ODS: [Naciones Unidas — Materiales de comunicación](https://www.un.org/sustainabledevelopment/es/news/communications-material/)