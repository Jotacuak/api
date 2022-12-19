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
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        measurementUnit: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        taxType: {
            type: DataTypes.INTEGER,
            allowNull: false
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
