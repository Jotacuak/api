const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Payback = sequelize.define('Payback', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        saleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sales',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo venta ID."
                },
                isInt:{
                    msg: "Error en el campo venta ID. Debe ser un número entero"
                }
            }
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo cliente ID."
                },
                isInt:{
                    msg: "Error en el campo cliente ID. Debe ser un número entero."
                }
            }
        },
        payMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pay_methods',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo método de pago ID."
                },
                isInt:{
                    msg: "Error en el campo método de pago ID. Debe ser un número entero."
                }
            }
        },
        reference: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo referencia."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo referencia."
                },
                isAlpha:{
                    msg: "Error en el campo referencia. Solo puede contener letras."
                }
            }
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo precio total."
                },
                isNumeric:{
                    msg: "Error en el campo precio total. Solo puede contener números."
                }
            }
        },
        totalBasePrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo precio base total."
                },
                isNumeric:{
                    msg: "Error en el campo precio base total. Solo puede contener números."
                }
            }
        },
        totalIvaPrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo precio iva total."
                },
                isNumeric:{
                    msg: "Error en el campo precio iva total. Solo puede contener números."
                }
            }
        },
        broadcastDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo fecha emisión ."
                },
                isDate:{
                    msg: "Error en el campo fecha emisión. Solo puede contener una fecha."
                }
            }
        },
        broadcastHour: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo hora emisión ."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'paybacks',
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
                name: "saleId",
                using: "BTREE",
                fields: [
                    { name: "saleId" },
                ]
            },
            {
                name: "clientId",
                using: "BTREE",
                fields: [
                    { name: "clientId" },
                ]
            },
            {
                name: "payMethodId",
                using: "BTREE",
                fields: [
                    { name: "payMethodId" },
                ]
            },
        ]
    });

    Payback.associate = function(models){
        Payback.belongsTo(models.Client, { as: "client", foreignKey: "clientId"});
        Payback.belongsTo(models.PayMethod, { as: "payMethod", foreignKey: "payMethodId"});
        Payback.hasMany(models.PaybackDetail, { as: "payback_details", foreignKey: "paybackId"});
        Payback.belongsTo(models.Sale, { as: "sale", foreignKey: "saleId"});
    };

    return Payback;
};
