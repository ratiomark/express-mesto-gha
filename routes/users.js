const router = require('express').Router()

const {
	getUsers,
	getUserById,
	createUser,
	updateUserProfile,
	updateUserAvatar
} = require('../controllers/users')

router.patch('/users/me/avatar', updateUserAvatar)
router.patch('/users/me', updateUserProfile)
router.get('/users/:userId', getUserById)
router.get('/users', getUsers)
router.post('/users', createUser)
module.exports = router