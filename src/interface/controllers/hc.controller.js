class HcController {
  async hc(req, res, next) {
    try {
      res.status(200).json({ message: "API is OK!" });
    } catch (error) {
      next(error);
    }
  }
}

export { HcController };
