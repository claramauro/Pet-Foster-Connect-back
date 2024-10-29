import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from "../database/connection.js";

class User extends Model {
}

User.init(
    {
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        family_id: {
            type: DataTypes.INTEGER,
        },
        association_id: {
            type: DataTypes.INTEGER,
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
        tableName: "user",
    },
);

export { User };
