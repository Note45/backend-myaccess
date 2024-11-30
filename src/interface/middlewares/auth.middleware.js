import { JWTManager } from "../../shared/utils/jwt.manager.js";

const jwtManager = new JWTManager();

const authMiddleware = async (req, res, next) => {
  try {
    const userToken = req?.headers["authorization"]?.split(" ")[1];

    const result = await jwtManager.validateToken(userToken);

    if (!result?.userNameOrEmail) {
      return res.status(401).json({
        error: true,
        message: "Credenciais inválidas.",
        statusCode: 401,
      });
    }

    req.userNameOrEmail = result?.userNameOrEmail;

    next();
  } catch (error) {
    console.log("Error when try to authenticate", error);

    return res.status(401).json({
      error: true,
      message: "Credenciais inválidas.",
      statusCode: 401,
    });
  }
};

export { authMiddleware };
