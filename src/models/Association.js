import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class Association extends Model {}

Association.init(
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
        role: {
            type: DataTypes.STRING,
            allownull: false,
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
        tableName: "association",
    }
);

export { Association };
