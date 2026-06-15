// src/controllers/publicacion.controller.js
const Publicacion = require('../models/publicacion.model');
const Empleado = require('../models/empleado.model');
const { Op } = require('sequelize');

const publicacionCtrl = {};

// Dar de alta una Publicación (POST)
publicacionCtrl.createPublicacion = async (req, res) => {
    /*  #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Dar de alta una Publicación'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la publicación',
            required: true,
            schema: { $ref: '#/definitions/Publicacion' }
        }
    */
    try {
        // req.body debe incluir 'empleadoId' además de los campos de la publicación
        const nuevaPublicacion = await Publicacion.create(req.body);
        res.status(201).json({ msg: 'Publicación creada con éxito', data: nuevaPublicacion });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear publicación', error: error.message });
    }
};

// Recuperar TODAS las publicaciones incluyendo información de los empleados (GET)
publicacionCtrl.getPublicaciones = async (req, res) => {
    /*  #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Recuperar TODAS las publicaciones incluyendo información de los empleados'
    */
    try {
        const publicaciones = await Publicacion.findAll({
            include: [{ model: Empleado, as: 'empleado' }]
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener publicaciones', error: error.message });
    }
};

// Modificar una publicación (PUT)
publicacionCtrl.updatePublicacion = async (req, res) => {
    /*  #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Modificar una publicación'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la publicación a modificar',
            required: true,
            schema: { $ref: '#/definitions/Publicacion' }
        }
    */
    try {
        const { id } = req.params;
        const [updated] = await Publicacion.update(req.body, { where: { id } });
        if (updated === 0) return res.status(404).json({ msg: 'Publicación no encontrada' });
        
        const actualizada = await Publicacion.findByPk(id);
        res.status(200).json({ msg: 'Publicación modificada', data: actualizada });
    } catch (error) {
        res.status(500).json({ msg: 'Error al modificar la publicación', error: error.message });
    }
};

// Eliminar una publicación (DELETE)
publicacionCtrl.deletePublicacion = async (req, res) => {
    /*  #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Eliminar una publicación'
    */
    try {
        const { id } = req.params;
        const deleted = await Publicacion.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ msg: 'Publicación no encontrada' });
        res.status(200).json({ msg: 'Publicación eliminada de manera exitosa' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar publicación', error: error.message });
    }
};

// Recuperar Publicaciones basándose en una búsqueda combinada por params (GET)
publicacionCtrl.buscarPublicaciones = async (req, res) => {
    /*  #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Recuperar Publicaciones basándose en una búsqueda combinada por params'
    */
    try {
        const { titulo, vigente } = req.params; 
        
        // Convertimos el string 'true' o 'false' que llega por parámetro en un booleano real
        const esVigente = vigente === 'true';

        const resultados = await Publicacion.findAll({
            where: {
                titulo: { [Op.iLike]: `%${titulo}%` }, // iLike es insensible a mayusculas/minusculas en Postgres
                vigente: esVigente
            },
            include: [{ model: Empleado, as: 'empleado' }]
        });

        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ msg: 'Error en la búsqueda combinada', error: error.message });
    }
};

module.exports = publicacionCtrl;