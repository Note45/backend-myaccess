import { Router } from "express";
import { HcController } from "../controllers/hc.controller.js";

const hcController = new HcController();

const hcRouter = Router();

hcRouter.get("/hc", (req, res, next) => hcController.hc(req, res, next));

export { hcRouter };
