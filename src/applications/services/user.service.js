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

  async updatePassword(userNameOrEmail, password, newPassword) {
    const user = await this.repository.getUserByUsernameOrEmail(userNameOrEmail);
  
    if (!user) {
      throw new Error("User not found!");
    }
  
    const isPasswordValid = await this.passwordManagement.comparePassword(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect!");
    }
  
    const encryptedNewPassword = await this.passwordManagement.encryptPassword(newPassword);
  
    await this.repository.updateUser(userNameOrEmail, { password: encryptedNewPassword });
  
    return { id: user.id, email: user.email };
  }
  

}

export { UserService };
