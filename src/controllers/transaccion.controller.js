// src/controllers/transaccion.controller.js
const Transaccion = require('../models/transaccion.model');

const transaccionCtrl = {};

// Dar de alta una Transaccion (POST)
transaccionCtrl.createTransaccion = async (req, res) => {
    /*  #swagger.tags = ['Transacciones']
        #swagger.summary = 'Dar de alta una Transaccion'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la transacción',
            required: true,
            schema: { $ref: '#/definitions/Transaccion' }
        }
    */
    try {
        const nuevaTransaccion = await Transaccion.create(req.body);
        res.status(201).json({ msg: 'Transacción registrada', data: nuevaTransaccion });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar transacción', error: error.message });
    }
};

// Recuperar TODAS las Transacciones Registradas (GET)
transaccionCtrl.getTransacciones = async (req, res) => {
    /*  #swagger.tags = ['Transacciones']
        #swagger.summary = 'Recuperar TODAS las Transacciones Registradas'
    */
    try {
        const transacciones = await Transaccion.findAll();
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener transacciones', error: error.message });
    }
};

// Recuperar el histórico de transacciones de un determinado cliente (GET) por email
transaccionCtrl.getHistoricoCliente = async (req, res) => {
    /*  #swagger.tags = ['Transacciones']
        #swagger.summary = 'Recuperar el histórico de transacciones de un determinado cliente por email'
    */
    try {
        const { email } = req.params;
        const historico = await Transaccion.findAll({ where: { emailCliente: email } });
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el histórico del cliente', error: error.message });
    }
};

// Recuperar TODAS las Transacciones por idiomas de origen y destino como PARAMS (GET)
transaccionCtrl.getPorIdiomas = async (req, res) => {
    /*  #swagger.tags = ['Transacciones']
        #swagger.summary = 'Recuperar TODAS las Transacciones por idiomas de origen y destino'
    */
    try {
        const { origen, destino } = req.params; // Ej: /api/transacciones/filtrar/es/en
        const transacciones = await Transaccion.findAll({
            where: {
                idiomaOrigen: origen,
                idiomaDestino: destino
            }
        });
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al filtrar por idiomas', error: error.message });
    }
};

module.exports = transaccionCtrl;