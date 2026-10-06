**DOCUMENTACIÓN DEL PROYECTO**

Brasago Express API

**Docente:** Jaider Quintero

**Asignatura:** Desarrollo web

**Estudiante:** Sebastian Acosta Soto

**Código:** 0182210001

**Semestre:** Décimo

**Año:** 2026

# **Capturas del proyecto**

## **Estructura del proyecto**

<img src="./media/media/image1.png"
style="width:3.1336in;height:6.9756in"
alt="Figura 1. Estructura de carpetas del proyecto brasago-express (config, database, features, routes, shared, swagger y server.ts)." />

**Figura 1.** Estructura de carpetas del proyecto brasago-express
(config, database, features, routes, shared, swagger y server.ts).

## **Modelos**

<img src="./media/media/image2.png" style="width:6in;height:5.45689in"
alt="Figura 2. Modelo Sequelize de Pagos (payment.model.ts)." />

**Figura 2.** Modelo Sequelize de Pagos (payment.model.ts).

<img src="./media/media/image3.png" style="width:6in;height:5.40937in"
alt="Figura 3. Modelo Sequelize de Ingredientes (ingredient.model.ts)." />

**Figura 3.** Modelo Sequelize de Ingredientes (ingredient.model.ts).

<img src="./media/media/image4.png" style="width:6in;height:5.39919in"
alt="Figura 4. Modelo Sequelize de Productos (product.model.ts)." />

**Figura 4.** Modelo Sequelize de Productos (product.model.ts).

<img src="./media/media/image5.png" style="width:6in;height:5.39851in"
alt="Figura 5. Modelo Sequelize de Ingredientes de receta (recipe-ingredient.model.ts)." />

**Figura 5.** Modelo Sequelize de Ingredientes de receta
(recipe-ingredient.model.ts).

<img src="./media/media/image6.png" style="width:6in;height:5.37407in"
alt="Figura 6. Modelo Sequelize de Entregas (delivery.model.ts)." />

**Figura 6.** Modelo Sequelize de Entregas (delivery.model.ts).

<img src="./media/media/image7.png" style="width:6in;height:5.36864in"
alt="Figura 7. Modelo Sequelize de Repartidores (delivery-driver.model.ts)." />

**Figura 7.** Modelo Sequelize de Repartidores
(delivery-driver.model.ts).

<img src="./media/media/image8.png"
style="width:6in;height:5.42838in" />

**Figura 8.** Modelo Sequelize de Sucursales (branch.model.ts).

<img src="./media/media/image9.png"
style="width:6in;height:5.38629in" />

**Figura 9.** Modelo Sequelize de Reservas (reservation.model.ts).

<img src="./media/media/image10.png"
style="width:6in;height:5.41344in" />

**Figura 10.** Modelo Sequelize de Mesas (table.model.ts).

<img src="./media/media/image11.png"
style="width:6in;height:5.35777in" />

**Figura 11.** Modelo Sequelize de Clientes (customer.model.ts).

<img src="./media/media/image12.png"
style="width:6in;height:5.43517in" />

**Figura 12.** Modelo Sequelize de Detalles de pedido
(order-detail.model.ts).

<img src="./media/media/image13.png"
style="width:6in;height:5.42498in" />

**Figura 13.** Modelo Sequelize de Pedidos (order.model.ts).

## **Asociaciones entre modelos**

<img src="./media/media/image14.png"
style="width:6in;height:1.77529in" />

**Figura 14.** Asociaciones del modelo de Pagos
(payments.associations.ts).

<img src="./media/media/image15.png"
style="width:6in;height:1.36185in" />

**Figura 15.** Asociaciones del modelo de Ingredientes
(ingredients.associations.ts).

<img src="./media/media/image16.png"
style="width:6in;height:1.68703in" />

**Figura 16.** Asociaciones del modelo de Productos
(products.associations.ts).

<img src="./media/media/image17.png"
style="width:6in;height:1.77597in" />

**Figura 17.** Asociaciones del modelo de Ingredientes de receta
(recipe-ingredients.associations.ts).

<img src="./media/media/image18.png"
style="width:6in;height:1.98167in" />

