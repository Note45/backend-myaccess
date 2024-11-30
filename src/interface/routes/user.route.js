import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userController = new UserController();

const userRouter = Router();

userRouter.patch("/update", authMiddleware, (req, res, next) =>
  userController.updateUser(req, res, next)
);

export { userRouter };
