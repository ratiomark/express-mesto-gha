const User = require('../models/users');
const {
	IncorrectData,
	DataNotFoundInDb,
	errorsChecker,
} = require('../Errors/Errors');

const getUsers = async (req, res) => {
	try {
		const data = await User.find({});
		res.send({ data });
	} catch (err) {
		errorsChecker(err, res);
	}
};

const getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		const data = await User.findById(userId);

		if (!data) throw new DataNotFoundInDb();
		res.send({ data });
	} catch (err) {
		errorsChecker(err, res);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, about, avatar } = req.body;
		const data = await User.create({ name, about, avatar });
		res.send({ data });
	} catch (err) {
		errorsChecker(err, res);
	}
};

const updateUserProfile = async (req, res) => {
	try {
		const { name, about } = req.body;

		const userId = req.user._id;
		const data = await User.findByIdAndUpdate(
			userId,
			{ name, about },
			{ new: true, runValidators: true },
		);
		if (!data) throw new IncorrectData();
		res.send({ data });
	} catch (err) {
		errorsChecker(err, res);
	}
};

const updateUserAvatar = async (req, res) => {
	try {
		const { avatar } = req.body;

		const userId = req.user._id;
		const data = await User.findByIdAndUpdate(
			userId,
			{ avatar },
			{ new: true, runValidators: true },
		);

		if (!data) throw new IncorrectData();
		res.send({ data });
	} catch (err) {
		errorsChecker(err, res);
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserProfile,
	updateUserAvatar,
};
