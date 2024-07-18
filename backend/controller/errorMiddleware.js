// Error Middleware: This middleware will catch all errors that are thrown in the application
export const errorMiddleware = (err, req, res, next) => {
  console.log("errorMiddleware:", err);
  res.status(500).json({ error: err });
};
