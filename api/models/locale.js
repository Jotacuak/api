const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Locale', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        lenguageAlias: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        entityKey: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'locales',
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
};