**Figura 18.** Asociaciones del modelo de Entregas
(deliveries.associations.ts).

<img src="./media/media/image19.png"
style="width:6in;height:1.57026in" />

**Figura 19.** Asociaciones del modelo de Repartidores
(delivery-drivers.associations.ts).

<img src="./media/media/image20.png"
style="width:6in;height:1.67821in" />

**Figura 20.** Asociaciones del modelo de Sucursales
(branches.associations.ts).

<img src="./media/media/image21.png"
style="width:6in;height:1.71011in" />

**Figura 21.** Asociaciones del modelo de Reservas
(reservations.associations.ts).

<img src="./media/media/image22.png"
style="width:6in;height:1.69043in" />

**Figura 22.** Asociaciones del modelo de Mesas
(tables.associations.ts).

<img src="./media/media/image23.png"
style="width:6in;height:1.66327in" />

**Figura 23.** Asociaciones del modelo de Clientes
(customers.associations.ts).

<img src="./media/media/image24.png"
style="width:6in;height:1.87237in" />

**Figura 24.** Asociaciones del modelo de Detalles de pedido
(order-details.associations.ts).

<img src="./media/media/image25.png"
style="width:6in;height:2.95316in" />

**Figura 25.** Asociaciones del modelo de Pedidos
(orders.associations.ts).

## **DTOs (objetos de transferencia de datos)**

<img src="./media/media/image26.png"
style="width:6in;height:1.89749in" />

**Figura 26.** DTO de creación de Pagos (create-payment.dto.ts).

<img src="./media/media/image27.png"
style="width:6in;height:2.43856in" />

**Figura 27.** DTO de actualización completa de Pagos
(update-payment.dto.ts).

<img src="./media/media/image28.png"
style="width:6in;height:1.32111in" />

**Figura 28.** DTO de actualización parcial de Pagos
(patch-payment.dto.ts).

<img src="./media/media/image29.png"
style="width:6in;height:3.06449in" />

**Figura 29.** DTO de respuesta de Pagos (response-payment.dto.ts).

<img src="./media/media/image30.png"
style="width:6in;height:1.66938in" />

**Figura 30.** DTO de creación de Ingredientes
(create-ingredient.dto.ts).

<img src="./media/media/image31.png"
style="width:6in;height:2.47318in" />

**Figura 31.** DTO de actualización completa de Ingredientes
(update-ingredient.dto.ts).

<img src="./media/media/image32.png"
style="width:6in;height:1.4148in" />

**Figura 32.** DTO de actualización parcial de Ingredientes
(patch-ingredient.dto.ts).

<img src="./media/media/image33.png"
style="width:6in;height:2.92125in" />

**Figura 33.** DTO de respuesta de Ingredientes
(response-ingredient.dto.ts).

<img src="./media/media/image34.png"
style="width:6in;height:1.74066in" />

**Figura 34.** DTO de creación de Productos (create-product.dto.ts).

<img src="./media/media/image35.png"
style="width:6in;height:2.49966in" />

**Figura 35.** DTO de actualización completa de Productos
(update-product.dto.ts).

<img src="./media/media/image36.png"
style="width:6in;height:1.46504in" />

**Figura 36.** DTO de actualización parcial de Productos
(patch-product.dto.ts).

<img src="./media/media/image37.png"
style="width:6in;height:2.90767in" />

**Figura 37.** DTO de respuesta de Productos (response-product.dto.ts).

<img src="./media/media/image38.png"
style="width:6in;height:1.77665in" />

**Figura 38.** DTO de creación de Ingredientes de receta
(create-recipe-ingredient.dto.ts).

<img src="./media/media/image39.png"
style="width:6in;height:2.50305in" />

**Figura 39.** DTO de actualización completa de Ingredientes de receta
(update-recipe-ingredient.dto.ts).

<img src="./media/media/image40.png"
style="width:6in;height:1.50645in" />

**Figura 40.** DTO de actualización parcial de Ingredientes de receta
(patch-recipe-ingredient.dto.ts).

<img src="./media/media/image41.png"
style="width:6in;height:3.1188in" />

