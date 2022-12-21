const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Locale', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        lenguageAlias: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo lenguaje alias."
                },
                notEmpty:{
                    msg: "El campo lenguaje alias no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo lenguaje alias. Solo puede contener letras."
                },
                isUppercase:{
                    msg: "Error en el campo lenguaje alias. Debe ser en mayúsculas"
                }
            }
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo entidad."
                },
                notEmpty:{
                    msg: "El campo entidad no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo entidad. Solo puede contener letras."
                }
            }
        },
        entityKey: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo llave entidad."
                },
                notEmpty:{
                    msg: "El campo llave entidad no puede estar vacio."
                },
                isInt:{
                    msg: "Error en el campo llave entidad. Solo puede contener un número."
                }
            }
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo clave."
                },
                notEmpty:{
                    msg: "El campo clave no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo clave. Solo puede contener letras."
                }
            }
        },
        value: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo valor."
                },
                notEmpty:{
                    msg: "El campo valor no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo valor. Solo puede contener letras."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'locales',
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
