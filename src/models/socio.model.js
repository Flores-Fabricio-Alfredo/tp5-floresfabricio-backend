// src/models/socio.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Socio = sequelize.define('Socio', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    foto: { type: DataTypes.STRING, allowNull: true }, // Almacena la URL de la imagen
    dni: { type: DataTypes.STRING, allowNull: false, unique: true }, // Evita que se repitan DNIs
    numeroSocio: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true } // Por defecto el socio entra activo
}, {
    tableName: 'socios',
    timestamps: false // Si querés que guarde automáticamente createdAt y updatedAt, ponelo en true
});

module.exports = Socio;