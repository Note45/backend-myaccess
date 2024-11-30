import { UserRepositorySingleton } from "../../infrastructure/db/repositories/user.repository.singleton.js";
import { PasswordManager } from "../../shared/utils/password.manager.js";
import { JWTManager } from "../../shared/utils/jwt.manager.js";

class AuthService {
  constructor() {
    this.client = new UserRepositorySingleton().getInstance();
    this.passwordManagement = new PasswordManager();
    this.jwtManagement = new JWTManager();
  }

  async createUserToken(login, plainPassword) {
    const user = await this.client.getUserByUsernameOrEmail(login);

    const passwordEncrypted = await this.passwordManagement.comparePassword(
      plainPassword,
      user?.password
    );

    if (passwordEncrypted) {
      const userToken = await this.jwtManagement.generateToken({
        usernameOrEmail: login,
      });

      return {
        message: "Login realizado com sucesso.",
        token: userToken,
        payload: {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          email: user?.email,
          profileImage: user?.profileImage,
          description: user?.description,
        },
      };
    }

    return null;
  }
}

export { AuthService };
