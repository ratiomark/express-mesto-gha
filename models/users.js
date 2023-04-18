const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false, // необходимо добавить поле select
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
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 30,
//       trim: true,
//     },
//     about: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 30,
//       trim: true,
//     },
//     avatar: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { versionKey: false },
// );
// module.exports = mongoose.model('user', userSchema);
