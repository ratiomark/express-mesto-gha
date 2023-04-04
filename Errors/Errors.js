const MongooseError = require('mongoose').Error

class ExtendedError extends Error {
	constructor(message) {
		super(message)
	}
	getMessage() {
		return { message: this.message }
	}
}
class IncorrectDataCard extends ExtendedError {
	constructor(message) {
		super(message)
		this.name = 'IncorrectDataCardCreation'
		if (!message) {
			this.message = 'Предоставьте корректные данные'
		}
		this.statusCode = 400
	}
	// getMessage() {super()
	// 	return { message: this.message }
	// }
}

class IncorrectDataUser extends ExtendedError {
	constructor(message) {
		super(message)
		if (!message) {
			this.message = 'Предоставьте корректные данные'
		}
		this.name = 'IncorrectDataUser'
		this.statusCode = 400
	}

}


class CardNotFoundInDb extends Error {
	constructor(message) {
		super(message)
		if (!message) {
			this.message = 'Карточка не найдена'
		}
		this.name = 'IncorrectDataUserUpdateAvatar'
		this.statusCode = 404
	}
	getMessage() {
		return { message: this.message }
	}
}

class UserNotFoundInDb extends Error {
	constructor(message) {
		super(message)
		if (!message) {
			this.message = 'Пользователь не найден'
		}
		this.name = 'IncorrectDataUserUpdateAvatar'
		this.statusCode = 404
	}
	getMessage() {
		return { message: this.message }
	}
}

class CardIdNotProvided extends Error {
	constructor(message) {
		super(message)
		if (!message) {
			this.message = 'Не предоставлен Id карточки'
		}
		this.name = 'IncorrectDataUserUpdateAvatar'
		this.statusCode = 400
	}
	getMessage() {
		return { message: this.message }
	}
}
class DefaultError extends Error {
	constructor(message) {
		super(message)
		if (!message) {
			this.message = 'Что-то пошло не так'
		}
		this.name = 'DefaultError'
		this.statusCode = 500
	}
	getMessage() {
		return { message: this.message }
	}
}

const DefaultErrorInstance = new DefaultError()

const errorsUserChecker = (error, res) => {
	if (error instanceof MongooseError) error = new IncorrectDataUser()
	switch (error.constructor) {
		case UserNotFoundInDb:
			res.status(error.statusCode)
				.send(error.getMessage())
			break
		case IncorrectDataUser:
			res.status(error.statusCode)
				.send(error.getMessage())
			break
		default:
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
	}
}

const errorsCardChecker = (error, res) => {
	if (error instanceof MongooseError) error = new IncorrectDataCard()
	switch (error.constructor) {
		case IncorrectDataCard:
			res.status(error.statusCode)
				.send(error.getMessage())
			break
		case CardNotFoundInDb:
			res.status(error.statusCode)
				.send(error.getMessage())
			break
		case CardIdNotProvided:
			res.status(error.statusCode)
				.send(error.getMessage())
			break
		default:
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
	}
}
module.exports = {
	IncorrectDataUser,
	// IncorrectDataUserCreation,
	// IncorrectDataUserUpdateProfile,
	// IncorrectDataUserUpdateAvatar,
	UserNotFoundInDb,
	errorsUserChecker,

	// IncorrectDataCardCreation,
	IncorrectDataCard,
	CardNotFoundInDb,
	CardIdNotProvided,
	errorsCardChecker
}