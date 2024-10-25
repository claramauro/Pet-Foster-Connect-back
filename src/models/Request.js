import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

class Request extends Model {}

Request.init(
	{
		statut: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allownull: false,
		},
		animal_id: {
			type: DataTypes.INTEGER,
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
		tableName: "request",
	},
);

export { Request };
