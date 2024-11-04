import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: "postgres",
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
    },
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Sequelize connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

export { sequelize };
