// src/routers/transaccion.routes.js
const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../controllers/transaccion.controller');

// Definición de las rutas para Transacciones
router.post('/', transaccionCtrl.createTransaccion);                           // Dar de alta (POST)
router.get('/', transaccionCtrl.getTransacciones);                             // Recuperar TODAS (GET)
router.get('/cliente/:email', transaccionCtrl.getHistoricoCliente);            // Histórico por email (GET)
router.get('/filtrar/:origen/:destino', transaccionCtrl.getPorIdiomas);        // Filtrar por idiomas (GET PARAMS)

module.exports = router;