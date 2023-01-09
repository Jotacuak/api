const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const SaleIssue = sequelize.define('SaleIssue', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        payMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pay_methods',
                key: 'id'
            },
            validate: {
                isInt:{
                    msg: "Error en el campo método de pago ID. Debe ser un número entero."
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
                isInt:{
                    msg: "Error en el campo cliente ID. Debe ser un número entero."
                }
            }
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'carts',
                key: 'id'
            },
            validate: {
                isInt:{
                    msg: "Error en el campo carrito ID. Debe ser un número entero."
                }
            }
        },
        errorCode: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo código error."
                },
                isInt:{
                    msg: "Error en el campo código error. Debe ser un número entero."
                }
            }
        },
        errorMesage: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo mensaje error."
                },
                isAlphanumeric:{
                    msg: "Error en el campo mensaje error. Debe contener carácteres alfanuméricos."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'sale_issues',
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
                name: "payMethodId",
                using: "BTREE",
                fields: [
                    { name: "payMethodId" },
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
                name: "cartId",
                using: "BTREE",
                fields: [
                    { name: "cartId" },
                ]
            },
        ]
    });

    SaleIssue.associate = function(models){
        SaleIssue.belongsTo(models.Cart, { as: "cart", foreignKey: "cartId"});
        SaleIssue.belongsTo(models.Client, { as: "client", foreignKey: "clientId"});
        SaleIssue.belongsTo(models.PayMethod, { as: "payMethod", foreignKey: "payMethodId"});
    };

    return SaleIssue;
};
