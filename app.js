import dotenv from "dotenv";
import express from "express";
import { router } from "./src/routes/routes.js";
import cors from "cors";

dotenv.config();

import "./src/database/connection.js";
import { notFound, errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost",
            "http://172.19.0.2",
            "http://172.19.0.2:5173/",
            "http://localhost:5173",
        ],
    })
);

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
