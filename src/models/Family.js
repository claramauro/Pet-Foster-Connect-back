import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class Family extends Model {}

Family.init(
    {
        name: {
            type: DataTypes.TEXT,
        },
        adress: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        zipcode: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        department: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        city: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        url_image: {
            type: DataTypes.TEXT,
            unique: true,
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
        tableName: "family",
    }
);

export { Family };
