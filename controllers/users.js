const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users');
const {
	ApiError
} = require('../Errors/Errors');


const createUser = async (req, res, next) => {
	try {
		const { name, about, avatar, email, password } = req.body;
		const user = await User.findOne({ email })
		if (user) throw ApiError.Conflict()

		const passwordHash = await bcrypt.hash(password, 7)
		const data = await User.create({ name, about, avatar, password: passwordHash, email });
		res.send({ data });

	} catch (error) {
		next(error)
	}
};


const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email }).select('+password');
		if (!user) throw ApiError.Unauthorized()

		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) throw ApiError.Unauthorized()

		const token = jwt.sign(user.id, process.env.JWT_TOKEN_SECRET, { expiresIn: '7d' })
		res.cookie('refreshToken', token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true
		})
		res.json({ message: 'Успешный вход' })

	} catch (error) {
		next(error)
	}
}

const getUsers = async (req, res, next) => {
	try {
		const data = await User.find({});
		res.send({ data });
	} catch (error) {
		next(error)
	}
};

const getUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const data = await User.findById(userId);

		if (!data) throw ApiError.NotFound();
		res.send({ data });
	} catch (error) {
		next(error)
	}
};

const updateUserProfile = async (req, res, next) => {
	try {
		const { name, about } = req.body;

		const userId = req.user._id;
		const data = await User.findByIdAndUpdate(
			userId,
			{ name, about },
			{ new: true, runValidators: true },
		);
		if (!data) throw ApiError.BadRequest();
		res.send({ data });
	} catch (error) {
		next(error)
	}
};

const updateUserAvatar = async (req, res, next) => {
	try {
		const { avatar } = req.body;

		const userId = req.user._id;
		const data = await User.findByIdAndUpdate(
			userId,
			{ avatar },
			{ new: true, runValidators: true },
		);

		if (!data) throw ApiError.BadRequest();
		res.send({ data });
	} catch (error) {
		next(error)
	}
};

const getUserData = async (req, res, next) => {
	try {
		const userId = req.userId
		const user = await User.findById(userId)
		if (!user) throw ApiError.NotFound()
		res.json({ message: user })
	} catch (error) {
		next(error)
	}
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserProfile,
	updateUserAvatar,
	login,
	getUserData
};
