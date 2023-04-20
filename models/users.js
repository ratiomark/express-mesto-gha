const mongoose = require('mongoose');
// Подстраховка? Тогда нужно делать 8 разных валидаций, ну чтобы наверняка подстаховаться 👍
// По факту, с такой логикой рассуждения, ревьюеры не должны принимать работы студентов,
// пока студенты не сделают 2 валидации. Не думаю, что такие требования где-то указаны

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      trim: true,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
