import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	{
		dialect: "postgres",
		define: {
			createdAt: "created_at",
			updatedAt: "updated_at",
			underscored: true,
		},
	},
);

export { sequelize };
