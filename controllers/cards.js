const Card = require('../models/cards')

const {
	IncorrectDataCardCreation,
	CardNotFoundInDb,
	CardIdNotProvided,
	errorsCardChecker,
	IncorrectDataCard	
} = require('../Errors/Errors')


const getCards = (req, res) => {
	Card.find({})
		.then(cards => res.send({ data: cards }))
		.catch(err => {
			res.statusCode(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}

const createCard = (req, res) => {
	const { name, link } = req.body
	if (!name || !link) {
		res.status(IncorrectDataCardCreationInstance.statusCode)
			.send(IncorrectDataCardCreationInstance.getMessage())
		return
	}
	const userId = req.user._id
	Card.create({ name, link, owner: userId })
		.then(card => res.send({ data: card }))
		.catch(err => {
			res.statusCode(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}

const deleteCard = (req, res) => {
	const { cardId } = req.params
	if (!cardId) {
		res.status(CardIdNotProvidedInstance.statusCode)
			.send(CardIdNotProvidedInstance.getMessage())
		return
	}
	Card.deleteOne({ _id: cardId })
		.then(card => res.send({ data: 'Карточка удалена' }))
		.catch(err => {
			res.status(CardNotFoundInDbInstance.statusCode)
				.send(CardNotFoundInDbInstance.getMessage())
		})
}

const likeCard = (req, res) => {
	const { cardId } = req.params
	if (!cardId) {
		res.status(CardIdNotProvidedInstance.statusCode)
			.send(CardIdNotProvidedInstance.getMessage())
		return
	}
	const userId = req.user._id
	Card.findByIdAndUpdate(
		cardId,
		{ $addToSet: { likes: userId } }, 
		{ new: true },
	)
		.then(card => {
			if (!card) {
				res.status(CardNotFoundInDbInstance.statusCode)
					.send(CardNotFoundInDbInstance.getMessage())
				return
			}
			res.send({ data: card })
		})
		.catch(err => {
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}

const dislikeCard = (req, res) => {
	const { cardId } = req.params
	if (!cardId) {
		res.status(CardIdNotProvidedInstance.statusCode)
			.send(CardIdNotProvidedInstance.getMessage())
		return
	}
	const userId = req.user._id
	Card.findByIdAndUpdate(
		cardId,
		{ $pull: { likes: userId } },
		{ new: true }
	)
		.then(card => {
			if (!card) {
				res.status(CardNotFoundInDbInstance.statusCode)
					.send(CardNotFoundInDbInstance.getMessage())
				return
			}
			res.send({ data: card })
		})
		.catch(err => {
			console.log(err)
			res.status(DefaultErrorInstance.statusCode)
				.send(DefaultErrorInstance.getMessage())
		})
}


module.exports = {
	getCards,
	createCard,
	deleteCard,
	dislikeCard,
	likeCard
}