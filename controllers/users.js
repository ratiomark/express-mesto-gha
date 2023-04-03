const User = require('../models/users')
const {
	IncorrectDataUserCreationInstance,
	IncorrectDataUserUpdateProfileInstance,
	IncorrectDataUserUpdateAvatarInstance,
	UserNotFoundInDbInstance,
	DefaultErrorInstance
} = require('../Errors/Errors')


const getUsers = (req, res) => {
	User.find({})
		.then(users => res.send({ data: users }))
		.catch(err => {
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}

const getUserById = (req, res) => {
	const userId = req.user._id
	User.findById(userId)
		.then(user => {
			if (!user) {
				res.status(UserNotFoundInDbInstance.statusCode)
				res.send(UserNotFoundInDbInstance.getMessage())
				return
			}
			res.send({ data: user })
		})
		.catch(err => {
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}

const createUser = (req, res) => {
	const { name, about, avatar } = req.body
	if (!name || !about || !avatar) {
		res.status(IncorrectDataUserCreationInstance.statusCode)
			.send(IncorrectDataUserCreationInstance.getMessage())
		return
	}
	User.create({ name, about, avatar })
		.then(newUser => res.send({ data: newUser }))
		.catch(err => {
			res.status(IncorrectDataUserCreationInstance.statusCode)
				.send(IncorrectDataUserCreationInstance.getMessage())
		})
}

const updateUserProfile = (req, res) => {
	const { name, about } = req.body
	if (!name || !about) {
		res.status(IncorrectDataUserUpdateProfileInstance.statusCode)
			.send(IncorrectDataUserUpdateProfileInstance.getMessage())
		return
	}
	const userId = req.user._id
	User.findByIdAndUpdate(
		userId,
		{ "name": name, "about": about },
		{ new: true }
	)
		.then(user => res.send({ data: user }))
		.catch(err => {
			res.status(IncorrectDataUserUpdateProfileInstance.statusCode)
				.send(IncorrectDataUserUpdateProfileInstance.getMessage())
		})
}

const updateUserAvatar = (req, res) => {
	const { avatar } = req.body
	if (!avatar) {
		res.status(IncorrectDataUserUpdateAvatarInstance.statusCode)
			.send(IncorrectDataUserUpdateAvatarInstance.getMessage())
		return
	}
	const userId = req.user._id
	User.findByIdAndUpdate(
		userId,
		{ "avatar": avatar },
		{ new: true }
	)
		.then(newUser => res.send({ data: newUser }))
		.catch(err => {
			res.status(IncorrectDataUserUpdateAvatarInstance.statusCode)
				.send(IncorrectDataUserUpdateAvatarInstance.getMessage())
		})
}
module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserProfile,
	updateUserAvatar
}