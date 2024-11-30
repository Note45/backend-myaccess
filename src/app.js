import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import json from "body-parser";
import { config } from "dotenv";
import cors from "cors";

import { notFound, errorHandler } from "./interface/middlewares/index.js";

import { authRouter } from "./interface/routes/auth.route.js";
import { hcRouter } from "./interface/routes/hc.route.js";

const app = express();

config();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(json());

app.use("/api/auth", authRouter);
app.use("/api", hcRouter);

app.use(notFound);
app.use(errorHandler);

export default app;