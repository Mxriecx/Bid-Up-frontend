BidUp
=====

**Autores:**  
- Maria Camila Paz Tuiran  
- Isabella Niño Becerra  
- Fabian Eduardo Noguera Quintero  

BidUp es una plataforma de subastas en línea donde cualquier persona puede publicar artículos y permitir que la comunidad puje por ellos en tiempo real. Además del flujo público, la aplicación incluye herramientas administrativas para supervisar usuarios y operaciones.

## Funcionalidades destacadas

- *Publicar productos:* formulario sencillo para subir título, descripción, categoría, precio inicial e imagen del artículo.
- *Pujar y seguir subastas:* los usuarios autenticados pueden ofertar por productos y ver cómo evoluciona el precio.
- *Autenticación y perfiles:* registro e inicio de sesión para gestionar productos, pujas y preferencias personales.
- *Dashboard administrativo:* moderación de usuarios y control de contenido creado por la comunidad.
- *Alertas amigables:* integración con SweetAlert2 para confirmaciones y mensajes de error claros.

## Arquitectura

- *Frontend:* Angular 17+, TypeScript, Bootstrap y estilos modulares por componente.
- *Backend:* API REST con Node.js y Express, persistencia principal en MongoDB.
- *Comunicación:* HttpClient gestiona las peticiones al backend y maneja respuestas tipadas.
- *Seguridad:* autenticación planificada/implementada mediante JSON Web Tokens.

## Requisitos previos

- Node.js 20 o superior  
- npm 10 o superior  
- Instancia de MongoDB (local o en la nube)  
- Backend de BidUp operativo (por defecto en http://localhost:3001)

## Puesta en marcha (frontend)

1. Sitúate en el directorio Bid-Up-frontend/Bidup.
2. Instala dependencias:
   bash
   npm install
   
3. Configura la URL del backend en src/environments/environment*.ts.
4. Levanta el servidor de desarrollo:
   bash
   npm run start
   
5. Abre http://localhost:4200 en el navegador.

> ℹ Levanta el backend en paralelo para que las peticiones de productos y autenticación funcionen correctamente.

## Estructura relevante

- src/app/components/navbar: barra superior con el modal para crear productos.
- src/app/components/bid-product: formulario especializado para publicar artículos desde la sección de pujas.
- src/app/services: servicios de Angular que encapsulan llamadas HTTP (products, login, etc.).
- src/app/pages: páginas completas (login, listado de productos, administrador, etc.).

## Próximos pasos sugeridos

- Validaciones adicionales y previsualización de imágenes antes de publicar.
- WebSockets o SSE para actualizaciones de pujas en tiempo real.
- Historial de ofertas y reputación de vendedores/compradores.
- Automatización de pruebas e2e con Cypress o Playwright.

## Créditos

Proyecto desarrollado como parte del Bootcamp, pensado para practicar arquitecturas completas con Angular y Node.js. Siéntete libre de adaptarlo a tus propias necesidades.
