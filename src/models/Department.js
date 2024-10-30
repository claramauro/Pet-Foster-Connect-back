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
    },
    {
        sequelize,
        tableName: "department",
        timestamps: false,
    }
);

export { Department };
