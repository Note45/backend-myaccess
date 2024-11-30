import bcrypt from "bcrypt";

class PasswordManager {
  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  async encryptPassword(plainPassword) {
    try {
      const hash = await bcrypt.hash(plainPassword, this.saltRounds);

      return hash;
    } catch (error) {
      throw new Error("Error when try to encrypt password");
    }
  }

  async comparePassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      return isMatch;
    } catch (error) {
      throw new Error("Error when try to check passoword");
    }
  }
}

export { PasswordManager };
