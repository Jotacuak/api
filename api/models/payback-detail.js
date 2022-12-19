const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('PaybackDetail', {
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
            type: DataTypes.STRING(255),
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
};