**Figura 41.** DTO de respuesta de Ingredientes de receta
(response-recipe-ingredient.dto.ts).

<img src="./media/media/image42.png"
style="width:6in;height:2.50238in" />

**Figura 42.** DTO de creación de Entregas (create-delivery.dto.ts).

<img src="./media/media/image43.png"
style="width:6in;height:2.69993in" />

**Figura 43.** DTO de actualización completa de Entregas
(update-delivery.dto.ts).

<img src="./media/media/image44.png"
style="width:6in;height:1.79905in" />

**Figura 44.** DTO de actualización parcial de Entregas
(patch-delivery.dto.ts).

<img src="./media/media/image45.png"
style="width:6in;height:2.64766in" />

**Figura 45.** DTO de respuesta de Entregas (response-delivery.dto.ts).

<img src="./media/media/image46.png"
style="width:6in;height:1.57977in" />

**Figura 46.** DTO de creación de Repartidores
(create-delivery-driver.dto.ts).

<img src="./media/media/image47.png"
style="width:6in;height:2.21385in" />

**Figura 47.** DTO de actualización completa de Repartidores
(update-delivery-driver.dto.ts).

<img src="./media/media/image48.png"
style="width:6in;height:1.28309in" />

**Figura 48.** DTO de actualización parcial de Repartidores
(patch-delivery-driver.dto.ts).

<img src="./media/media/image49.png"
style="width:6in;height:3.3021in" />

**Figura 49.** DTO de respuesta de Repartidores
(response-delivery-driver.dto.ts).

<img src="./media/media/image50.png"
style="width:6in;height:1.69925in" />

**Figura 50.** DTO de creación de Sucursales (create-branch.dto.ts).

<img src="./media/media/image51.png"
style="width:6in;height:2.21724in" />

**Figura 51.** DTO de actualización completa de Sucursales
(update-branch.dto.ts).

<img src="./media/media/image52.png"
style="width:6in;height:1.54175in" />

**Figura 52.** DTO de actualización parcial de Sucursales
(patch-branch.dto.ts).

<img src="./media/media/image53.png"
style="width:6in;height:2.80584in" />

**Figura 53.** DTO de respuesta de Sucursales (response-branch.dto.ts).

<img src="./media/media/image54.png"
style="width:6in;height:1.91174in" />

**Figura 54.** DTO de creación de Reservas (create-reservation.dto.ts).

<img src="./media/media/image55.png"
style="width:6in;height:2.60489in" />

**Figura 55.** DTO de actualización completa de Reservas
(update-reservation.dto.ts).

<img src="./media/media/image56.png"
style="width:6in;height:1.43652in" />

**Figura 56.** DTO de actualización parcial de Reservas
(patch-reservation.dto.ts).

<img src="./media/media/image57.png"
style="width:6in;height:2.74677in" />

**Figura 57.** DTO de respuesta de Reservas
(response-reservation.dto.ts).

<img src="./media/media/image58.png"
style="width:6in;height:1.7203in" />

**Figura 58.** DTO de creación de Mesas (create-table.dto.ts).

<img src="./media/media/image59.png"
style="width:6in;height:2.12559in" />

**Figura 59.** DTO de actualización completa de Mesas
(update-table.dto.ts).

<img src="./media/media/image60.png"
style="width:6in;height:1.52138in" />

**Figura 60.** DTO de actualización parcial de Mesas
(patch-table.dto.ts).

<img src="./media/media/image61.png"
style="width:6in;height:2.5017in" />

**Figura 61.** DTO de respuesta de Mesas (response-table.dto.ts).

<img src="./media/media/image62.png"
style="width:6in;height:1.88119in" />

**Figura 62.** DTO de creación de Clientes (create-customer.dto.ts).

<img src="./media/media/image63.png"
style="width:6in;height:2.63544in" />

**Figura 63.** DTO de actualización completa de Clientes
(update-customer.dto.ts).

<img src="./media/media/image64.png"
style="width:6in;height:1.45689in" />

**Figura 64.** DTO de actualización parcial de Clientes
(patch-customer.dto.ts).

