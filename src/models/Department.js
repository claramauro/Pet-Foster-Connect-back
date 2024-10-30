import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class Department extends Model {}

Department.init(
    {
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        tableName: "department",
    }
);

export { Department };
