const User = require('../models/users')
const {
	IncorrectDataUserCreation,
	IncorrectDataUserUpdateProfile,
	IncorrectDataUserUpdateAvatar,
	IncorrectDataUser,
	UserNotFoundInDb,
	errorsUserChecker
} = require('../Errors/Errors')

const getUsers = async (req, res) => {
	try {
		const data = await User.find({})
		res.send({ data })
	}
	catch (err) {
		errorsUserChecker(err, res)
	}
}

const getUserById = async (req, res) => {
	try {
		const { userId } = req.params
		const data = await User.findById(userId)
		if (!data) throw new UserNotFoundInDb()
		res.send({ data })
	} catch (err) {
		errorsUserChecker(err, res)
	}
}

const createUser = async (req, res) => {
	try {
		const { name, about, avatar } = req.body
		if (!name || !about || !avatar) throw new IncorrectDataUser()
		// if (!name || !about || !avatar) throw new IncorrectDataUserCreation()
		const data = await User.create({ name, about, avatar })
		if (!data) throw new Error()
		res.send({ data })
	} catch (err) {
		errorsUserChecker(err, res)
	}
}

const updateUserProfile = async (req, res) => {
	try {
		const { name, about } = req.body
		if (!name || !about) throw new IncorrectDataUser()
		// if (!name || !about) throw new IncorrectDataUserUpdateProfile()

		const userId = req.user._id
		const data = await User.findByIdAndUpdate(
			userId,
			{ 'name': name, 'about': about },
			{ new: true }
		)

		if (!data) throw new Error()
		res.send({ data })

	} catch (err) {
		errorsUserChecker(err, res)
	}
}

const updateUserAvatar = async (req, res) => {
	try {
		const { avatar } = req.body
		if (!avatar) throw new IncorrectDataUser()
		// if (!avatar) throw new IncorrectDataUserUpdateAvatar()
		const userId = req.user._id
		const data = await User.findByIdAndUpdate(
			userId,
			{ 'avatar': avatar },
			{ new: true }
		)

		if (!data) throw new Error()
		res.send({ data })

	} catch (err) {
		errorsUserChecker(err, res)
	}
}
module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserProfile,
	updateUserAvatar
}