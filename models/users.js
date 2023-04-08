const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
