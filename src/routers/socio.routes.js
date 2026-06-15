// src/routers/socio.routes.js
const express = require('express');
const router = express.Router();
const socioCtrl = require('../controllers/socio.controller');

// Definición de las rutas para Socios
router.post('/', socioCtrl.createSocio);             // Dar de alta (POST)
router.get('/', socioCtrl.getSocios);               // Recuperar TODOS (GET)
router.get('/activos', socioCtrl.getSociosActivos); // Recuperar ACTIVOS (GET)
router.put('/:id', socioCtrl.updateSocio);          // Modificar (PUT) - Recibe ID por parámetro
router.delete('/:id', socioCtrl.deleteSocio);       // Eliminar (DELETE) - Recibe ID por parámetro

module.exports = router;