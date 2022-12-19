const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageOriginal', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        languageAlias: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mimeType: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        sizeBytes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        widthPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        heighyPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'image_originals',
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
