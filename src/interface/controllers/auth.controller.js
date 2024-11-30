import { AuthService } from "../../applications/services/auth.service.js";

class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  async authUser(req, res, next) {
    try {
      const result = await this.service.createUserToken(
        req?.body?.usernameOrEmail,
        req?.body?.password
      );

      if (!result) {
        res.status(401).json({
          error: true,
          message: "Credenciais inválidas.",
          statusCode: 401,
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
