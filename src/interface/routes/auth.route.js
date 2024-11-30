import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthController } from "../controllers/auth.controller.js";

const userController = new UserController();
const authController = new AuthController();

const authRouter = Router();

authRouter.post("/register", (req, res, next) =>
  userController.createUser(req, res, next)
);

authRouter.post("/login", (req, res, next) =>
  authController.authUser(req, res, next)
);

export { authRouter };
