const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const ImageConfig = sequelize.define('ImageConfig', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo entidad."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo entidad."
                },
                isAlpha:{
                    msg: "Error en el campo entidad. Solo puede contener letras."
                }
            }
        },
        directory: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo directorio."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo directorio."
                }
            }
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo tipo."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo tipo."
                },
            }
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo formato."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo formato."
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
        contentAccepted: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo formato aceptado."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo formato aceptado."
                },
                isAlphanumeric:{
                    msg: "Error en el campo formato aceptado. Solo puede carácteres alfanuméricos."
                }
            }
        },
        extensionConversion: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo extensión."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo extensión."
                },
                isAlphanumeric:{
                    msg: "Error en el campo extensión. Solo puede carácteres alfanuméricos."
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
                    msg: "Debe rellenar el campo alto px."
                },
                isInt:{
                    msg: "Error en el campo alto px. Solo puede contener un número entero."
                },
                len:{
                    args: [[1, 100]],
                    msng: "Error en el campo calidad. Debe contener un número entre 1 y 100"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'image_configs',
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

    ImageConfig.associate = function(models){
        ImageConfig.hasMany(ImageResize, { as: "image_resizes", foreignKey: "imageConfigsId"});
    };

    return ImageConfig;
};
