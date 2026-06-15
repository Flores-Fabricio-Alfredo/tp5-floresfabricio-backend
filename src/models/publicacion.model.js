// src/models/publicacion.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    imagenAsociada: { type: DataTypes.TEXT, allowNull: true }, // Usamos TEXT porque Base64 genera cadenas de texto larguísimas
    fechaPublicacion: { type: DataTypes.STRING, allowNull: false }, // El enunciado pide expresamente gestionarla como string
    vigente: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'publicaciones',
    timestamps: false
});

// DEFINICION DE LA RELACION
// Un Empleado tiene muchas Publicaciones
Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId', as: 'publicaciones', onDelete: 'CASCADE' });
// Una Publicación pertenece a un Empleado
Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId', as: 'empleado' });

module.exports = Publicacion;