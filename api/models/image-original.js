const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageOriginal', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo entidad."
                },
                notEmpty:{
                    msg: "El campo path no puede estar vacio."
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
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo entidad ID."
                },
                isInt:{
                    msg: "Error en el campo entidad ID. Solo puede contener un número entero."
                }
            }
        },
        languageAlias: {
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
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo nombre del archivo."
                },
                notEmpty:{
                    msg: "El campo nombre del archivo no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo nombre del archivo. Solo puede contener ser letras."
                }
            }
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo contenido."
                },
                notEmpty:{
                    msg: "El campo contenido no puede estar vacio"
                },
            }
        },
        mimeType: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo formato de archivo."
                },
                notEmpty:{
                    msg: "El campo formato de archivo no puede estar vacio."
                },
            }
        },
        sizeBytes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo tamaño archivo."
                },
                isInt:{
                    msg: "Error en el campo tamaño archivo. Solo puede contener un número entero."
                }
            }
        },
        widthPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo ancho px."
                },
                isInt:{
                    msg: "Error en el campo ancho px. Solo puede contener un número entero."
                }
            }
        },
        heighPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo alto px."
                },
                isInt:{
                    msg: "Error en el campo alto px. Solo puede contener un número entero."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'image_originals',
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
