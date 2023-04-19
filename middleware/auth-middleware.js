const jwt = require('jsonwebtoken')
const { ApiError } = require('../Errors/Errors')

const authMiddleware = (req, res, next) => {
	try {
		const token = req.cookies.token
		if (!token) return next(ApiError.Unauthorized())

		const userId = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
		req.userId = userId.id
		next()

	} catch (error) {
		next(error)
	}
}
module.exports = authMiddleware