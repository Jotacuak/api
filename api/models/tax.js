const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Tax = sequelize.define('Tax', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "Debe rellenar el campo tipo."
                },
                isNumeric:{
                    msg: "Error en el campo tipo. Debe ser un número"
                }
            }
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'taxes',
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

    Tax.associate = function(models){
        Tax.hasMany(models.Product, { as: "products", foreignKey: "taxId"});
    };

    return Tax;
};
