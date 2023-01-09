const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Faq = sequelize.define('Faq', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
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
        question: {
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
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo unidad de medida."
                },
                notEmpty:{
                    msg: "Error en el campo unidad de medida. Debe rellenar el campo unidad de medida."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'faqs',
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

    Faq.associate = function(models){};

    return Faq;
};