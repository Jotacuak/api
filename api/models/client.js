const Sequelize = require('sequelize');
const emailValidator = require('deep-email-validator');
module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define('Client', {
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
        telephone: {
            type: DataTypes.STRING(10),
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
        township: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo localidad."
                },
                notEmpty:{
                    msg: "El campo localidad no puede estar vacio."
                },
                isAlpha:{
                    msg: "Error en el campo localidad. Solo puede contener ser letras."
                }
            }
        },
        postalCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo código postal."
                },
                notEmpty:{
                    msg: "El campo código postal no puede estar vacio."
                },
                isNumeric:{
                    msg: "Error en el campo código postal. Solo puede contener ser números."
                }
            }
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo dirección."
                },
                notEmpty:{
                    msg: "El campo dirección no puede estar vacio."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'clients',
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

    Client.associate = function(models){
        Client.hasMany(models.Cart, { as: "carts", foreignKey: "clientId"});
        Client.hasMany(models.Fingerprint, { as: "fingerprints", foreignKey: "clientId"});
        Client.hasMany(models.Payback, { as: "paybacks", foreignKey: "clientId"});
        Client.hasMany(models.SaleIssue, { as: "sale_issues", foreignKey: "clientId"});
        Client.hasMany(models.Sale, { as: "sales", foreignKey: "clientId"});
    };

    return Client;
};
