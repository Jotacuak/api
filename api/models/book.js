const Sequelize = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = function(sequelize, DataTypes) {
    
    const Book = sequelize.define('Book', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Nombre".'
                }
            }
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Autor".'
                },
            }
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Descripción".'
                }
            }
        },
        isbn: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "ISBN".'
                }
            }
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Número de páginas".'
                }
            }
        },
        publishedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Fecha de publicación".'
                }
            }
        },
    }, {
        sequelize,
        tableName: 'books',
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

    return Book;
};