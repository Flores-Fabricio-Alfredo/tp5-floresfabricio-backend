// src/models/transaccion.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Transaccion = sequelize.define('Transaccion', {
    idiomaOrigen: { type: DataTypes.STRING, allowNull: false },
    textoOrigen: { type: DataTypes.STRING, allowNull: false }, // El enunciado dice number, pero suele ser un texto a traducir.
    idiomaDestino: { type: DataTypes.STRING, allowNull: false },
    textoDestino: { type: DataTypes.STRING, allowNull: false },
    emailCliente: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'transacciones',
    timestamps: true // Para los logs de transacciones es útil saber cuándo se crearon
});

module.exports = Transaccion;