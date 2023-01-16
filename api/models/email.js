const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Email = sequelize.define('Email', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        addressee: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo mensaje."
                },
                notEmpty:{
                    msg: "El campo mensaje no puede estar vacio."
                }
            }
        },
        message: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo mensaje."
                },
                notEmpty:{
                    msg: "El campo mensaje no puede estar vacio."
                }
            }
        },
    }, {
        sequelize,
        tableName: 'emails',
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
    
    Email.associate = function(models){
    };

    return Email;
};
