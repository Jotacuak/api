const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
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
        price: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        taxId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'taxes',
                key: 'id'
            }
        },
        featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'product_categories',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'products',
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
                name: "taxId",
                using: "BTREE",
                fields: [
                    { name: "taxId" },
                ]
            },
            {
                name: "categoryId",
                using: "BTREE",
                fields: [
                    { name: "categoryId" },
                ]
            },
        ]
    });
};
