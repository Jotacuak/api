const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const MenuItem = sequelize.define('MenuItem', {
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
                    msg: "Debe rellenar el campo nombre."
                },
                notEmpty:{
                    msg: "Error en el campo nombre. Debe rellenar el campo nombre."
                }
            }
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'menus',
                key: 'id'
            },
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo menu Id."
                }
            }
        },
        customUrl: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo URL."
                },
                notEmpty:{
                    msg: "Error en el campo URL. Debe rellenar el campo URL."
                }
            }
        }
    }, {
        sequelize,
        tableName: 'menu-items',
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
                name: "menuId",
                using: "BTREE",
                fields: [
                    { name: "menuId" },
                ]
            },
        ]
    });

    MenuItem.associate = function(models){
        MenuItem.belongsTo(models.Menu, { as: "menu", foreignKey: "menuId"});
    };

    return MenuItem;
};