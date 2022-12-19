const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleIssue', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        payMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pay_methods',
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
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'carts',
                key: 'id'
            }
        },
        errorCode: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        errorMesage: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'sale_issues',
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
                name: "payMethodId",
                using: "BTREE",
                fields: [
                    { name: "payMethodId" },
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
                name: "cartId",
                using: "BTREE",
                fields: [
                    { name: "cartId" },
                ]
            },
        ]
    });
};
