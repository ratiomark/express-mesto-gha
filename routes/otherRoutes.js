const router = require('express').Router()

const pageNotFound = (req, res) => {
	res.status(404).send({ message: `Не корректный запрос, путь ${req.baseUrl} не существует` })
}

router.put('/*', pageNotFound)
router.delete('/*', pageNotFound)
router.patch('/*', pageNotFound)
router.get('/*', pageNotFound)
router.post('/*', pageNotFound)

module.exports = router