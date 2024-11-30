import { UserRepositorySingleton } from "../../infrastructure/db/repositories/user.repository.singleton.js";
import { PasswordManager } from "../../shared/utils/password.manager.js";

class UserService {
  constructor() {
    this.repository = new UserRepositorySingleton().getInstance();
    this.passwordManagement = new PasswordManager();
  }

  async createUser(user) {
    const passwordEncrypted = await this.passwordManagement.encryptPassword(
      user?.password
    );

    const formatedUser = {
      ...user,
      password: passwordEncrypted,
    };

    const result = await this.repository.createUser(formatedUser);

    delete result?.password;

    return result;
  }

  async updateUser(userNameOrEmail, user) {
    delete user?.username;
    delete user?.password;

    const result = await this.repository.updateUser(userNameOrEmail, user);

    delete result?.password;

    return result;
  }
}

export { UserService };
