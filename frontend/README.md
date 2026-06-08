# GoGoMap Frontend

<div align="center">

**Interfaz Web Responsiva para Localización de Puntos ODS**

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Inicio Rápido](#-guía-de-inicio-rápido) • [Arquitectura](#-arquitectura) • [Componentes](#-componentes) • [Páginas](#-páginas) • [Desarrollo](#-guía-de-desarrollo)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos](#-requisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Páginas Principales](#-páginas-principales)
- [Componentes](#-componentes)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Build y Deployment](#-build-y-deployment)

---

## 📖 Descripción

Frontend moderna de GoGoMap desarrollada con **React 19** + **TypeScript**. Proporciona una interfaz responsiva para descubrir puntos de interés sostenibles en Málaga, con características avanzadas como:

- 🗺️ **Mapa Interactivo**: Visualización en tiempo real con Leaflet
- 🎯 **Filtrado Inteligente**: Por ODS, distancia y estado de favoritos
- 🛣️ **Generación de Rutas**: Integración con OSRM
- 🎮 **Gamificación**: Sistema de karma, logros y ruleta
- 🔐 **Autenticación JWT**: Gestión segura de sesiones
- 📱 **Responsive Design**: Perfecto en móvil, tablet y escritorio
- ♿ **Accesible**: Cumplimiento de WCAG 2.1

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|:----------|:-----------|:--------|
| **Core** | React | 19.2.5 |
| **Lenguaje** | TypeScript | 6.0.2 |
| **Bundler** | Vite | 5.0 |
| **Estilos** | Tailwind CSS | 4.3.0 |
| **UI Components** | shadcn/ui | 4.7.0 |
| | Radix UI | 1.4.3 |
| **Mapas** | Leaflet | 1.9.4 |
| | React-Leaflet | 5.0.0 |
| | Leaflet.markercluster | 1.5.3 |
| **Enrutamiento** | React Router | 7.15.1 |
| **HTTP Client** | Axios | 1.16.1 |
| **Iconos** | Lucide React | 1.16.0 |
| **Notificaciones** | Sonner | 2.0.7 |
| **Animaciones** | React Confetti | 6.4.0 |
| **Gamificación** | react-custom-roulette | 1.4.1 |
| **Utils** | use-debounce | 10.1.1 |
| **Linting** | ESLint | 10.2.1 |
| **Dev Tools** | @vitejs/plugin-react | 6.0.1 |

---

## 📋 Requisitos

### Requisitos Previos del Sistema

- ✅ **Node.js** 18.0 o superior
  ```bash
  node --version  # Verifica tu versión
  ```
- ✅ **npm**, **yarn** o **pnpm** (recomendado pnpm)
  ```bash
  pnpm --version  # Verifica tu instalación
  ```
- ✅ **Backend corriendo** en `http://localhost:8080`
  - Véase [backend/README.md](../backend/README.md)

---

## 🚀 Instalación y Configuración

### Paso 1: Navegar al Directorio Frontend

```bash
cd frontend
```

### Paso 2: Instalar Dependencias

#### Con pnpm (Recomendado)
```bash
pnpm install
```

#### Con npm
```bash
npm install
```

#### Con yarn
```bash
yarn install
```

El proceso descargará ~500MB de dependencias (esto puede tomar 1-2 minutos).

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en `frontend/`:

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=GoGoMap
VITE_APP_VERSION=1.0.0
```

### Variables de Entorno Disponibles

| Variable | Descripción | Valor por Defecto | Requerida |
|:---------|:-----------|:------------------|:----------|
| `VITE_API_BASE_URL` | URL base de la API backend | `http://localhost:8080/api/v1` | ✅ |
| `VITE_APP_NAME` | Nombre de la aplicación | `GoGoMap` | ⚠️ |
| `VITE_APP_VERSION` | Versión de la app | `1.0.0` | ⚠️ |

### Paso 4: Ejecutar el Servidor de Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en: **`http://localhost:5173`**

```
VITE v5.0.0  ready in X ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Paso 5: Verificar Conectividad

- ✅ Aplicación cargada: `http://localhost:5173`
- ✅ API accesible: Debería iniciar sesión sin errores
- ✅ Consola: Sin errores de CORS o conexión

---

## 🏗️ Arquitectura

### Estructura de Capas

```
┌─────────────────────────────────────┐
│         Componentes React           │ (UI Components)
└──────────────────┬──────────────────┘
                   │
┌──────────────────┴──────────────────┐
│         Custom Hooks (useApi)       │ (State Management)
└──────────────────┬──────────────────┘
                   │
┌──────────────────┴──────────────────┐
│       Context API (AuthContext)     │ (Global State)
└──────────────────┬──────────────────┘
                   │
┌──────────────────┴──────────────────┐
│    Servicios API (Axios Client)     │ (HTTP Client)
└──────────────────┬──────────────────┘
                   │
┌──────────────────┴──────────────────┐
│     Backend REST API (Java)         │ (Data Layer)
└─────────────────────────────────────┘
```

### Flow de Datos

1. **Usuario interactúa** con componente
2. **Componente llama** a hook custom o context
3. **Hook/Context invoca** servicio API (Axios)
4. **API hace request** al backend
5. **Backend procesa** y retorna datos
6. **Estado actualizado** en componente
7. **UI re-renderiza** con nuevos datos

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/                    # Componentes reutilizables
│   │   ├── Auth/                      # Componentes de autenticación
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── header/                    # Cabecera de navegación
│   │   │   └── Header.tsx
│   │   ├── Footer/                    # Pie de página
│   │   │   └── Footer.tsx
│   │   ├── Map/                       # Componentes de mapa
│   │   │   ├── MapView.tsx            # Visor principal Leaflet
│   │   │   ├── MapAlerts.tsx          # Alertas y notificaciones
│   │   │   ├── FilterDrawer.tsx       # Panel de filtros
│   │   │   └── PointDetailModal.tsx   # Modal de detalles
│   │   ├── Points/                    # Gestión de puntos
│   │   │   ├── Weal.tsx               # Componente ruleta (gamificación)
│   │   │   └── PointCard.tsx
│   │   ├── Profile/                   # Perfil de usuario
│   │   │   ├── EditProfileModal.tsx
│   │   │   ├── AchievementsModal.tsx
│   │   │   ├── KarmaShopModal.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── ProfileStats.tsx
│   │   ├── error/                     # Páginas de error personalizadas
│   │   │   ├── ErrorPage.tsx
│   │   │   ├── ErrorHeader.tsx
│   │   │   ├── ErrorFooter.tsx
│   │   │   └── ErrorImage.tsx
│   │   ├── error404/                  # Error 404 específico
│   │   │   └── ErrorPage404.tsx
│   │   ├── onboarding/                # Onboarding y landing
│   │   │   ├── GoGomapOnboarding.tsx
│   │   │   └── components/
│   │   ├── shared/                    # Componentes compartidos
│   │   │   └── Loading.tsx
│   │   └── ui/                        # Componentes base (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── modal.tsx
│   │       └── ...
│   │
│   ├── pages/                         # Páginas principales
│   │   ├── Map/
│   │   │   └── MapPage.tsx            # Página del mapa
│   │   ├── User/
│   │   │   └── UserPage.tsx           # Dashboard de usuario
│   │   ├── Favorites/
│   │   │   ├── FavoritesPage.tsx      # Lista de favoritos
│   │   │   └── FavoriteCard.tsx
│   │   └── Auth/
│   │       ├── LoginPage.tsx
│   │       ├── RegisterPage.tsx
│   │       └── OnboardingPage.tsx
│   │
│   ├── routes/                        # Enrutamiento
│   │   ├── AppRouter.tsx              # Router principal
│   │   ├── ProtectedRoute.tsx         # Ruta protegida con auth
│   │   └── RedirectIfAuthenticated.tsx
│   │
│   ├── context/                       # Estado global
│   │   └── AuthContext.tsx            # Contexto de autenticación
│   │
│   ├── api/                           # Integración API
│   │   ├── axiosConfig.ts             # Configuración de Axios
│   │   ├── services/                  # Servicios API
│   │   │   ├── authService.ts         # Endpoints de auth
│   │   │   ├── pointService.ts        # Endpoints de puntos
│   │   │   └── userService.ts         # Endpoints de usuario
│   │   └── types/
│   │       └── index.ts               # Tipos TypeScript compartidos
│   │
│   ├── hooks/                         # Custom React Hooks
│   │   └── useApi.ts                  # Hook para requests HTTP
│   │
│   ├── utils/                         # Funciones utilitarias
│   │   ├── Distance.ts                # Cálculo de distancias
│   │   ├── map.ts                     # Funciones de mapa (OSRM)
│   │   ├── OdsColors.ts               # Colores por ODS
│   │   ├── odsMapping.ts              # Mapeo de ODS
│   │   └── validators.ts              # Validaciones
│   │
│   ├── App.tsx                        # Componente raíz
│   ├── App.css                        # Estilos globales
│   ├── main.tsx                       # Punto de entrada
│   └── index.css                      # CSS base
│
├── public/                            # Assets estáticos
│   └── assets/
│       ├── icons/                     # Iconos SVG
│       ├── fotos/                     # Imágenes
│       ├── ods/                       # Logos ODS
│       └── errorImages/               # Imágenes de error
│
├── node_modules/                      # Dependencias (generado)
│
├── .env                               # Variables de entorno (crear)
├── .env.example                       # Plantilla de .env
│
├── index.html                         # HTML principal
├── package.json                       # Dependencias e scripts
├── pnpm-lock.yaml                     # Lock file de pnpm
├── pnpm-workspace.yaml                # Workspace config
├── tsconfig.json                      # Configuración TypeScript
├── tsconfig.app.json                  # Config TypeScript app
├── tsconfig.node.json                 # Config TypeScript build
├── vite.config.ts                     # Configuración Vite
├── tailwind.config.js                 # Configuración Tailwind
├── eslint.config.js                   # Configuración ESLint
├── components.json                    # Config shadcn/ui
│
└── README.md                          # Este archivo
```

---

## 📄 Páginas Principales

### Página de Mapa (`/map`)
- **Descripción**: Vista principal de la aplicación
- **Funcionalidades**:
  - Visualización de mapa interactivo con Leaflet
  - Geolocalización en tiempo real
  - Clustering de puntos
  - Filtrado por ODS y distancia
  - Búsqueda de favoritos
  - Modal de detalle de punto
  - Botón de centrado en ubicación actual
  - Botón de eliminación de ruta

### Página de Favoritos (`/favorites`)
- **Descripción**: Listado de puntos marcados como favoritos
- **Funcionalidades**:
  - Filtrado por ODS
  - Tarjetas de puntos favoritos
  - Opción de eliminar de favoritos
  - Generación de ruta a punto

### Página de Perfil (`/user`)
- **Descripción**: Dashboard personal del usuario
- **Funcionalidades**:
  - Información de perfil
  - Karma Points y nivel
  - Logros desbloqueados
  - Ruleta diaria
  - Tienda de karma
  - Leaderboard de usuarios
  - Opción de logout

### Página de Onboarding (`/onboarding`)
- **Descripción**: Landing page inicial
- **Funcionalidades**:
  - Presentación de la app
  - Slider de funcionalidades
  - Botones de login/registro

---

## 🧩 Componentes Principales

### `MapView.tsx`
Renderiza el mapa interactivo Leaflet con capas de puntos, clusters y rutas.

```typescript
interface MapViewProps {
  points: Point[];
  userPosition: [number, number] | null;
  routeCoords: [number, number][] | null;
  selectedOds: number[];
  radiusKm: number;
  onPointClick: (id: string, lat: number, lng: number) => void;
  mapRef: React.RefObject<LeafletMap>;
}
```

### `PointDetailModal.tsx`
Modal con detalles completos de un punto seleccionado, incluyendo botón de ruta.

### `FilterDrawer.tsx`
Panel lateral desplegable para filtrar por:
- ODS específicos
- Rango de distancia
- Solo favoritos

### `Weal.tsx`
Componente de ruleta gamificada con animación de giro, confeti y premios.

### `AuthContext.tsx`
Contexto global para:
- Gestión de sesión
- Tokens JWT
- Perfil de usuario
- Estado de ruleta diaria

---

## 🛠️ Guía de Desarrollo

### Crear un Nuevo Componente

1. **Estructura básica** (`src/components/MiComponente/MiComponente.tsx`):

```typescript
import React from 'react';

interface MiComponenteProps {
  titulo: string;
  onClose?: () => void;
}

export default function MiComponente({ 
  titulo, 
  onClose 
}: MiComponenteProps) {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">{titulo}</h2>
      {onClose && (
        <button onClick={onClose} className="text-gray-500">
          ✕
        </button>
      )}
    </div>
  );
}
```

2. **Usar el componente**:

```typescript
import MiComponente from '@/components/MiComponente/MiComponente';

function App() {
  return <MiComponente titulo="Bienvenido" onClose={() => {}} />;
}
```

### Crear un Nuevo Servicio API

1. **Definir tipos** (`src/api/types/index.ts`):

```typescript
export interface MiDato {
  id: number;
  nombre: string;
  valor: string;
}
```

2. **Crear servicio** (`src/api/services/miService.ts`):

```typescript
import api from '@/api/axiosConfig';
import type { MiDato } from '@/api/types';

export const miService = {
  obtenerTodos: () => 
    api.get<MiDato[]>('/mi-recurso'),
  
  obtenerPorId: (id: number) => 
    api.get<MiDato>(`/mi-recurso/${id}`),
  
  crear: (dato: Omit<MiDato, 'id'>) => 
    api.post<MiDato>('/mi-recurso', dato),
  
  actualizar: (id: number, dato: Partial<MiDato>) => 
    api.put<MiDato>(`/mi-recurso/${id}`, dato),
  
  eliminar: (id: number) => 
    api.delete(`/mi-recurso/${id}`),
};

export default miService;
```

3. **Usar en componente**:

```typescript
import miService from '@/api/services/miService';
import { useEffect, useState } from 'react';

export function MiPagina() {
  const [datos, setDatos] = useState<MiDato[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const response = await miService.obtenerTodos();
      setDatos(response.data);
    };
    cargar();
  }, []);

  return (
    <div>
      {datos.map(d => <p key={d.id}>{d.nombre}</p>)}
    </div>
  );
}
```

### Usar Custom Hook `useApi`

```typescript
import { useApi } from '@/hooks/useApi';

