const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageResize', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        imageOriginalsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'image_originals',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo imagen original ID."
                },
                isInt:{
                    msg: "Error en el campo imagen original ID. Debe ser un número entero"
                }
            }
        },
        imageConfigsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'image_configs',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo huella ID."
                },
                isInt:{
                    msg: "Error en el campo huella ID. Debe ser un número entero"
                }
            }
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo título."
                },
                notEmpty:{
                    msg: "El campo título no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo título. Solo puede contener ser letras."
                }
            }
        },
        alt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo alt."
                },
                notEmpty:{
                    msg: "El campo alt no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo alt. Solo puede contener ser letras."
                }
            }
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
        grid: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo grid."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo grid."
                },
                isAlphanumeric:{
                    msg: "Error en el campo grid. Solo puede contener carácteres alfanuméricos."
                }
            }
        },
        sizeBytes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: falsee,
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
                isNumeric:{
                    msg: "Error en el campo alto px. Solo puede contener un número entero."
                }
            }
        },
        quality: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo calidad."
                },
                isInt:{
                    msg: "Error en el campo calidad. Solo puede contener un número entero."
                },
                len:{
                    args: [[1, 100]],
                    msng: "Error en el campo calidad. Debe contener un número entre 1 y 100"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'image_resizes',
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
                name: "imageOriginalsId",
                using: "BTREE",
                fields: [
                    { name: "imageOriginalsId" },
                ]
            },
            {
                name: "imageConfigsId",
                using: "BTREE",
                fields: [
                    { name: "imageConfigsId" },
                ]
            },
        ]
    });
};
