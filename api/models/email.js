const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Email = sequelize.define('Email', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        contactId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'contacts',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo huella ID."
                },
                isInt:{
                    msg: "Error en el campo huella ID. Debe ser un número entero"
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
                },
                isAlphaumeric:{
                    msg: "Error en el mensaje. Solo puede contener caracteres alfanuméricos."
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
            {
                name: "contactId",
                using: "BTREE",
                fields: [
                    { name: "contactId" },
                ]
            },
        ]
    });
    
    Email.associate = function(models){
        Email.belongsTo(models.Contact, { as: "contacts", foreignKey: "contactId"});
    };

    return Email;
};