function MiComponente() {
  const { data: puntos, loading, error } = useApi(
    pointService.getAll,
    []
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{/* Mostrar puntos */}</div>;
}
```

### Convenciones de Código

- **Nomenclatura**: camelCase para variables, PascalCase para componentes
- **Tipos**: Definir siempre tipos TypeScript explícitos
- **Estilos**: Usar clases Tailwind, evitar CSS inline
- **Props**: Usar `interface Props` para documentación
- **Comentarios**: Documentar lógica compleja
- **Imports**: Usar path aliases (`@/...`)

### Debugging

```typescript
// Logging
console.log('Variable:', valor);
console.error('Error:', error);

// DevTools de React
// Instalar React Developer Tools extension

// Inspeccionar red
// F12 → Network → Ver requests API
```

---

## 📦 Comandos Disponibles

### Desarrollo
```bash
# Servidor de desarrollo
pnpm dev

# Linting
pnpm lint

# Formateo (si Prettier está configurado)
pnpm format
```

### Build
```bash
# Compilar a producción
pnpm build

# Previsualizar build producción localmente
pnpm preview
```

### Instalación de Paquetes
```bash
# Añadir nueva dependencia
pnpm add nombre-paquete

# Añadir como devDependency
pnpm add -D nombre-paquete

# Actualizar todo
pnpm update
```

---

## 🚀 Build y Deployment

### Crear Build de Producción

```bash
pnpm build
```

Genera carpeta `dist/` con archivos optimizados:
- ✅ Minificado
- ✅ Tree-shaked (código no usado eliminado)
- ✅ Code splitting
- ✅ Comprimido

```
dist/
├── index.html
├── assets/
│   ├── index-XXX.js      (JS principal)
│   ├── vendor-XXX.js     (Dependencias)
│   ├── chunk-XXX.js      (Code chunks)
│   └── index-XXX.css     (Estilos)
└── vite.svg
```

### Servir Localmente para Testing

```bash
pnpm preview
```

Disponible en: `http://localhost:4173`

### Deploy a Hosting

#### Vercel (Recomendado para React)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno en Settings
3. Deploy automático en cada push

#### Netlify

```bash
# Instalar CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t gogomaps-frontend .
docker run -p 80:80 gogomaps-frontend
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@/...'"
- ✅ Verifica que `vite.config.ts` tiene configurado el alias `@`
- ✅ Reinicia el servidor dev: `pnpm dev`

### Error: "CORS error"
- ✅ Verifica que `VITE_API_BASE_URL` es correcto
- ✅ Asegúrate que backend está corriendo en `localhost:8080`

### Error: "401 Unauthorized"
- ✅ Token expirado, vuelve a hacer login
- ✅ Token mal formado, borra localStorage

### Build falla
```bash
# Limpiar cache
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Mapa no carga
- ✅ Verifica que Leaflet CSS está importado
- ✅ Carga dinámicamente si es necesario

---

## 📚 Referencias

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Leaflet Documentation](https://leafletjs.com)
- [shadcn/ui](https://ui.shadcn.com)

---

<div align="center">

**Desarrollado con ❤️ por el equipo de GoGoMap**

[↑ Volver arriba](#gogomaps-frontend)

</div>