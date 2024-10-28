import dotenv from "dotenv";
import express from "express";
import { router } from "./src/routes/routes.js";

dotenv.config();

const app = express();

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
