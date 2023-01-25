const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Menu = sequelize.define('Menu', {
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
    }, {
        sequelize,
        tableName: 'menus',
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

    Menu.associate = function(models){
        Menu.hasMany(models.MenuItem, { as: "menuItems", foreignKey: "menuId"});
    };

    return Menu;
};