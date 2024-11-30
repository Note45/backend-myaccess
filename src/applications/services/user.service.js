import { UserRepositorySingleton } from "../../infrastructure/db/repositories/user.repository.singleton.js";

class UserService {
  constructor() {
    this.client = new UserRepositorySingleton().getInstance();
  }

  async createUser(user) {
    const result = await this.client.createUser(user);

    return result;
  }
}

export { UserService };
