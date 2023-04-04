class IncorrectDataCardCreation extends Error {
	constructor(message) {
		super(message);
		this.name = "IncorrectDataCardCreation";
		if (!message) {
			this.message = "Предоставьте корректные данные для создания новой карточки";
		}
		this.statusCode = 400;
	}
	getMessage() {
		return { message: this.message }
	}
}

class IncorrectDataUserCreation extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Предоставьте корректные данные для создания нового пользователя";
		}
		this.name = "IncorrectDataUserCreation";
		this.statusCode = 400;
	}
	getMessage() {
		return { message: this.message }
	}
}

class IncorrectDataUserUpdateProfile extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Предоставьте корректные данные для обновления профиля";
		}
		this.name = "IncorrectDataUserUpdateProfile";
		this.statusCode = 400;
	}
	getMessage() {
		return { message: this.message }
	}
}

class IncorrectDataUserUpdateAvatar extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Предоставьте корректные данные для обновления профиля";
		}
		this.name = "IncorrectDataUserUpdateAvatar";
		this.statusCode = 400;
	}
	getMessage() {
		return { message: this.message }
	}
}

class CardNotFoundInDb extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Карточка не найдена";
		}
		this.name = "IncorrectDataUserUpdateAvatar";
		this.statusCode = 404;
	}
	getMessage() {
		return { message: this.message }
	}
}

class UserNotFoundInDb extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Пользователь не найден";
		}
		this.name = "IncorrectDataUserUpdateAvatar";
		this.statusCode = 404;
	}
	getMessage() {
		return { message: this.message }
	}
}

class CardIdNotProvided extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Не предоставлен Id карточки";
		}
		this.name = "IncorrectDataUserUpdateAvatar";
		this.statusCode = 400;
	}
	getMessage() {
		return { message: this.message }
	}
}
class DefaultError extends Error {
	constructor(message) {
		super(message);
		if (!message) {
			this.message = "Что-то пошло не так";
		}
		this.name = "DefaultError";
		this.statusCode = 500;
	}
	getMessage() {
		return { message: this.message }
	}
}
const IncorrectDataCardCreationInstance = new IncorrectDataCardCreation()

// const IncorrectDataUserCreationInstance = new IncorrectDataUserCreation()

// const IncorrectDataUserUpdateProfileInstance = new IncorrectDataUserUpdateProfile()

// const IncorrectDataUserUpdateAvatarInstance = new IncorrectDataUserUpdateAvatar()

const CardNotFoundInDbInstance = new CardNotFoundInDb()

const UserNotFoundInDbInstance = new UserNotFoundInDb()

const DefaultErrorInstance = new DefaultError()
const CardIdNotProvidedInstance = new CardIdNotProvided()

const errorsUserChecker = (error, res) => {
	switch (error.constructor) {
		case UserNotFoundInDb:
			res.status(error.statusCode)
				.send(error.getMessage())
			break;
		case IncorrectDataUserCreation:
			res.status(error.statusCode)
				.send(error.getMessage())
			break;
		case IncorrectDataUserUpdateProfile:
			res.status(error.statusCode)
				.send(error.getMessage())
			break;
		case IncorrectDataUserUpdateAvatar:
			res.status(error.statusCode)
				.send(error.getMessage())
			break;
		default:
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
	}
}
module.exports = {
	IncorrectDataCardCreationInstance,
	IncorrectDataUserCreation,
	IncorrectDataUserUpdateProfile,
	IncorrectDataUserUpdateAvatar,
	// IncorrectDataUserCreationInstance,
	// IncorrectDataUserUpdateProfileInstance,
	// IncorrectDataUserUpdateAvatarInstance,
	CardNotFoundInDbInstance,
	UserNotFoundInDbInstance,
	DefaultErrorInstance,
	CardIdNotProvidedInstance,
	UserNotFoundInDb,
	errorsUserChecker
}