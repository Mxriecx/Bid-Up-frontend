BidUp
=====

**Autores:**  
- Maria Camila Paz Tuiran  
- Isabella Niño Becerra  
- Fabian Eduardo Noguera Quintero  

BidUp es una plataforma de subastas en línea donde cualquier persona puede publicar artículos y permitir que la comunidad puje por ellos en tiempo real. Además del flujo público, la aplicación incluye herramientas administrativas para supervisar usuarios y operaciones.

## Funcionalidades destacadas

- **Publicar productos:** formulario sencillo para subir título, descripción, categoría, precio inicial e imagen del artículo.
- **Pujar y seguir subastas:** los usuarios autenticados pueden ofertar por productos y ver cómo evoluciona el precio.
- **Autenticación y perfiles:** registro e inicio de sesión para gestionar productos, pujas y preferencias personales.
- **Dashboard administrativo:** moderación de usuarios y control de contenido creado por la comunidad.
- **Alertas amigables:** integración con SweetAlert2 para confirmaciones y mensajes de error claros.

## Arquitectura

- **Frontend:** Angular 17+, TypeScript, Bootstrap y estilos modulares por componente.
- **Backend:** API REST con Node.js y Express, persistencia principal en MongoDB.
- **Comunicación:** `HttpClient` gestiona las peticiones al backend y maneja respuestas tipadas.
- **Seguridad:** autenticación planificada/implementada mediante JSON Web Tokens.

## Requisitos previos

- Node.js 20 o superior  
- npm 10 o superior  
- Instancia de MongoDB (local o en la nube)  
- Backend de BidUp operativo (por defecto en `http://localhost:3001`)

## Puesta en marcha (frontend)

1. Sitúate en el directorio `Bid-Up-frontend/Bidup`.
2. Instala dependencias:
   ```bash
   npm install
