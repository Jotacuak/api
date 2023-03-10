const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Cart = sequelize.define('Cart', {
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
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id'
            },
            validate: {
                notEmpty:{
                    msg: "Debe rellenar el campo cliente ID."
                },
                isInt:{
                    msg: "Error en el campo cliente ID. Debe ser un número entero"
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

    Cart.associate = function(models){
        Cart.hasMany(models.CartDetail, { as: "cart_details", foreignKey: "cartId"});
        Cart.hasMany(models.SaleIssue, { as: "sale_issues", foreignKey: "cartId"});
        Cart.hasMany(models.Sale, { as: "sales", foreignKey: "cartId"});
        Cart.belongsTo(models.Client, { as: "client", foreignKey: "clientId"});
        Cart.belongsTo(models.Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    };

    return Cart
};
