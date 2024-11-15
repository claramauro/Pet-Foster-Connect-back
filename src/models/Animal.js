import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class Animal extends Model {
}

Animal.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        gender: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        race: {
            type: DataTypes.TEXT,
        },
        species: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url_image: {
            type: DataTypes.TEXT,
            unique: true,
        },

        slug : {
            type: DataTypes.TEXT,
            unique: true,
        },
        
        availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        family_id: {
            type: DataTypes.INTEGER,
        },
        association_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
        updated_at: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "animal",
    },
);

export { Animal };

