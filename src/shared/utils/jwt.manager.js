import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

class JWTManager {
  constructor(expiresIn = "1h") {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = expiresIn;
  }

  generateToken(payload) {
    try {
      const token = jwt.sign(payload, this.secret, {
        expiresIn: this.expiresIn,
      });

      return token;
    } catch (error) {
      throw new Error("Error when try to generate JWT");
    }
  }

  validateToken(token) {
    try {
      const decoded = jwt.verify(token, this.secret);

      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export { JWTManager };
