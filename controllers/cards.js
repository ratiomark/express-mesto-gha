const Card = require('../models/cards')

const {
	CardNotFoundInDb,
	CardIdNotProvided,
	errorsCardChecker,
	IncorrectDataCard
} = require('../Errors/Errors')


const getCards = async (req, res) => {
	try {
		const data = await Card.find({})

		if (!data) throw new Error()
		res.send({ data })

	} catch (err) {
		errorsCardChecker(err, res)
	}
}

const createCard = async (req, res) => {
	try {
		const { name, link } = req.body
		if (!name || !link) throw new IncorrectDataCard()

		const userId = req.user._id
		const data = await Card.create({ name, link, owner: userId })

		if (!data) throw new Error()
		res.send({ data })

	} catch (err) {
		errorsCardChecker(err, res)
	}
}

const deleteCard = async (req, res) => {
	try {
		const { cardId } = req.params
		if (!cardId) throw new CardIdNotProvided()

		const data = await Card.findByIdAndDelete({ _id: cardId })

		if (!data) throw new CardNotFoundInDb()
		res.send({ data })

	} catch (err) {
		errorsCardChecker(err, res)
	}
}

const likeCard = async (req, res) => {
	try {
		const { cardId } = req.params
		if (!cardId) throw new CardIdNotProvided()
		console.log(cardId)
		const userId = req.user._id
		const data = await Card.findByIdAndUpdate(
			cardId,
			{ $addToSet: { likes: userId } },
			{ new: true },
		)
		console.log(data)
		if (!data) throw new CardNotFoundInDb()
		res.send({ data })

	} catch (err) {
		errorsCardChecker(err, res)
	}
}

const dislikeCard = async (req, res) => {
	try {
		const { cardId } = req.params
		if (!cardId) throw new CardIdNotProvided()

		const userId = req.user._id
		const data = await Card.findByIdAndUpdate(
			cardId,
			{ $pull: { likes: userId } },
			{ new: true }
		)

		if (!data) throw new CardNotFoundInDb()
		res.send({ data })

	} catch (err) {
		errorsCardChecker(err, res)
	}
}


module.exports = {
	getCards,
	createCard,
	deleteCard,
	dislikeCard,
	likeCard
}