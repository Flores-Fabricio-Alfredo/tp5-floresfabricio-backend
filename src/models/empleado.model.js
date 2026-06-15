// src/models/empleado.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Empleado = sequelize.define('Empleado', {
    apellido: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    tableName: 'empleados',
    timestamps: false
});

module.exports = Empleado;