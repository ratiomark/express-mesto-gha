const jwt = require('jsonwebtoken')
const { ApiError } = require('../Errors/Errors')

const authMiddleware = (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) return next(ApiError.Unauthorized())

		const token = authorizationHeader.split(' ')[1]
		const userId = jwt.verify(token, JWT_TOKEN_SECRET)

		req.user = userId
		next()

	} catch (error) {
		next(error)
	}
}
module.exports = authMiddleware