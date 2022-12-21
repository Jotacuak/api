const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Fingerprint', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo cliente ID."
                },
                isInt:{
                    msg: "Error en el campo cliente ID. Debe ser un número entero"
                }
            }
        },
        fingerprint: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo huella."
                },
                notEmpty:{
                    msg: "El campo huella no puede estar vacio."
                },
                isAlphaumeric:{
                    msg: "Error en el huella. Solo puede contener caracteres alfanuméricos."
                }
            }
        },
        
    }, {
        sequelize,
        tableName: 'fingerprints',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "clientId",
                using: "BTREE",
                fields: [
                    { name: "clientId" },
                ]
            },
        ]
    });
};
