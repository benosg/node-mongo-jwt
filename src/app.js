import express from "express";
import { json, urlencoded } from "express";
import authController from "./controllers/authController.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(authController);

export default app;
