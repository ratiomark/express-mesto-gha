const jwt = require('jsonwebtoken');
const { ApiError } = require('../Errors/Errors');

// eslint-disable-next-line consistent-return
const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(ApiError.Unauthorized());

    const userId = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userId = userId.id;
    next();
  } catch (error) {
    // сорян, я не понимаю
    // я уже проверил наличие токена, он точно есть
    // из токена я достаю айдишник и если с ним будет проблема, то в контроллере
    // отработает кастомная ошибка. Я не понимаю про какую ошибку вы говорите
    next(error);
  }
};
module.exports = authMiddleware;
