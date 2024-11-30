import { UserRepository } from "./user.repository.js";

class UserRepositorySingleton {
  constructor() {
    if (!UserRepositorySingleton?.instance) {
      UserRepositorySingleton.instance = new UserRepository();
    }
  }

  getInstance() {
    return UserRepositorySingleton?.instance;
  }
}

export { UserRepositorySingleton };
