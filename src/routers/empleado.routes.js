// src/routers/empleado.routes.js
const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

// Definición de las rutas para Empleados
router.post('/', empleadoCtrl.createEmpleado);       // Dar de alta (POST)
router.get('/', empleadoCtrl.getEmpleados);         // Obtener todos (GET)
router.get('/:id', empleadoCtrl.getEmpleadoById);   // Obtener UN Empleado (GET)

module.exports = router;