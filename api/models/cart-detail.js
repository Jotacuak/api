const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CartDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'carts',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo carrito ID."
                },
                isInt:{
                    msg: "Error en el campo carrito ID. Debe ser un número entero"
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
        amount: {
            type: DataTypes.INTEGER,
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
        measureUnit: {
            type: DataTypes.STRING(10),
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
        tableName: 'cart_details',
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
                name: "cartId",
                using: "BTREE",
                fields: [
                    { name: "cartId" },
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
