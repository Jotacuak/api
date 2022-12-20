const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CompanyDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mobileNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cifNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        openingDays: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        customerServiceHours: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'company-details',
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
};
