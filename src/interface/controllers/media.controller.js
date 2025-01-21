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
      const page = parseInt(req?.query?.page) || 1;
      const limit = parseInt(req?.query?.limit) || 10;

      const result = await this.service.getAllUserMedias(
        req?.userNameOrEmail,
        req?.query?.type,
        limit,
        page
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getMediaById(req, res, next) {
    try {
      const result = await this.service.getMediaById(req?.params.id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUserMediasByFilters(req, res, next) {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const limit = parseInt(req?.query?.limit) || 10;

      const result = await this.service.getAllUserMediasByFilters(
        req?.userNameOrEmail,
        {
          title: req?.query?.title,
          type: req?.query?.type,
          tags: req?.query?.tags,
        },
        limit,
        page
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateMediaById(req, res, next) {
    try {
      const result = await this.service.updateMediaById(req?.params?.id, {
        title: req?.body?.title,
        type: req?.body?.type,
        tags: req?.body?.tags,
        description: req?.body?.description,
        link: req?.body?.link,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteMediaById(req, res, next) {
    try {
      const result = await this.service.deleteMediaById(req.params.id);
      res.status(200).json({
        message: "Media deleted successfully",
        deletedMedia: result,
      });
    } catch (error) {
      next(error);
    }
  }
  

}

export { MediaController };
