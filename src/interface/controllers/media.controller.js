import { MediaService } from "../../applications/services/media.service.js";

class MediaController {
  constructor() {
    this.service = new MediaService();
  }

  async createMedia(req, res, next) {
    try {
      if (!req?.file) {
        return res.status(400).json({ error: "File not send!" });
      }

      const result = await this.service.createMedia({
        user: req?.userNameOrEmail,
        file: req?.file,
        description: req?.body?.description,
        tags: req?.body?.tags,
        type: req?.body?.type,
        title: req?.body?.title,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUserMedias(req, res, next) {
    try {
      const result = await this.service.getAllUserMedias(
        req?.userNameOrEmail,
        req?.params?.type,
        req?.params?.limit,
        req?.params?.page
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { MediaController };
