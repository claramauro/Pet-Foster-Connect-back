import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

class Animal extends Model {}

Animal.init(
	{
		name: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		gender: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		race: {
			type: DataTypes.TEXT,
		},
		species: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		age: {
			type: DataTypes.INTEGER,
			allownull: false,
		},
		size: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allownull: false,
		},
		url_image: {
			type: DataTypes.TEXT,
			unique: true,
		},
		availability: {
			type: DataTypes.BOOLEAN,
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
		tableName: "animal",
	},
);

export { Animal };
