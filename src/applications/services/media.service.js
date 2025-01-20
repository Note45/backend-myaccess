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

  async getAllUserMedias(userId, type, limit = 10, offset = 1) {
    const user = await this.userRepository.getUserByUsernameOrEmail(userId);

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
}

export { MediaService };
