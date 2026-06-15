// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Carga swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();

// Middlewares
// Aumentamos el límite para soportar strings Base64 largos del PTO 3
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: 'http://localhost:4200' })); // Conexión limpia con Angular

// Ruta hacia la documentación de Swagger interactiva
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Cargamos los módulos de direccionamiento de rutas (según tu carpeta src/routers)
app.use('/api/socios', require('./src/routers/socio.routes.js'));
app.use('/api/transacciones', require('./src/routers/transaccion.routes.js'));
app.use('/api/empleados', require('./src/routers/empleado.routes.js'));
app.use('/api/publicaciones', require('./src/routers/publicacion.routes.js'));

// Settings
app.set('port', process.env.PORT || 3000);

// Sincronizar Base de Datos y arrancar el servidor
// .sync() crea las tablas automáticamente en Postgres si aún no existen
// force en false crea las tablas solo si no existe, no borra datos en cada inicio
sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas de PostgreSQL sincronizadas');
        app.listen(app.get('port'), () => {
            console.log(`Server started on port ${app.get('port')}`);
        });
    })
    .catch(err => {
        console.error('No se pudo iniciar el servidor debido a un error en la BD:', err);
    });