# 🌍 ECOMAP

> Mapa interactivo de Objetivos de Desarrollo Sostenible · Málaga

ECOMAP será una aplicación web progresiva (PWA) que permite explorar puntos de interés vinculados a los **Objetivos de Desarrollo Sostenible (ODS)** de la ONU en la ciudad de Málaga. Los datos provienen de fuentes oficiales del Ayuntamiento de Málaga y se visualizan sobre un mapa interactivo.

El proyecto arrancará con el **ODS 7 — Energía Asequible y No Contaminante**, mostrando los puntos de carga para vehículos eléctricos de la ciudad, y está diseñado para escalar al resto de ODS con el mismo mecanismo.

---

## ¿Qué hace ECOMAP?

- Muestra en un mapa los puntos ODS oficiales de Málaga (cargadores eléctricos, zonas verdes, puntos de reciclaje…)
- Permite a los usuarios explorar, visitar y verificar esos puntos
- Recompensa la participación con un sistema de **karma** (puntos por visitar, confirmar o reportar)

## Tecnologías

| Capa | Stack |
|---|---|
| Backend | Java · Spring Boot · PostgreSQL · Flyway · JWT |
| Frontend | React · Vite · Tailwind CSS · Leaflet |
| Base de datos | PostgreSQL en Neon.tech |
| Despliegue | Railway / Render (backend) · Vercel / Netlify (frontend) |

## Estructura del repositorio

```
ecomap/
├── backend/    ← API REST con Spring Boot
└── frontend/   ← SPA con React + Vite
```
## Datos ODS

Los puntos del mapa se importan desde los datasets en abierto del [Portal de Datos Abiertos del Ayuntamiento de Málaga](https://datosabiertos.malaga.eu). El piloto usa el dataset de **puntos de recarga para vehículos eléctricos** en formato GeoJSON.

## Licencia

MIT