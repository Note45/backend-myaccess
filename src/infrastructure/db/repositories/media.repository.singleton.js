import { MediaRepository } from "./media.repository.js";

class MediaRepositorySingleton {
  constructor() {
    if (!MediaRepositorySingleton?.instance) {
      MediaRepositorySingleton.instance = new MediaRepository();
    }
  }

  getInstance() {
    return MediaRepositorySingleton?.instance;
  }
}

export { MediaRepositorySingleton };
