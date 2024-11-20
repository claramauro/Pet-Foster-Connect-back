import dotenv from "dotenv";
import express from "express";
import { router } from "./src/routes/routes.js";
import cors from "cors";
import path from "node:path";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

import "./src/database/connection.js";

const app = express();
app.disable("x-powered-by");

app.use(
    cors({
        origin: [process.env.REACT_URL],
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
        exposedHeaders: ["Authorization"],
    })
);

const securePathToAssets = path.join(import.meta.dirname, "public");
app.use(express.static(securePathToAssets));
app.use(cookieParser());
app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});