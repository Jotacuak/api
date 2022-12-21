const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleDetail', {
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
                    msg: "Error en el campo venta ID. Debe ser un número entero."
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
                notNull:{
                    msg: "Debe rellenar el campo producto ID."
                },
                isInt:{
                    msg: "Error en el campo producto ID. Debe ser un número entero."
                }
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
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
            allowNull: false
        },
        validate: {
            notNull:{
                msg: "Debe rellenar el campo tipo de IVA."
            },
            isInt:{
                msg: "Error en el campo tipo de IVA. Debe ser un número entero."
            }
        }
    }, {
        sequelize,
        tableName: 'sale_details',
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
                name: "productId",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
        ]
    });
};