<img src="./media/media/image65.png"
style="width:6in;height:2.57637in" />

**Figura 65.** DTO de respuesta de Clientes (response-customer.dto.ts).

<img src="./media/media/image66.png"
style="width:6in;height:2.02851in" />

**Figura 66.** DTO de creación de Detalles de pedido
(create-order-detail.dto.ts).

<img src="./media/media/image67.png"
style="width:6in;height:2.63272in" />

**Figura 67.** DTO de actualización completa de Detalles de pedido
(update-order-detail.dto.ts).

<img src="./media/media/image68.png"
style="width:6in;height:1.43517in" />

**Figura 68.** DTO de actualización parcial de Detalles de pedido
(patch-order-detail.dto.ts).

<img src="./media/media/image69.png"
style="width:6in;height:2.77868in" />

**Figura 69.** DTO de respuesta de Detalles de pedido
(response-order-detail.dto.ts).

<img src="./media/media/image70.png"
style="width:6in;height:1.74542in" />

**Figura 70.** DTO de creación de Pedidos (create-order.dto.ts).

<img src="./media/media/image71.png"
style="width:6in;height:2.58792in" />

**Figura 71.** DTO de actualización completa de Pedidos
(update-order.dto.ts).

<img src="./media/media/image72.png"
style="width:6in;height:1.18398in" />

**Figura 72.** DTO de actualización parcial de Pedidos
(patch-order.dto.ts).

<img src="./media/media/image73.png"
style="width:6in;height:2.75764in" />

**Figura 73.** DTO de respuesta de Pedidos (response-order.dto.ts).

## **Repositorios**

<img src="./media/media/image74.png"
style="width:6in;height:4.91853in" />

**Figura 74.** Repositorio de Pagos (payments.repository.ts): capa de
acceso a datos.

<img src="./media/media/image75.png"
style="width:6in;height:5.01018in" />

**Figura 75.** Repositorio de Ingredientes (ingredients.repository.ts):
capa de acceso a datos.

<img src="./media/media/image76.png"
style="width:6in;height:5.04888in" />

**Figura 76.** Repositorio de Productos (products.repository.ts): capa
de acceso a datos.

<img src="./media/media/image77.png"
style="width:6in;height:5.04888in" />

**Figura 77.** Repositorio de Ingredientes de receta
(recipe-ingredients.repository.ts): capa de acceso a datos.

<img src="./media/media/image78.png"
style="width:6in;height:5.0129in" />

**Figura 78.** Repositorio de Entregas (deliveries.repository.ts): capa
de acceso a datos.

<img src="./media/media/image79.png"
style="width:6in;height:5.08758in" />

**Figura 79.** Repositorio de Repartidores
(delivery-drivers.repository.ts): capa de acceso a datos.

<img src="./media/media/image80.png"
style="width:6in;height:5.09436in" />

**Figura 80.** Repositorio de Sucursales (branches.repository.ts): capa
de acceso a datos.

<img src="./media/media/image81.png"
style="width:6in;height:5.16157in" />

**Figura 81.** Repositorio de Reservas (reservations.repository.ts):
capa de acceso a datos.

<img src="./media/media/image82.png"
style="width:6in;height:5.06857in" />

**Figura 82.** Repositorio de Mesas (tables.repository.ts): capa de
acceso a datos.

<img src="./media/media/image83.png"
style="width:6in;height:5.03734in" />

**Figura 83.** Repositorio de Clientes (customers.repository.ts): capa
de acceso a datos.

<img src="./media/media/image84.png"
style="width:6in;height:5.02648in" />

**Figura 84.** Repositorio de Detalles de pedido
(order-details.repository.ts): capa de acceso a datos.

<img src="./media/media/image85.png"
style="width:6in;height:5.06246in" />

**Figura 85.** Repositorio de Pedidos (orders.repository.ts): capa de
acceso a datos.

## **Servicios**

<img src="./media/media/image86.png"
style="width:6in;height:5.39172in" />

**Figura 86.** Servicio de Pagos (payments.service.ts).

<img src="./media/media/image87.png"
style="width:6in;height:5.42906in" />

