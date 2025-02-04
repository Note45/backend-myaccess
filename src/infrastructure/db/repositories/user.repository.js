import db from "pg";
import { config } from "dotenv";

config();

class UserRepository {
  constructor() {
    this.client = new db.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async createUser(user) {
    const query = `
      INSERT INTO Users (name, username, email, password, profileImage, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      user.name,
      user.username,
      user.email,
      user.password,
      user.profileImage,
      user.description,
    ];

    const result = await this.client.query(query, values);

    return result.rows[0];
  }

  async getUserByUsernameOrEmail(userNameOrEmail) {
    const query = `
      SELECT * FROM Users 
      WHERE email = $1 OR username = $1;
    `;

    const values = [userNameOrEmail];

    const result = await this.client.query(query, values);

    return result.rows[0] || null;
  }

  async updateUser(userNameOrEmail, updateData) {
    let query = "UPDATE Users SET ";
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(updateData)) {
      query += `${key} = $${index}, `;
      values.push(value);
      index++;
    }

    query = query.slice(0, -2);

    query += ` WHERE email = $${index} OR username = $${index};`;
    values.push(userNameOrEmail);

    const result = await this.client.query(query, values);

    if (result.rowCount === 0) {
      throw new Error("User not found!");
    }

    return { ...updateData, email: userNameOrEmail };
  }
}

export { UserRepository };
