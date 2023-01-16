const Sequelize = require('sequelize');
const emailValidator = require('deep-email-validator');
module.exports = function(sequelize, DataTypes) {
    const Contact = sequelize.define('Contact', {
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
                    msg: "Error en el campo nombre. Solo puede contener ser letras."
                }
            }
        },
        surname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo apellido."
                },
                notEmpty:{
                    msg: "El campo apellido no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo apellido. Solo puede contener ser letras."
                }
            }
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo teléfono."
                },                
                notEmpty:{
                    msg: "El campo teléfono no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo teléfono. Solo puede contener números."
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo email."
                },
                notEmpty:{
                    msg: "El campo email no puede estar vacio."
                },
                customValidator(value) {
                    return emailValidator.validate(value).then((data) => {
                        if(data.valid == false){
                            throw new Error("Email incorrecto, no se permiten emails temporales");
                            
                        }
                    })
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
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fingerprints',
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
        }
    }, {
        sequelize,
        tableName: 'contacts',
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
                name: "fingerprintId",
                using: "BTREE",
                fields: [
                    { name: "fingerprintId" },
                ]
            },
        ]
    });
    
    Contact.associate = function(models){
        Contact.belongsTo(models.Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    };

    return Contact;
};
