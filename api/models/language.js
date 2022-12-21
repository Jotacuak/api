const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Language', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo nombre."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo nombre."
                },
                isAlpha:{
                    msg: "Error en el campo nombre. Solo puede contener ser letras."
                }
            }
        },
        alias: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo alias."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo alias."
                },
                isAlpha:{
                    msg: "Error en el campo alias. Solo puede contener ser letras."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'languages',
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
        ]
    });
};
