// src/controllers/socio.controller.js
const Socio = require('../models/socio.model');

const socioCtrl = {};

// Dar de alta un Socio (POST)
socioCtrl.createSocio = async (req, res) => {

    /* #swagger.tags = ['Socios']
        #swagger.summary = 'Dar de alta un Socio'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos del nuevo socio',
            required: true,
            schema: { $ref: '#/definitions/Socio' }
        } 
    */
    
    try {
        const nuevoSocio = await Socio.create(req.body);
        res.status(201).json({
            msg: 'Socio creado con éxito',
            data: nuevoSocio
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el socio', error: error.message });
    }
};

// Recuperar TODOS los Socios (GET)
socioCtrl.getSocios = async (req, res) => {

    /* #swagger.tags = ['Socios']
        #swagger.summary = 'Recuperar TODOS los Socios'
        #swagger.description = 'Retorna una lista completa de los socios registrados.'
    */
    
    try {
        const socios = await Socio.findAll();
        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los socios', error: error.message });
    }
};

// Recuperar los socios ACTIVOS (GET)
socioCtrl.getSociosActivos = async (req, res) => {
    /*  #swagger.tags = ['Socios']
        #swagger.summary = 'Recuperar los socios ACTIVOS'
    */
    try {
        const sociosActivos = await Socio.findAll({ where: { activo: true } });
        res.status(200).json(sociosActivos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los socios activos', error: error.message });
    }
};

// Modificar un Socio (PUT)
socioCtrl.updateSocio = async (req, res) => {
    /*  #swagger.tags = ['Socios']
        #swagger.summary = 'Modificar un Socio'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos del socio a modificar',
            required: true,
            schema: { $ref: '#/definitions/Socio' }
        }
    */
    try {
        const { id } = req.params;
        const [updatedRows] = await Socio.update(req.body, { where: { id } });
        
        if (updatedRows === 0) {
            return res.status(404).json({ msg: 'Socio no encontrado para modificar' });
        }
        
        const socioActualizado = await Socio.findByPk(id);
        res.status(200).json({ msg: 'Socio actualizado con éxito', data: socioActualizado });
    } catch (error) {
        res.status(500).json({ msg: 'Error al modificar el socio', error: error.message });
    }
};

// Eliminar un Socio (DELETE)
socioCtrl.deleteSocio = async (req, res) => {
    /*  #swagger.tags = ['Socios']
        #swagger.summary = 'Eliminar un Socio'
    */
    try {
        const { id } = req.params;
        const deleted = await Socio.destroy({ where: { id } });
        
        if (!deleted) {
            return res.status(404).json({ msg: 'Socio no encontrado' });
        }
        res.status(200).json({ msg: 'Socio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el socio', error: error.message });
    }
};

module.exports = socioCtrl;