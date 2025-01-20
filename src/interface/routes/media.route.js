import { Router } from "express";
import { MediaController } from "../controllers/media.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";

const mediaController = new MediaController();

const mediaRouter = Router();

mediaRouter.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  (req, res, next) => mediaController.createMedia(req, res, next)
);

export { mediaRouter };
