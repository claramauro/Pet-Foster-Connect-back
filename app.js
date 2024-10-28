import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { sequelize } from "./src/database/connection.js";

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
