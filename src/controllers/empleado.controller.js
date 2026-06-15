// src/controllers/empleado.controller.js
const Empleado = require('../models/empleado.model');

const empleadoCtrl = {};

// Dar de alta un Empleado (POST)
empleadoCtrl.createEmpleado = async (req, res) => {
    /*  #swagger.tags = ['Empleados']
        #swagger.summary = 'Dar de alta un Empleado'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos del empleado',
            required: true,
            schema: { $ref: '#/definitions/Empleado' }
        }
    */
    try {
        const nuevoEmpleado = await Empleado.create(req.body);
        res.status(201).json({ msg: 'Empleado creado', data: nuevoEmpleado });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear empleado', error: error.message });
    }
};

// Obtener todos los Empleados (GET)
empleadoCtrl.getEmpleados = async (req, res) => {
    /*  #swagger.tags = ['Empleados']
        #swagger.summary = 'Obtener todos los Empleados'
    */
    try {
        const empleados = await Empleado.findAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener empleados', error: error.message });
    }
};

// Obtener UN Empleado (GET)
empleadoCtrl.getEmpleadoById = async (req, res) => {
    /*  #swagger.tags = ['Empleados']
        #swagger.summary = 'Obtener UN Empleado por ID'
    */
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByPk(id);
        if (!empleado) return res.status(404).json({ msg: 'Empleado no encontrado' });
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el empleado', error: error.message });
    }
};

module.exports = empleadoCtrl;