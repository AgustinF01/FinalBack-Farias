**Proyecto final para Backend I**

Este proyecto es una aplicación web de un e-commerce que permite a los usuarios navegar y comprar productos, así como gestionar un carrito de compras. 

A continuación, se describe su funcionamiento de manera resumida.

**Estructura del Proyecto:**

- El proyecto está construido utilizando Node.js y Express para el backend, y MongoDB como base de datos para almacenar información sobre productos y carritos de compras.
La aplicación tiene rutas definidas para manejar las operaciones relacionadas con productos y carritos.

**Gestión de Productos:**

- Los productos se definen en un modelo de Mongoose (Product.js) que incluye campos como nombre, precio, descripción, imagen y categoría.
Hay una ruta para obtener productos (GET /api/products) que permite paginación y filtrado por categoría, y otra ruta para crear nuevos productos (POST /api/products).

**Gestión del Carrito:**

- El carrito de compras se gestiona a través de (Cart.js), que permite almacenar productos y sus cantidades. Se pueden crear carritos (POST /api/cart), agregar productos a un carrito (POST /api/cart/:cartId/products/:productId), obtener el contenido del carrito (GET /api/cart/:cartId), y eliminar productos del carrito (DELETE /api/cart/:cartId/products/:productId).

**Interfaz de Usuario:**

- La aplicación incluye páginas HTML que utilizan Bootstrap para el diseño y jQuery para la interacción. Los usuarios pueden ver productos, filtrarlos por categoría, y agregar productos a su carrito.
Se implemento notificaciones para informar a los usuarios cuando un producto se ha agregado o eliminado del carrito.

**Almacenamiento Local:**

- El ID del carrito se almacena en el almacenamiento local del navegador para que los usuarios puedan mantener su carrito entre sesiones.

**NOTAS ADICIONALES**

En la carpeta "COLECCIONES DE DATOS" se encuentran dichas colecciones de la base de datos para importarlas dentro de Mongo Compass y poder probar el sistema de manera local sin hacer unos de Postman u otra herramienta y experimentar el funcionamiento como el usuario lo haria.

La estructura de la base de datos seria la siguiente:

mobiusDB

        └admin
        └config
        └local
        └products
                └carts
                └products

El inicio del sistema seria con "node server.js" a traves de la terminal una ves conectado el servidor y puesto en linea.
