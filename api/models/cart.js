const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Cart', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            }
        },
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fingerprints',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'carts',
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
                name: "clientId",
                using: "BTREE",
                fields: [
                    { name: "clientId" },
                ]
            },
            {
                name: "fingerprintId",
                using: "BTREE",
                fields: [
                    { name: "fingerprintId" },
                ]
            },
        ]
    });
};
