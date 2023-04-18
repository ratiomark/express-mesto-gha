

class ApiError extends Error {
	constructor(status, message) {
		super(message)
		this.status = status
		this.message = message
	}

	static Unauthorized(message = 'У вас нет доступа') {
		return new ApiError(401, message)
	}

	static NotFound(message = 'Данные не найдеты') {
		return new ApiError(404, message)
	}

	static Conflict(message = 'Пользователь с таким имейлом уже существует') {
		return new ApiError(409, message)
	}

	static BadRequest(message = 'Предоставьте корректные данные') {
		return new ApiError(400, message)
	}
}



// const MongooseError = require('mongoose').Error;

// const incorrectData = new Error('Предоставьте корректные данные');
// incorrectData.name = 'incorrectData';

// const dataNotFoundInDb = new Error('Данные не найдены');
// dataNotFoundInDb.name = 'dataNotFoundInDb';

module.exports = { ApiError };
