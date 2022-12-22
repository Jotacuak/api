const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const PaybackDetail = sequelize.define('PaybackDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        paybackId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'paybacks',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo abono ID."
                },
                isInt:{
                    msg: "Error en el campo abono ID. Debe ser un número entero"
                }
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo producto ID."
                },
                isInt:{
                    msg: "Error en el campo producto ID. Debe ser un número entero"
                }
            }
        },
        quantity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo cantidad."
                },
                isInt:{
                    msG: "Error en el campo cantidad. Debe ser un número entero"
                }
            }
        },
        price: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo precio."
                },
                isNumeric:{
                    msg: "Error en el campo precio. Debe ser un número"
                }
            }
        },
        measurementUnit: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo unidad de medida."
                },
                notEmpty:{
                    msg: "Error en el campo unidad de medida. Debe rellenar el campo unidad de medida."
                }
            }
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo nombre de producto."
                },
                notEmpty:{
                    msg: "Debe rellenar el campo nombre de producto."
                }
            }
        },
        taxType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo tipo de IVA."
                },
                isInt:{
                    msg: "Error en el campo tipo de IVA. Debe ser un número entero."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'payback_details',
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
                name: "paybackId",
                using: "BTREE",
                fields: [
                    { name: "paybackId" },
                ]
            },
            {
                name: "productId",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
        ]
    });

    PaybackDetail.associate = function(models){
        PaybackDetail.belongsTo(models.Payback, { as: "payback", foreignKey: "paybackId"});
        PaybackDetail.belongsTo(models.Product, { as: "product", foreignKey: "productId"});
    };

    return PaybackDetail;
};
