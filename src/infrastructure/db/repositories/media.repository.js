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

  async getAllUserMediasById(userId, limit = 10, offset = 1) {
    const query = `
      SELECT * FROM medias
      WHERE user_id = $1
      ORDER BY createdAt DESC
      LIMIT $2 OFFSET $3;;  
    `;

    const values = [userId, limit, offset - 1];

    const result = await this.client.query(query, values);

    return {
      total: result.rowCount,
      perPage: limit,
      medias: result.rows,
    };
  }

  async getAllUserMediasByIdType(userId, type, limit = 10, offset = 1) {
    const query = `
      SELECT * FROM medias
      WHERE user_id = $1 AND type = $2
      ORDER BY createdAt DESC
      LIMIT $3 OFFSET $4;  
    `;

    const values = [userId, type, limit, offset - 1];

    const result = await this.client.query(query, values);

    return {
      total: result.rowCount,
      perPage: limit,
      medias: result.rows,
    };
  }

  async getMediaById(mediaId) {
    const query = `
      SELECT * FROM medias 
      WHERE id = $1;
    `;

    const values = [mediaId];

    const result = await this.client.query(query, values);

    return result.rows[0] || null;
  }

  async getAllUserMediasByFilters(
    userId,
    filters = {},
    limit = 10,
    offset = 1
  ) {
    let whereClauses = ["user_id = $1"];
    let values = [userId];
    let paramIndex = 2;

    if (filters?.type) {
      whereClauses.push(`type = $${paramIndex}`);
      values.push(filters?.type);
      paramIndex++;
    }

    if (filters?.title) {
      whereClauses.push(`title ILIKE $${paramIndex}`);
      values.push(`%${filters?.title}%`);
      paramIndex++;
    }

    if (filters?.tags) {
      whereClauses.push(`$${paramIndex} = ANY(tags)`);
      values.push(filters?.tags);
      paramIndex++;
    }

    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const query = `
      SELECT * FROM medias
      ${whereClause}
      ORDER BY createdAt DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
    `;

    values.push(limit, offset - 1);
    const result = await this.client.query(query, values);

    return {
      total: result.rowCount,
      perPage: limit,
      medias: result.rows,
    };
  }

  async updateMediaById(mediaId, updates = {}) {
    let setClauses = [];
    let values = [];
    let paramIndex = 1;

    if (updates?.title) {
      setClauses.push(`title = $${paramIndex}`);
      values.push(updates?.title);
      paramIndex++;
    }

    if (updates?.type) {
      setClauses.push(`type = $${paramIndex}`);
      values.push(updates?.type);
      paramIndex++;
    }

    if (updates?.description) {
      setClauses.push(`description = $${paramIndex}`);
      values.push(updates?.description);
      paramIndex++;
    }

    if (updates?.tags) {
      setClauses.push(`tags = $${paramIndex}`);
      values.push(updates?.tags);
      paramIndex++;
    }

    if (updates?.link) {
      setClauses.push(`link = $${paramIndex}`);
      values.push(updates?.link);
      paramIndex++;
    }

    values.push(mediaId);

    const query = `
      UPDATE medias
      SET ${setClauses.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *;
    `;

    const result = await this.client.query(query, values);

    if (result.rowCount === 0) {
      throw new Error("Media not found!");
    }

    return result.rows[0];
  }

  async deleteMediaById(mediaId) {
    const query = `
      DELETE FROM medias
      WHERE id = $1
      RETURNING *;
    `;

    const values = [mediaId];

    const result = await this.client.query(query, values);

    if (result.rowCount === 0) {
      throw new Error("Media not found!");
    }

    return result.rows[0];
  }

  async countMediaByUserId(userId) {
    const query = `
      SELECT 
          type, 
          COUNT(*) AS type_count
      FROM 
          medias
      WHERE 
          user_id = $1
      GROUP BY 
          type
      ORDER BY 
          type_count DESC;
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    const defaultCounts = {
      video: 0,
      image: 0,
      audio: 0,
    };

    result.rows.forEach((row) => {
      defaultCounts[row.type] = parseInt(row.type_count, 10);
    });

    return defaultCounts;
  }
}

export { MediaRepository };
