const MongooseError = require('mongoose').Error;

class ExtendedError extends Error {
	getMessage() {
		return { message: this.message };
	}
}

class IncorrectData extends ExtendedError {
	constructor(message) {
		super(message);
		this.name = 'IncorrectDataCardCreation';
		if (!message) {
			this.message = 'Предоставьте корректные данные';
		}
		this.statusCode = 400;
	}
}

class DataNotFoundInDb extends ExtendedError {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = 'Карточка не найдена';
		}
		this.name = 'IncorrectDataUserUpdateAvatar';
		this.statusCode = 404;
	}
}

// class DataNotFoundInDb extends ExtendedError {
// 	constructor(message) {
// 		super(message);
// 		if (!message) {
// 			this.message = 'Пользователь не найден';
// 		}
// 		this.name = 'IncorrectDataUserUpdateAvatar';
// 		this.statusCode = 404;
// 	}
// }

// class CardIdNotProvided extends ExtendedError {
// 	constructor(message) {
// 		super(message);
// 		if (!message) {
// 			this.message = 'Не предоставлен Id карточки';
// 		}
// 		this.name = 'IncorrectDataUserUpdateAvatar';
// 		this.statusCode = 400;
// 	}
// }

class DefaultError extends ExtendedError {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = 'Что-то пошло не так';
		}
		this.name = 'DefaultError';
		this.statusCode = 500;
	}
}

const DefaultErrorInstance = new DefaultError();

const errorsChecker = (error, res) => {
	if (error instanceof MongooseError) error = new IncorrectData();
	switch (error.constructor) {
		case DataNotFoundInDb:
			res.status(error.statusCode)
				.send(error.getMessage());
			break;
		case IncorrectData:
			res.status(error.statusCode)
				.send(error.getMessage());
			break;
		default:
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage());
	}
};

// const errorsCardChecker = (error, res) => {
// 	if (error instanceof MongooseError) error = new IncorrectData();
// 	switch (error.constructor) {
// 		case IncorrectData:
// 			res.status(error.statusCode)
// 				.send(error.getMessage());
// 			break;
// 		case DataNotFoundInDb:
// 			res.status(error.statusCode)
// 				.send(error.getMessage());
// 			break;
// 		default:
// 			res.status(DefaultErrorInstance.statusCode)
// 				.send(DefaultErrorInstance.getMessage());
// 	}
// };
module.exports = {
	IncorrectData,
	DataNotFoundInDb,

	errorsChecker,
};
