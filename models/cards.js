const mongoose = require('mongoose');
// Я не понимаю к чему комментарий "Нужно валидаровать"?
// Валидаторы уже работают с помощью мидлварин
// Нужно 2 раза валидировать одни и те же данные?
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes:
   [{
     type: mongoose.Schema.Types.ObjectId,
     default: [],
     ref: 'user',
   }],
    createdAt: {
      type: Date,
      default: Date,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('card', cardSchema);
