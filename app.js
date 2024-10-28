import dotenv from "dotenv";
import express from "express";
import { router } from "./src/routes/routes.js";

dotenv.config();

import "./src/database/connection.js";
import { notFound, errorHandler } from "./app/middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
