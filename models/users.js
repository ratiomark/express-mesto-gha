const mongoose = require('mongoose');
// Я не понимаю к чему комментарий "Нужно валидаровать"?
// Валидаторы уже работают с помощью мидлварин
// Нужно 2 раза валидировать одни и те же данные?
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
