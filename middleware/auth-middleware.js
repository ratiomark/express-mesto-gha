const jwt = require('jsonwebtoken');
const { ApiError } = require('../Errors/Errors');

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(ApiError.Unauthorized());

    const userId = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userId = userId.id;
    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = authMiddleware;
