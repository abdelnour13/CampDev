const sequelize = require('../config/sequelize');

const { DataTypes } = require('sequelize');
const Utilisateur = require('./utilisateur');
const Role = require('./role');

const UtilisateurRole = sequelize.define('utilisateur_role', {
    idUtilisateur : {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'id'
        },
        allowNull: false,
        primaryKey: true
    },
    idRole : {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'idRole'
        },
        allowNull: false,
        primaryKey: true
    }
}, {timestamps : false});

module.exports = UtilisateurRole;