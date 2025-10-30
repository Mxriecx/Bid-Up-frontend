BidUp
=====
**Autores:**  
- Maria Camila Paz Tuiran  
- Isabella Niño Becerra  
- Fabian Eduardo Noguera Quintero  

BidUp recrea una casa de subastas en formato digital. La propuesta es sencilla: cualquier persona puede publicar un artículo y la comunidad entera puede pujar por él hasta que se cierre la subasta. Todo el proyecto gira alrededor de ofrecer una experiencia ágil, amigable y entendible para quienes compran, venden o moderan.

## ¿Qué ofrece la plataforma?

- Publicar artículos con información básica y una imagen representativa.
- Explorar productos disponibles y revisar cómo avanzan las pujas.
- Iniciar sesión para participar activamente (subir productos, ofertar, gestionar perfil).
- Administrar la plataforma desde un panel especial para moderadores.

## Cómo se vive la experiencia

1. **Descubrir:** al entrar, el usuario navega por los productos destacados y conoce las reglas básicas.
2. **Participar:** tras autenticarse puede crear artículos propios o sumarse a una subasta ya abierta.
3. **Supervisar:** el rol de administrador vigila que las publicaciones cumplan las políticas y resuelve incidencias.

## Base tecnológica

El proyecto combina un frontend moderno en Angular con un backend en Node.js/Express y una base de datos MongoDB. Se utilizan librerías como Bootstrap para el diseño y SweetAlert2 para los mensajes interactivos. La comunicación entre módulos se realiza mediante una API REST.

## Puesta en marcha rápida

1. Instala dependencias dentro de la carpeta `Bidup` (`npm install`).
2. Ajusta las variables de entorno con la URL del backend.
3. Ejecuta `npm run start` para levantar el frontend.
4. Arranca el backend (vive en un repositorio/carpeta aparte) y asegúrate de que MongoDB esté disponible.
5. Navega a `http://localhost:4200` para empezar a probar.

## Ideas para extender el proyecto

- Actualizaciones en tiempo real con sockets para ver pujas al instante.
- Historial detallado de ofertas y reputación de usuarios.
- Filtros más inteligentes para encontrar productos por categoría o estado.
- Reportes y estadísticas que ayuden a entender el movimiento diario.

## Nota final

BidUp nació como ejercicio dentro de un bootcamp. Es un buen punto de partida para practicar cómo se unen diseño, frontend, backend y base de datos en una sola solución. Modifícalo, experiméntalo y llévalo al siguiente nivel.
