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

mediaRouter.get("/search", authMiddleware, (req, res, next) =>
  mediaController.getAllUserMediasByFilters(req, res, next)
);

mediaRouter.get("/", authMiddleware, (req, res, next) =>
  mediaController.getAllUserMedias(req, res, next)
);

mediaRouter.get("/:id", authMiddleware, (req, res, next) =>
  mediaController.getMediaById(req, res, next)
);

mediaRouter.patch("/:id", authMiddleware, (req, res, next) =>
  mediaController.updateMediaById(req, res, next)
);

export { mediaRouter };
