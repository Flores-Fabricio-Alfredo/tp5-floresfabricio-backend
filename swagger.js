// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Gestión - TP5 - Flores Fabricio Alfredo',
        description: 'Documentación automatizada de la API-REST para el Trabajo Práctico N°5.',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    tags: [
        { name: 'Socios', description: 'Operaciones relacionadas con los Socios (Punto 1)' },
        { name: 'Transacciones', description: 'Log de transacciones e idiomas (Punto 2)' },
        { name: 'Empleados', description: 'Gestión de empleados (Punto 3)' },
        { name: 'Publicaciones', description: 'Gestión de publicaciones en Base64 (Punto 3)' }
    ],
    definitions: {
        Socio: {
            nombre: 'Fabricio Alfredo',
            apellido: 'Flores',
            foto: 'https://example.com/foto.jpg',
            dni: '12345678',
            numeroSocio: 1001,
            activo: true
        },
        Transaccion: {
            idiomaOrigen: 'en',
            textoOrigen: 'Hello World',
            idiomaDestino: 'es',
            textoDestino: 'Hola Mundo',
            emailCliente: 'fabricio@mail.com'
        },
        Empleado: {
            nombre: 'Lucas',
            apellido: 'Acho',
            dni: '87654321',
            email: 'lucasacho@mail.com'
        },
        Publicacion: {
            titulo: 'Nuevo Lanzamiento',
            contenido: 'Texto descriptivo de la publicación.',
            imagenAsociada: 'data:image/png;base64,...',
            fechaPublicacion: '15-06-2026',
            vigente: true,
            empleadoId: 1
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // Apunta al archivo principal que carga las rutas

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Documentación de Swagger generada con éxito en swagger_output.json');
});