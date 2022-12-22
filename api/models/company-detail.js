const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const CompanyDetail = sequelize.define('CompanyDetail', {
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
                    msg: "El campo nombre no puede estar vacio ."
                },
                isAlpha:{
                    msg: "Error en el campo nombre. Solo puede contener ser letras."
                }
            }
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo teléfono."
                },                
                notEmpty:{
                    msg: "El campo teléfono no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo teléfono. Solo puede contener números."
                }
            }
        },
        mobileNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo teléfono móvil."
                },                
                notEmpty:{
                    msg: "El campo teléfono móvil no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo teléfono móvil. Solo puede contener números."
                }
            }
        },
        cifNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo NIF."
                },                
                notEmpty:{
                    msg: "El campo NIF no puede estar vacio."
                },
                isAlphanumeric:{
                    msg: "Error en el campo NIF. Solo puede contener caracteres alfanuméricos."
                }
            }
        },
        openingDays: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo días de apertura."
                },                
                notEmpty:{
                    msg: "El campo días de apertura no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo días de apertura. Solo puede contener números."
                },
                len:{
                    args: [[1,365]],
                    msg: "Error en el campo días de apertura. Debe ser un número comprendido entre 1 y 365"
                }
            }
        },
        customerServiceHours: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo horas de apertura."
                },                
                notEmpty:{
                    msg: "El campo horas de apertura no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo horas de apertura. Solo puede contener números."
                },
                len:{
                    args: [[1,24]],
                    msg: "Error en el campo horas de apertura. Debe ser un número comprendido entre 1 y 24"
                }
            }
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'company-details',
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

    CompanyDetail.associate = function(models){};

    return CompanyDetail;
};