**Figura 87.** Servicio de Ingredientes (ingredients.service.ts).

<img src="./media/media/image88.png"
style="width:6in;height:5.38968in" />

**Figura 88.** Servicio de Productos (products.service.ts).

<img src="./media/media/image89.png"
style="width:6in;height:5.36253in" />

**Figura 89.** Servicio de Ingredientes de receta
(recipe-ingredients.service.ts).

<img src="./media/media/image90.png"
style="width:6in;height:5.35302in" />

**Figura 90.** Servicio de Entregas (deliveries.service.ts).

<img src="./media/media/image91.png"
style="width:6in;height:5.37339in" />

**Figura 91.** Servicio de Repartidores (delivery-drivers.service.ts).

<img src="./media/media/image92.png"
style="width:6in;height:5.39851in" />

**Figura 92.** Servicio de Sucursales (branches.service.ts).

<img src="./media/media/image93.png"
style="width:6in;height:5.37678in" />

**Figura 93.** Servicio de Reservas (reservations.service.ts).

<img src="./media/media/image94.png"
style="width:6in;height:5.36728in" />

**Figura 94.** Servicio de Mesas (tables.service.ts).

<img src="./media/media/image95.png"
style="width:6in;height:5.35506in" />

**Figura 95.** Servicio de Clientes (customers.service.ts).

<img src="./media/media/image96.png"
style="width:6in;height:5.40937in" />

**Figura 96.** Servicio de Detalles de pedido
(order-details.service.ts).

<img src="./media/media/image97.png"
style="width:6in;height:5.38153in" />

**Figura 97.** Servicio de Pedidos (orders.service.ts).

## **Controladores**

<img src="./media/media/image98.png"
style="width:6in;height:5.40054in" />

**Figura 98.** Controlador de Pagos (payments.controller.ts).

<img src="./media/media/image99.png"
style="width:6in;height:5.36253in" />

**Figura 99.** Controlador de Ingredientes (ingredients.controller.ts).

<img src="./media/media/image100.png"
style="width:6in;height:5.389in" />

**Figura 100.** Controlador de Productos (products.controller.ts).

<img src="./media/media/image101.png"
style="width:6in;height:5.35777in" />

**Figura 101.** Controlador de Ingredientes de receta
(recipe-ingredients.controller.ts).

<img src="./media/media/image102.png"
style="width:6in;height:5.35709in" />

**Figura 102.** Controlador de Entregas (deliveries.controller.ts).

<img src="./media/media/image103.png"
style="width:6in;height:5.37475in" />

**Figura 103.** Controlador de Repartidores
(delivery-drivers.controller.ts).

<img src="./media/media/image104.png"
style="width:6in;height:5.38968in" />

**Figura 104.** Controlador de Sucursales (branches.controller.ts).

<img src="./media/media/image105.png"
style="width:6in;height:5.38357in" />

**Figura 105.** Controlador de Reservas (reservations.controller.ts).

<img src="./media/media/image106.png"
style="width:6in;height:5.40937in" />

**Figura 106.** Controlador de Mesas (tables.controller.ts).

<img src="./media/media/image107.png"
style="width:6in;height:5.36728in" />

**Figura 107.** Controlador de Clientes (customers.controller.ts).

<img src="./media/media/image108.png"
style="width:6in;height:5.38357in" />

**Figura 108.** Controlador de Detalles de pedido
(order-details.controller.ts).

<img src="./media/media/image109.png"
style="width:6in;height:5.36253in" />

**Figura 109.** Controlador de Pedidos (orders.controller.ts).

## **Rutas por módulo**

<img src="./media/media/image110.png"
style="width:6in;height:5.36864in" />

**Figura 110.** Rutas de Pagos (payments.routes.ts).

<img src="./media/media/image111.png"
style="width:6in;height:5.38832in" />

**Figura 111.** Rutas de Ingredientes (ingredients.routes.ts).

<img src="./media/media/image112.png"
style="width:6in;height:5.37475in" />

**Figura 112.** Rutas de Productos (products.routes.ts).

