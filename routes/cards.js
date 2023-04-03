const router = require('express').Router()

const {
	getCards,
	createCard,
	deleteCard,
	likeCard,
	dislikeCard
} = require('../controllers/cards')

router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)
router.delete('/cards/:cardId', deleteCard)
router.get('/cards', getCards)	
router.post('/cards', createCard)
module.exports = router