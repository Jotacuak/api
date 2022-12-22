const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const PayMethod = sequelize.define('PayMethod', {
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
                    msg: "Debe rellenar el campo unidad de medida."
                },
                isAlpha:{
                    msg: "Error en el campo nombre. Solo puede contener ser letras."
                }
            }
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'pay_methods',
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

    PayMethod.associate = function(models){
        PayMethod.hasMany(models.Payback, { as: "paybacks", foreignKey: "payMethodId"});
        PayMethod.hasMany(models.SaleIssue, { as: "sale_issues", foreignKey: "payMethodId"});
        PayMethod.hasMany(models.Sale, { as: "sales", foreignKey: "payMethodId"});
    };

    return PayMethod;
};
