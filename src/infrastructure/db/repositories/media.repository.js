import db from "pg";
import { config } from "dotenv";

config();

class MediaRepository {
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

  async createMedia(media) {
    const query = `
      INSERT INTO medias (title, type, description, tags, link, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      media.title,
      media.type,
      media.description,
      media.tags,
      media.link,
      media.user_id,
    ];

    const result = await this.client.query(query, values);

    return result.rows[0];
  }

  async getAllUserMediasById(userId) {
    const query = `
      SELECT * FROM medias
      WHERE user_id = $1
      ORDER BY createdAt DESC;  
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    return result.rows;
  }

  async getAllUserMediasByIdType(userId, type) {
    const query = `
      SELECT * FROM medias
      WHERE user_id = $1 AND type = $2
      ORDER BY createdAt DESC;  
    `;

    const values = [userId, type];

    const result = await this.client.query(query, values);

    return result.rows;
  }
}

export { MediaRepository };
