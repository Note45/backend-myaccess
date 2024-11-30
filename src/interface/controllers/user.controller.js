import { UserService } from "../../applications/services/user.service.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async createUser(req, res, next) {
    try {
      const result = await this.service.createUser(req?.body);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const result = await this.service.updateUser(
        req?.userNameOrEmail,
        req?.body
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
