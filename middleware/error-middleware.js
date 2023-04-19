const { ApiError } = require('../Errors/Errors')

module.exports = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message })
	}

	res.status(500)
		.json({
			message: 'Что-то пошло не так',
			errorMessage: err.message,
		})
}