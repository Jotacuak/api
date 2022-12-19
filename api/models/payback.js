const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Payback', {
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
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        payMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pay_methods',
                key: 'id'
            }
        },
        reference: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        totalBasePrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        totalIvaPrice: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        broadcastDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        broadcastHour: {
            type: DataTypes.TIME,
            allowNull: false
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
};
