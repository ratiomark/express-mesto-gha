const MongooseError = require('mongoose').Error;

const incorrectData = new Error('Предоставьте корректные данные');
incorrectData.name = 'incorrectData';

const dataNotFoundInDb = new Error('Данные не найдены');
dataNotFoundInDb.name = 'dataNotFoundInDb';

const errorsChecker = (error, res) => {
  if (error instanceof MongooseError) {
    res.status(400).send({ message: 'Предоставьте корректные данные' });
    return;
  }
  switch (error.name) {
    case 'incorrectData':
      res.status(400).send({ message: error.message });
      break;
    case 'dataNotFoundInDb':
      res.status(404).send({ message: error.message });
      break;
    default:
      res.status(500).send({ message: 'Что-то пошло не так' });
  }
};

module.exports = {
  incorrectData,
  dataNotFoundInDb,
  errorsChecker,
};
