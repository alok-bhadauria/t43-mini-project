// /middlewares/validateRequest.js
module.exports = function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.warn("⚠️ Validation failed:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
