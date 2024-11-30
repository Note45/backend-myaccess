const notFound = async (req, res, next) => {
  res.status(404);
  const error = new Error("Not Found", req.originalUrl);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
