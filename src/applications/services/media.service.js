import { MediaRepositorySingleton } from "../../infrastructure/db/repositories/media.repository.singleton.js";
import { UserRepositorySingleton } from "../../infrastructure/db/repositories/user.repository.singleton.js";
import { config } from "dotenv";
import { uploadFileToS3 } from "../../infrastructure/providers/s3.provider.js";

config();

class MediaService {
  constructor() {
    this.mediaRepository = new MediaRepositorySingleton().getInstance();
    this.userRepository = new UserRepositorySingleton().getInstance();
  }

  async createMedia(media) {
    const user = await this.userRepository.getUserByUsernameOrEmail(media.user);

    const fileBuffer = media.file.buffer;
    const mimeType = media.file.mimetype;
    const originalName = media.file.originalname;
    const key = `${media.user}/${media.type}/${Date.now()}-${originalName}`;

    const fileUrl = await uploadFileToS3(
      process.env.AWS_BUCKET_NAME,
      fileBuffer,
      key,
      mimeType
    );

    const mediaToSave = {
      title: media.title,
      type: media.type,
      description: media.description,
      tags: media.tags,
      link: fileUrl,
      user_id: user.id,
    };

    const mediaCreated = await this.mediaRepository.createMedia(mediaToSave);

    return mediaCreated;
  }

  async getAllUserMedias(userNameOrEmail, type, limit = 10, offset = 1) {
    const user = await this.userRepository.getUserByUsernameOrEmail(
      userNameOrEmail
    );

    if (type) {
      return await this.mediaRepository.getAllUserMediasByIdType(
        user.id,
        type,
        limit,
        offset
      );
    }

    return await this.mediaRepository.getAllUserMediasById(
      user.id,
      limit,
      offset
    );
  }

  async getMediaById(mediaId) {
    return await this.mediaRepository.getMediaById(mediaId);
  }

  async getAllUserMediasByFilters(
    userNameOrEmail,
    filters = {},
    limit = 10,
    offset = 1
  ) {
    const user = await this.userRepository.getUserByUsernameOrEmail(
      userNameOrEmail
    );

    return await this.mediaRepository.getAllUserMediasByFilters(
      user.id,
      filters,
      limit,
      offset
    );
  }

  async updateMediaById(mediaId, updates = {}) {
    return await this.mediaRepository.updateMediaById(mediaId, updates);
  }

  async deleteMediaById(mediaId) {
    return await this.mediaRepository.deleteMediaById(mediaId);
  }

  async counterUserMediaByLogin(userNameOrEmail) {
    const user = await this.userRepository.getUserByUsernameOrEmail(
      userNameOrEmail
    );

    const mediaQuantity = await this.mediaRepository.countMediaByUserId(
      user.id
    );

    return mediaQuantity;
  }
}

export { MediaService };
