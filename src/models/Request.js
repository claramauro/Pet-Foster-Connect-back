import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class Request extends Model {}

Request.init(
    {
        status: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        family_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        animal_id: {
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
        tableName: "request",
    }
);

export { Request };
