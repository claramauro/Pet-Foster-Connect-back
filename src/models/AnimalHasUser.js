import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

class AnimalHasUser extends Model {}

AnimalHasUser.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		animal_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "animal_has_user",
		indexes: [
			{
				unique: true,
				fields: ["user_id", "role_id"],
			},
		],
	},
);

export { AnimalHasUser };
