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
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo nombre."
                },
                notEmpty:{
                    msg: "El campo nombre no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo nombre.  Solo puede contener ser letras."
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
        taxId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'taxes',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo IVA ID."
                },
                isInt:{
                    msg: "Error en el campo IVA ID. Debe ser un número entero."
                }
            }
        },
        featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'product_categories',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo categoría ID."
                },
                isInt:{
                    msg: "Error en el campo categoría ID. Debe ser un número entero."
                }
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
