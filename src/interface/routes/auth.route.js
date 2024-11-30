import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userController = new UserController();

const authRouter = Router();

authRouter.post("/register", (req, res, next) =>
  userController.createUser(req, res, next)
);

export { authRouter };
