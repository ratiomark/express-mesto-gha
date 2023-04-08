const Card = require('../models/cards');

const {
  dataNotFoundInDb,
  errorsChecker,
} = require('../Errors/Errors');

const getCards = async (req, res) => {
  try {
    const data = await Card.find({}).populate('likes');
    res.send({ data });
  } catch (err) {
    errorsChecker(err, res);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const userId = req.user._id;
    const data = await Card.create({ name, link, owner: userId });

    res.send({ data });
  } catch (err) {
    errorsChecker(err, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const data = await Card.findByIdAndDelete({ _id: cardId });

    if (!data) throw dataNotFoundInDb;
    res.send({ data });
  } catch (err) {
    errorsChecker(err, res);
  }
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const data = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate('likes');

    if (!data) throw dataNotFoundInDb;
    res.send({ data });
  } catch (err) {
    errorsChecker(err, res);
  }
};

const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const userId = req.user._id;
    const data = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate('likes');

    if (!data) throw dataNotFoundInDb;
    res.send({ data });
  } catch (err) {
    errorsChecker(err, res);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
