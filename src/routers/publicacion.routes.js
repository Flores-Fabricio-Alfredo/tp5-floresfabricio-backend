// src/routers/publicacion.routes.js
const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../controllers/publicacion.controller');

// Definición de las rutas para Publicaciones
router.post('/', publicacionCtrl.createPublicacion);                         // Dar de alta (POST)
router.get('/', publicacionCtrl.getPublicaciones);                           // Recuperar TODAS con Empleado (GET)
router.put('/:id', publicacionCtrl.updatePublicacion);                       // Modificar (PUT)
router.delete('/:id', publicacionCtrl.deletePublicacion);                    // Eliminar (DELETE)
router.get('/buscar/:titulo/:vigente', publicacionCtrl.buscarPublicaciones); // Búsqueda combinada (GET PARAMS)

module.exports = router;