<img src="./media/media/image113.png"
style="width:6in;height:5.39308in" />

**Figura 113.** Rutas de Ingredientes de receta
(recipe-ingredients.routes.ts).

<img src="./media/media/image114.png"
style="width:6in;height:5.42566in" />

**Figura 114.** Rutas de Entregas (deliveries.routes.ts).

<img src="./media/media/image115.png"
style="width:6in;height:5.39919in" />

**Figura 115.** Rutas de Repartidores (delivery-drivers.routes.ts).

<img src="./media/media/image116.png"
style="width:6in;height:5.40054in" />

**Figura 116.** Rutas de Sucursales (branches.routes.ts).

<img src="./media/media/image117.png"
style="width:6in;height:5.42634in" />

**Figura 117.** Rutas de Reservas (reservations.routes.ts).

<img src="./media/media/image118.png"
style="width:6in;height:5.40462in" />

**Figura 118.** Rutas de Mesas (tables.routes.ts).

<img src="./media/media/image119.png"
style="width:6in;height:5.389in" />

**Figura 119.** Rutas de Clientes (customers.routes.ts).

<img src="./media/media/image120.png"
style="width:6in;height:5.39172in" />

**Figura 120.** Rutas de Detalles de pedido (order-details.routes.ts).

<img src="./media/media/image121.png"
style="width:6in;height:5.37746in" />

**Figura 121.** Rutas de Pedidos (orders.routes.ts).

## **Archivos de configuración y registro**

<img src="./media/media/image122.png"
style="width:6in;height:3.61575in" />

**Figura 122.** Registro centralizado de rutas (src/routes/index.ts).

<img src="./media/media/image123.png"
style="width:6in;height:4.00543in" />

**Figura 123.** Clase App de Express (src/config/index.ts):
configuración, middlewares, rutas, documentación y manejo de errores,
con carga previa de las asociaciones.

<img src="./media/media/image124.png"
style="width:6in;height:4.02037in" />

**Figura 124.** Punto de entrada de los seeders
(src/database/seeders/index.ts).

<img src="./media/media/image125.png"
style="width:6in;height:4.02851in" />

**Figura 125.** Archivo counts.ts dentro de src/database/seeders.

<img src="./media/media/image126.png"
style="width:6in;height:4.00679in" />

**Figura 126.** Registro de los módulos Swagger de cada feature
(src/swagger/index.ts).

## **Entorno y carga de datos iniciales**

<img src="./media/media/image127.png"
style="width:5.55881in;height:2.80858in" />

**Figura 127.** Variables de entorno (.env): puerto, motor de base de
datos y conexión a MySQL.

<img src="./media/media/image128.png"
style="width:4.72541in;height:6.39222in" />

**Figura 128.** Ejecución del script db:seed: conexión a MySQL, conteo
de registros por tabla y fin del SeedersRunner.

## **Documentación con Swagger**

<img src="./media/media/image129.png"
style="width:6in;height:2.9647in" />

**Figura 129.** Documentación Swagger UI de Brasago Express API:
endpoints del módulo de Pagos.

<img src="./media/media/image130.png"
style="width:6in;height:2.96741in" />

**Figura 130.** Swagger UI: respuestas documentadas de un endpoint de
Pagos (200, 401, entre otras).

## **Pruebas de endpoints del módulo de Pagos**

<img src="./media/media/image131.png"
style="width:6in;height:5.36728in" />

**Figura 131.** Prueba HTTP de consulta de pagos (payments.get.http) y
su respuesta 200 OK.

<img src="./media/media/image132.png"
style="width:6in;height:5.42023in" />

**Figura 132.** Prueba HTTP de creación de un pago
(payments.create.http) y su respuesta 201 Created.

<img src="./media/media/image133.png"
style="width:6in;height:5.37678in" />

**Figura 133.** Pruebas HTTP de actualización total (PUT) y parcial
(PATCH) de un pago (payments.update.http).

<img src="./media/media/image134.png"
style="width:6in;height:5.37475in" />

**Figura 134.** Prueba HTTP de eliminación de un pago
(payments.delete.http) y su respuesta 200 OK.
